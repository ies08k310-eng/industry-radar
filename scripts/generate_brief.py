from __future__ import annotations

import html
import json
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import datetime, timedelta
from email.utils import parsedate_to_datetime
from pathlib import Path
from typing import Iterable
from zoneinfo import ZoneInfo

TZ = ZoneInfo("Asia/Shanghai")
WINDOW_DAYS = 15
MAX_ITEMS_PER_SECTION = 4
DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "daily-brief.json"

FEEDS = [
    {
        "name": "competitor",
        "category": "competitor",
        "query": '("企查查" OR "天眼查" OR "启信宝" OR "爱企查" OR "Wind" OR "万得" OR "Bloomberg" OR "Dun & Bradstreet") (产品 OR AI OR 智能体 OR 风控 OR 尽调 OR 拓客 OR 发布 OR 上线 OR 工作台) when:15d',
    },
    {
        "name": "demand",
        "category": "demand",
        "query": '("反洗钱" OR "受益所有人" OR "客户尽职调查" OR "金融机构合规" OR "合规审查" OR "尽职调查") (企业 OR 金融机构 OR 律所) when:15d',
    },
    {
        "name": "opportunity",
        "category": "opportunity",
        "query": '("招投标" OR "中标" OR "供应商 风险" OR "采购 合规" OR "拓客" OR "商机") (企业 数据 OR 风险 OR 尽调) when:15d',
    },
]

CATEGORY_META = {
    "competitor": {
        "title": "竞品与对标产品动作",
        "description": "聚焦竞品近期释放的产品动作，以及对企查查 APP / Web 的直接启发。",
        "empty": "当天未抓取到高相关的竞品或对标产品动作。",
    },
    "demand": {
        "title": "客户需求与政策信号",
        "description": "聚焦合规、尽调和监管要求，判断哪些能力更值得优先投入。",
        "empty": "当天未抓取到高相关的客户需求或政策信号。",
    },
    "opportunity": {
        "title": "事件机会与可新增模块",
        "description": "聚焦招投标、项目、中标和供应链事件，判断能否沉淀成企查查的新入口或新模块。",
        "empty": "当天未抓取到高相关的产品机会信号。",
    },
}

NEGATIVE_KEYWORDS = {
    "白血病",
    "肿瘤",
    "移植",
    "药物",
    "疫苗",
    "免疫",
    "science",
    "科研",
    "足球",
    "篮球",
    "币",
    "加密",
}

COMPETITOR_NAMES = [
    "企查查",
    "天眼查",
    "启信宝",
    "爱企查",
    "wind",
    "万得",
    "bloomberg",
    "dun & bradstreet",
    "d&b",
]

DEMAND_NOISE = ["宣传", "教育活动", "主题活动", "观影", "答题", "普法", "海报", "宣教"]
COMPETITOR_NOISE = ["相关企业", "注册量", "企业超", "企业已", "企业达", "行业相关企业", "赛道相关企业"]

THEMES = {
    "ai_workflow": {
        "name": "AI 工作流化",
        "summary": "近 15 天多条信号都在强调 AI 调用、工作台和结构化输出，行业竞争焦点正在从查询能力转向可直接嵌入业务流。",
        "app": {
            "module": "APP 智能尽调助手",
            "change": "在企业详情页增加常驻 AI 助手入口，支持一键生成风险摘要、控制权结论和追问卡片。",
            "data_points": ["企业基础档案", "风险摘要", "控制权结构", "关键变更时间线"],
        },
        "web": {
            "module": "Web AI 尽调工作台",
            "change": "把 Web 查询页升级为多标签工作台，突出来源引用、结构化输出、批量对比和协作批注。",
            "data_points": ["来源引用链", "结构化字段导出", "批量企业对比", "协作批注记录"],
        },
        "item_takeaway": "建议把 AI 摘要、来源引用和结构化导出变成企查查 APP / Web 的默认能力。",
    },
    "compliance": {
        "name": "合规与持续尽调",
        "summary": "反洗钱、客户尽调和受益所有人相关信号仍在升温，客户更需要持续监控和留痕，而不是一次性查询结果。",
        "app": {
            "module": "APP 风险订阅与提醒",
            "change": "在 APP 端强化企业风险订阅、异常变更提醒和一键保存尽调结论，满足移动场景下的持续跟进。",
            "data_points": ["受益所有人链路", "异常经营记录", "处罚诉讼摘要", "订阅命中提醒"],
        },
        "web": {
            "module": "Web 合规尽调监控台",
            "change": "在 Web 端形成标准化尽调台，支持受益所有人穿透、处罚诉讼时间线、监控留痕和批量核验。",
            "data_points": ["受益所有人穿透", "处罚诉讼时间线", "关联风险主体", "监控留痕日志"],
        },
        "item_takeaway": "建议把合规场景做成企查查 Web 标准方案，并让 APP 承接订阅提醒和跟进动作。",
    },
    "procurement_risk": {
        "name": "供应链与采购风险",
        "summary": "供应商准入、采购合规和关系风险预警正在成为更明确的企业需求，适合沉淀成持续订阅类产品。",
        "app": {
            "module": "APP 供应商预警卡",
            "change": "APP 首页增加供应商预警卡片，突出异常中标、处罚、关系冲突和上下游变化提醒。",
            "data_points": ["异常中标提醒", "供应商处罚摘要", "关系冲突提示", "上下游变化"],
        },
        "web": {
            "module": "Web 采购风控台",
            "change": "在 Web 端新增采购风控台，支持供应商准入、利益冲突排查、关系图谱和批量核验。",
            "data_points": ["供应商关系网络", "利益冲突提示", "招投标记录", "批量核验结果"],
        },
        "item_takeaway": "建议把采购风控放在 Web 端形成完整工作台，APP 侧承接高频预警。",
    },
    "event_growth": {
        "name": "事件驱动拓客",
        "summary": "中标、项目启动、资质变化和产业投资等事件，更适合作为高命中线索入口，名单式拓客的重要性在下降。",
        "app": {
            "module": "APP 商机雷达",
            "change": "APP 增加商机雷达流，按行业或区域推送中标、扩产、资质变化和项目启动等事件。",
            "data_points": ["中标动态", "资质变化", "项目启动", "区域迁移与招聘信号"],
        },
        "web": {
            "module": "Web 事件线索筛选台",
            "change": "Web 端强化事件筛选、批量导出和跟进名单管理，把商机发现从名单查询升级为事件流。",
            "data_points": ["招投标动态", "中标企业清单", "融资与扩产事件", "批量导出名单"],
        },
        "item_takeaway": "建议把企查查 APP 做成事件提醒入口，把 Web 做成筛选和批量跟进主阵地。",
    },
    "data_asset": {
        "name": "数据资产与能力包装",
        "summary": "行业正在把通用企业数据重新包装成更强的产品能力，例如数据资产标签、场景方案和行业工作台。",
        "app": {
            "module": "APP 行业标签卡",
            "change": "APP 企业详情页增加行业标签卡、资质和数据资产提示，帮助轻量用户快速建立认知。",
            "data_points": ["行业标签", "知识产权与资质", "数据资产标签", "亮点摘要"],
        },
        "web": {
            "module": "Web 行业方案工作区",
            "change": "Web 端按行业模板组织字段、报告和案例，避免只停留在通用字段罗列。",
            "data_points": ["行业方案模板", "场景化字段组合", "案例报告模板", "角色化视图"],
        },
        "item_takeaway": "建议 APP 负责轻量展示，Web 负责场景方案和复杂报告。",
    },
}

THEME_KEYWORDS = {
    "ai_workflow": ["ai", "智能体", "大模型", "工作台", "agent", "摘要", "自动", "mcp", "平台", "系统"],
    "compliance": ["反洗钱", "合规", "尽职调查", "尽调", "受益所有人", "处罚", "监管", "审查", "可疑交易", "被罚", "备案"],
    "procurement_risk": ["供应商", "采购", "围标", "串标", "利益冲突", "准入", "招投标", "中标"],
    "event_growth": ["拓客", "获客", "商机", "中标", "招标", "融资", "扩产", "资质", "迁移", "项目"],
    "data_asset": ["数据产品", "知识产权", "数据资产", "标签", "方案", "终端"],
}

SOURCE_WEIGHT = {
    "中国政府网": 4,
    "中国人大网": 4,
    "中国人民银行": 4,
    "证券时报": 3,
    "紫牛新闻": 3,
    "Wind": 3,
    "Bloomberg": 3,
    "Dun & Bradstreet": 3,
    "新华报业网": 2,
    "每日经济新闻": 2,
    "央视网": 2,
    "东方财富": 2,
    "新浪财经": 1,
}

WEEKDAY_LABELS = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]


@dataclass
class NewsItem:
    title: str
    link: str
    source: str
    source_url: str
    published_at: datetime
    category: str
    feed_name: str
    themes: list[str]
    dominant_theme: str
    score: int

    @property
    def date_key(self) -> str:
        return self.published_at.astimezone(TZ).date().isoformat()


def fetch_xml(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as response:
        return response.read()



def google_news_rss(query: str) -> bytes:
    encoded = urllib.parse.quote(query)
    url = f"https://news.google.com/rss/search?q={encoded}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans"
    return fetch_xml(url)



def clean_title(title: str, source: str) -> str:
    title = html.unescape(title).strip()
    suffixes = [f" - {source}", f"_{source}", f"｜{source}", f"| {source}"]
    for suffix in suffixes:
        if title.endswith(suffix):
            return title[: -len(suffix)].strip()
    return title



def normalize(text: str) -> str:
    return re.sub(r"\s+", "", text).lower()



def contains_any(text: str, words: Iterable[str]) -> bool:
    text = normalize(text)
    return any(normalize(word) in text for word in words)



def score_themes(title: str) -> Counter:
    counts = Counter()
    normalized = normalize(title)
    for theme, keywords in THEME_KEYWORDS.items():
        for keyword in keywords:
            if normalize(keyword) in normalized:
                counts[theme] += 1
    return counts



def infer_themes(title: str, category: str) -> list[str]:
    counts = score_themes(title)
    if category == "demand":
        counts["compliance"] += 2
    if category == "opportunity":
        counts["event_growth"] += 1
    if category == "competitor":
        counts["ai_workflow"] += 1

    ordered = [name for name, _ in counts.most_common() if counts[name] > 0]
    if not ordered:
        fallback = {
            "competitor": ["ai_workflow"],
            "demand": ["compliance"],
            "opportunity": ["event_growth"],
        }
        return fallback[category]
    return ordered[:2]



def is_relevant(title: str, category: str) -> bool:
    if contains_any(title, NEGATIVE_KEYWORDS):
        return False

    checks = {
        "competitor": ["智能体", "产品", "平台", "系统", "风控", "尽调", "拓客", "发布", "上线", "工作台", "反洗钱", "合作", "终端", "扶持计划"],
        "demand": ["反洗钱", "合规", "尽职调查", "尽调", "受益所有人", "处罚", "监管", "审查", "可疑交易", "被罚", "备案", "系统"],
        "opportunity": ["招投标", "中标", "供应商", "采购", "商机", "拓客", "风险", "项目", "数据中心", "资质"],
    }
    if category == "competitor":
        return (
            contains_any(title, COMPETITOR_NAMES)
            and contains_any(title, checks[category])
            and not contains_any(title, COMPETITOR_NOISE)
        )
    if category == "demand":
        return contains_any(title, checks[category]) and not contains_any(title, DEMAND_NOISE)
    return contains_any(title, checks[category])



def source_weight(source: str) -> int:
    for name, weight in SOURCE_WEIGHT.items():
        if name.lower() in source.lower():
            return weight
    return 1



def compute_score(title: str, source: str, published_at: datetime, category: str, dominant_theme: str, today: datetime) -> int:
    age_days = max((today.date() - published_at.astimezone(TZ).date()).days, 0)
    recency = max(10 - age_days, 1)
    theme_bonus = {
        "compliance": 5,
        "ai_workflow": 4,
        "procurement_risk": 4,
        "event_growth": 4,
        "data_asset": 3,
    }.get(dominant_theme, 2)
    category_bonus = {"competitor": 2, "demand": 3, "opportunity": 2}[category]
    return recency + source_weight(source) + theme_bonus + category_bonus



def parse_feed(xml_bytes: bytes, category: str, feed_name: str, today: datetime) -> list[NewsItem]:
    root = ET.fromstring(xml_bytes)
    items: list[NewsItem] = []
    for item in root.findall("./channel/item"):
        source_el = item.find("source")
        source = (source_el.text or "未知来源").strip() if source_el is not None else "未知来源"
        title = clean_title(item.findtext("title", default=""), source)
        if not title or not is_relevant(title, category):
            continue

        try:
            published_at = parsedate_to_datetime(item.findtext("pubDate", default="")).astimezone(TZ)
        except Exception:
            continue

        if published_at < today - timedelta(days=WINDOW_DAYS - 1):
            continue

        themes = infer_themes(title, category)
        dominant_theme = themes[0]
        items.append(
            NewsItem(
                title=title,
                link=item.findtext("link", default="").strip(),
                source=source,
                source_url=(source_el.attrib.get("url", "") if source_el is not None else ""),
                published_at=published_at,
                category=category,
                feed_name=feed_name,
                themes=themes,
                dominant_theme=dominant_theme,
                score=compute_score(title, source, published_at, category, dominant_theme, today),
            )
        )
    return items



def dedupe_items(items: list[NewsItem]) -> list[NewsItem]:
    chosen: dict[str, NewsItem] = {}
    for item in sorted(items, key=lambda x: (x.date_key, x.score, x.published_at), reverse=True):
        key = normalize(item.title)
        if key not in chosen or item.score > chosen[key].score:
            chosen[key] = item
    return sorted(chosen.values(), key=lambda x: (x.date_key, x.score, x.published_at), reverse=True)



def format_chinese_date(date_str: str) -> str:
    dt = datetime.fromisoformat(date_str)
    return f"{dt.month}月{dt.day}日"



def weekday_label(day: datetime) -> str:
    return WEEKDAY_LABELS[day.weekday()]



def build_trends(window_items: list[NewsItem]) -> list[dict]:
    counter = Counter()
    for item in window_items:
        for theme in item.themes:
            counter[theme] += 1

    chosen = [theme for theme, _ in counter.most_common(3)]
    if not chosen:
        chosen = ["compliance", "ai_workflow", "event_growth"]

    trends = []
    for theme in chosen:
        library = THEMES[theme]
        trends.append(
            {
                "theme": library["name"],
                "signal_count": counter[theme],
                "summary": library["summary"],
                "app_change": library["app"]["change"],
                "app_data_points": library["app"]["data_points"],
                "web_change": library["web"]["change"],
                "web_data_points": library["web"]["data_points"],
            }
        )
    return trends



def build_actions(window_items: list[NewsItem]) -> list[dict]:
    actions = []
    for trend in build_trends(window_items):
        theme_key = next(key for key, value in THEMES.items() if value["name"] == trend["theme"])
        library = THEMES[theme_key]
        actions.append(
            {
                "title": library["name"],
                "app": {
                    "module": library["app"]["module"],
                    "change": library["app"]["change"],
                    "data_points": library["app"]["data_points"],
                },
                "web": {
                    "module": library["web"]["module"],
                    "change": library["web"]["change"],
                    "data_points": library["web"]["data_points"],
                },
            }
        )
    return actions



def item_to_card(item: NewsItem) -> dict:
    library = THEMES[item.dominant_theme]
    return {
        "title": item.title,
        "source": item.source,
        "source_url": item.source_url,
        "link": item.link,
        "published_at": item.published_at.isoformat(),
        "published_label": item.published_at.strftime("%m-%d %H:%M"),
        "product_takeaway": library["item_takeaway"],
        "app_change": library["app"]["change"],
        "web_change": library["web"]["change"],
        "app_module": library["app"]["module"],
        "web_module": library["web"]["module"],
        "app_data_points": library["app"]["data_points"][:3],
        "web_data_points": library["web"]["data_points"][:3],
    }



def build_day_headline(day_key: str, counts: dict[str, int]) -> str:
    if counts["all"] == 0:
        return f"{format_chinese_date(day_key)}暂无高相关新增，建议重点查看近 15 天趋势总结"

    if counts["opportunity"] >= max(counts["competitor"], counts["demand"]):
        return f"{format_chinese_date(day_key)}新增以商机/事件信号为主，适合转成企查查 APP 商机提醒与 Web 线索筛选"
    if counts["demand"] >= max(counts["competitor"], counts["opportunity"]):
        return f"{format_chinese_date(day_key)}新增以合规与尽调需求为主，适合强化企查查 Web 监控台与 APP 订阅提醒"
    return f"{format_chinese_date(day_key)}新增以竞品动作和产品信号为主，适合跟进企查查 APP / Web 的 AI 能力升级"



def build_day_quick_points(counts: dict[str, int]) -> list[str]:
    quick_points = []
    if counts["competitor"]:
        quick_points.append(f"当日新增 {counts['competitor']} 条竞品 / 对标产品动作。")
    if counts["demand"]:
        quick_points.append(f"当日新增 {counts['demand']} 条客户需求与政策信号。")
    if counts["opportunity"]:
        quick_points.append(f"当日新增 {counts['opportunity']} 条可直接转成产品模块的事件机会。")
    if not quick_points:
        quick_points.append("当日未发现高相关新增事件。")
    return quick_points



def build_day_payload(day: datetime, all_items: list[NewsItem]) -> dict:
    day_key = day.date().isoformat()
    day_items = [item for item in all_items if item.date_key == day_key]

    grouped = defaultdict(list)
    for item in sorted(day_items, key=lambda x: (x.score, x.published_at), reverse=True):
        grouped[item.category].append(item_to_card(item))

    sections = []
    for key in ["competitor", "demand", "opportunity"]:
        sections.append(
            {
                "key": key,
                "title": CATEGORY_META[key]["title"],
                "description": CATEGORY_META[key]["description"],
                "empty": CATEGORY_META[key]["empty"],
                "items": grouped[key][:MAX_ITEMS_PER_SECTION],
            }
        )

    citations = [
        {
            "title": item.title,
            "source": item.source,
            "link": item.link,
            "source_url": item.source_url,
        }
        for item in sorted(day_items, key=lambda x: (x.score, x.published_at), reverse=True)[:8]
    ]

    counts = {
        "all": len(day_items),
        "competitor": len(grouped["competitor"]),
        "demand": len(grouped["demand"]),
        "opportunity": len(grouped["opportunity"]),
    }

    return {
        "date": day_key,
        "label": format_chinese_date(day_key),
        "weekday": weekday_label(day),
        "counts": counts,
        "headline": build_day_headline(day_key, counts),
        "quick_points": build_day_quick_points(counts),
        "sections": sections,
        "citations": citations,
    }



def build_rolling_summary(items: list[NewsItem]) -> dict:
    category_counts = Counter(item.category for item in items)
    top_trends = build_trends(items)
    top_theme = top_trends[0]["theme"] if top_trends else "合规与持续尽调"

    overview = (
        f"最近 {WINDOW_DAYS} 天共识别 {len(items)} 条高相关信号。"
        f"当前最值得优先投入的是把 {top_theme} 落到企查查 APP 的高频提醒和企查查 Web 的标准工作台。"
    )

    key_points = [
        f"近 {WINDOW_DAYS} 天内，{top_theme} 是最密集出现的主题。",
        f"竞品/对标产品信号 {category_counts['competitor']} 条，客户需求/政策信号 {category_counts['demand']} 条，事件机会 {category_counts['opportunity']} 条。",
        "建议把移动端聚焦提醒与跟进，把 Web 端聚焦工作台、筛选和批量导出。",
    ]

    return {
        "headline": f"最近 {WINDOW_DAYS} 天趋势总结：{top_theme} 仍是企查查最优先跟进方向",
        "overview": overview,
        "key_points": key_points,
        "counts": {
            "all": len(items),
            "competitor": category_counts["competitor"],
            "demand": category_counts["demand"],
            "opportunity": category_counts["opportunity"],
        },
        "trends": top_trends,
        "actions": build_actions(items),
    }



def build_payload(items: list[NewsItem], generated_at: datetime) -> dict:
    dates = [generated_at - timedelta(days=offset) for offset in range(WINDOW_DAYS)]
    days = [build_day_payload(day, items) for day in dates]
    latest = days[0]
    return {
        "generated_at": generated_at.isoformat(),
        "generated_label": generated_at.strftime("%Y-%m-%d %H:%M"),
        "window_days": WINDOW_DAYS,
        "default_date": latest["date"],
        "rolling_summary": build_rolling_summary(items),
        "days": days,
    }



def main() -> None:
    now = datetime.now(TZ).replace(microsecond=0)
    all_items: list[NewsItem] = []
    for feed in FEEDS:
        xml_bytes = google_news_rss(feed["query"])
        all_items.extend(parse_feed(xml_bytes, feed["category"], feed["name"], now))

    items = dedupe_items(all_items)
    if len(items) < 8:
        raise SystemExit("抓取到的高相关信号不足，终止写入数据。")

    payload = build_payload(items, now)
    DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    DATA_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {DATA_PATH} with {len(items)} items.")


if __name__ == "__main__":
    main()
