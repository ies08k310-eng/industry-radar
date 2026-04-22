const scores = [
  {
    label: "监管拉力",
    value: 92,
    note: "反洗钱法、金融机构合规管理办法、受益所有人备案共同推高持续尽调与可审计留痕需求。",
  },
  {
    label: "AI 化压力",
    value: 89,
    note: "企查查、启信慧眼、D&B、Bloomberg 都在把企业数据包装进 AI 工作流与摘要能力。",
  },
  {
    label: "风控订阅潜力",
    value: 86,
    note: "采购、金融、法务客户越来越需要持续监控，而不是单次查询，这更适合订阅与中台化收费。",
  },
  {
    label: "增长机会",
    value: 84,
    note: "事件驱动式获客、垂类数据包、受益所有人穿透与供应链预警，都是更容易讲价值的产品方向。",
  },
];

const filters = [
  { key: "all", label: "全部" },
  { key: "competitor", label: "竞品动作" },
  { key: "demand", label: "客户需求" },
  { key: "benchmark", label: "全球对标" },
];

const signals = [
  {
    id: "qcc-agent-platform",
    title: "企查查把企业数据做成 Agent 可调用底座",
    date: "2026-03-30",
    dateLabel: "2026-03-30",
    frame: "新动作",
    kind: "competitor",
    quadrant: "ai",
    ring: 1,
    priority: "P1",
    company: "企查查",
    sourceType: "媒体",
    sourceName: "紫牛新闻",
    sourceUrl: "https://www.yzwb.net/news/ch/202604/t20260403_338692.html",
    summary:
      "公开材料显示，企查查于 2026 年 3 月 30 日推出智能体数据平台，强调 MCP × CLI 接入、Token 脱水、差异标注与可审计留痕。",
    whyItMatters:
      "企业数据平台的竞争焦点，已经不只是“查得全”，而是“能否直接嵌进 AI 工作流，且结果可信可追溯”。",
    action:
      "把可信引用、结构化状态码、工作流模板与主流 Agent 的即插即用能力，做成对外最强卖点。",
    tags: ["AI Agent", "MCP", "可信数据底座"],
  },
  {
    id: "qixin-data-ip",
    title: "启信宝切入“数据产品知识产权”公开展示",
    date: "2025-12-18",
    dateLabel: "2025-12-18",
    frame: "新动作",
    kind: "competitor",
    quadrant: "growth",
    ring: 2,
    priority: "P2",
    company: "启信宝",
    sourceType: "媒体",
    sourceName: "上海证券报 / 东方财富",
    sourceUrl: "https://finance.eastmoney.com/a/202512183595546026.html",
    summary:
      "启信宝成为首批获权公开展示“数据产品知识产权”信息的企业平台之一，数据资产可信展示开始成为新的外部能力。",
    whyItMatters:
      "企业数据服务正在从“查主体”扩展到“查数据资产”和“验证数据权属”，更贴近金融、交易与数据要素场景。",
    action:
      "评估把数据产品、数据资产、数据确权相关标签接入产品线，强化面向数据交易和合规团队的场景故事。",
    tags: ["数据资产", "知识产权", "平台扩边"],
  },
  {
    id: "qixin-ai-suite",
    title: "启信慧眼当前定位已经是 AI 风控 / AI 尽调 / AI 拓客产品",
    date: "2026-02-02",
    dateLabel: "2026-02 当前公开页",
    frame: "当前能力",
    kind: "competitor",
    quadrant: "ai",
    ring: 2,
    priority: "P2",
    company: "启信慧眼",
    sourceType: "应用页",
    sourceName: "App Store",
    sourceUrl: "https://apps.apple.com/cn/app/%E5%90%AF%E4%BF%A1%E6%85%A7%E7%9C%BC-%E6%B4%9E%E5%AF%9F%E9%A3%8E%E9%99%A9%E4%B8%8E%E5%95%86%E6%9C%BA/id1436957511",
    summary:
      "当前公开页直接把产品定义为“智能决策企业级 AI 产品”，并突出 AI 拓客、AI 风控、AI 尽调、AI 企业画像。",
    whyItMatters:
      "竞品已不再把自己包装成单纯企业查询工具，而是在争夺企业决策助手与行业工作台心智。",
    action:
      "对外叙事要从“数据多”升级到“帮客户更快做出可解释决策”，销售演示也要更像工作流，而不是检索页。",
    tags: ["AI 尽调", "AI 风控", "AI 拓客"],
  },
  {
    id: "tianyancha-boards",
    title: "天眼查持续强化榜单、招标与律所信息等发现型功能",
    date: "2025-08-25",
    dateLabel: "2025-08-25",
    frame: "版本变化",
    kind: "competitor",
    quadrant: "growth",
    ring: 2,
    priority: "P3",
    company: "天眼查",
    sourceType: "应用页",
    sourceName: "App Store",
    sourceUrl: "https://apps.apple.com/cn/app/%E5%A4%A9%E7%9C%BC%E6%9F%A5-%E5%85%A8%E5%9B%BD%E4%BC%81%E4%B8%9A%E6%9F%A5%E8%AF%A2%E6%9F%A5%E5%85%AC%E5%8F%B8%E5%B7%A5%E5%95%86%E5%BE%81%E4%BF%A1/id1048918751",
    summary:
      "2025 年 4 月到 8 月的版本记录里，天眼查提到新增科技企业榜、企业荣誉榜、招标搜索更智享、律所信息更周详等能力。",
    whyItMatters:
      "这说明发现型、榜单型、行业切片型入口仍是竞争重点，尤其适合获客、调研与行业扫描场景。",
    action:
      "可考虑强化“行业主题榜单 + 事件榜单 + 区域榜单”组合，用更轻量入口承接拓客和市场情报需求。",
    tags: ["榜单入口", "招标搜索", "律所信息"],
  },
  {
    id: "aiqicha-freemium",
    title: "爱企查仍在用“免费 + 风险监控 + 导出”抢中小客户入口",
    date: "2026-04-13",
    dateLabel: "2026-04-13",
    frame: "当前能力",
    kind: "competitor",
    quadrant: "growth",
    ring: 2,
    priority: "P2",
    company: "爱企查",
    sourceType: "应用页",
    sourceName: "百度手机助手",
    sourceUrl: "https://mobile.baidu.com/appitemp/3988163",
    summary:
      "爱企查当前公开页强调 2 亿+ 主体、130+ 数据维度，以及风险监控、高级检索、数据导出等免费查询能力。",
    whyItMatters:
      "在 SMB 与轻量用户层面，免费能力仍是重要流量闸口，付费转化更可能发生在导出、监控与深度分析环节。",
    action:
      "继续拉开专业场景差距，不要和免费入口拼“有没有”，而要拼“是否能真正完成业务流程”。",
    tags: ["免费入口", "风险监控", "轻量用户"],
  },
  {
    id: "wind-research-ai",
    title: "Wind 用“海量研究 + AI 打标”增强专业用户黏性",
    date: "2026-04-01",
    dateLabel: "2026-04 当前公开页",
    frame: "当前能力",
    kind: "competitor",
    quadrant: "benchmark",
    ring: 2,
    priority: "P2",
    company: "Wind",
    sourceType: "产品页",
    sourceName: "Wind 研报平台",
    sourceUrl: "https://www.wind.com.cn/portal/zh/RPP/index.html",
    summary:
      "Wind 公开页显示其研报平台已收录 450 多万份研究报告，来源超过 600 家，并对内容做智能拆解和 AI 打标。",
    whyItMatters:
      "专业数据平台的护城河，不只在数据本身，也在“帮客户更快筛掉噪音、进入行业上下文”的整理能力。",
    action:
      "围绕企业数据也可以构建主题化、场景化的二次编排，例如尽调主题包、产业链主题包、处罚主题包。",
    tags: ["AI 打标", "专业研究", "主题化编排"],
  },
  {
    id: "wind-wealth-workflow",
    title: "Wind 把获客、客户管理与风险预警做成工作台",
    date: "2026-04-01",
    dateLabel: "2026-04 当前公开页",
    frame: "当前能力",
    kind: "competitor",
    quadrant: "growth",
    ring: 2,
    priority: "P2",
    company: "Wind",
    sourceType: "产品页",
    sourceName: "Wind 投顾终端",
    sourceUrl: "https://www.wind.com.cn/portal/zh/WFC/index.html",
    summary:
      "Wind 投顾终端公开页强调分享获客、客户管理、资产配置秒级出报告，以及对风险主体的无间断探测。",
    whyItMatters:
      "客户越来越愿意为“工作台”买单，而不只是为“数据库”买单，尤其在金融与高客单价行业更明显。",
    action:
      "产品组合要更接近业务台而不是工具箱，重点强化筛选、协作、报告、告警、留痕五步闭环。",
    tags: ["工作台", "精准获客", "风险预警"],
  },
  {
    id: "aml-law",
    title: "新修订《反洗钱法》已于 2025-01-01 施行",
    date: "2025-01-01",
    dateLabel: "2025-01-01",
    frame: "监管生效",
    kind: "demand",
    quadrant: "demand",
    ring: 1,
    priority: "P1",
    company: "监管",
    sourceType: "官方",
    sourceName: "中国人大网",
    sourceUrl: "https://www.npc.gov.cn/c2/c30834/202411/t20241111_440943.html",
    summary:
      "全国人大公开信息显示，新修订《反洗钱法》自 2025 年 1 月 1 日起施行，反洗钱制度和义务进一步完善。",
    whyItMatters:
      "金融机构、律所、公证、第三方风险团队对客户身份识别、受益所有人、持续监控与可解释留痕的需求会长期存在。",
    action:
      "把受益所有人、关联关系、处罚、诉讼、异常经营、舆情监控等数据整合成 AML 友好的标准化包。",
    tags: ["AML", "持续尽调", "可审计"],
  },
  {
    id: "financial-compliance-rule",
    title: "《金融机构合规管理办法》自 2025-03-01 起施行",
    date: "2025-03-01",
    dateLabel: "2025-03-01",
    frame: "监管生效",
    kind: "demand",
    quadrant: "demand",
    ring: 1,
    priority: "P1",
    company: "监管",
    sourceType: "官方",
    sourceName: "中国政府网",
    sourceUrl: "https://www.gov.cn/zhengce/202412/content_6995383.htm",
    summary:
      "金融监管总局发布的《金融机构合规管理办法》已生效，并给出整改过渡期，强化机构级合规管理要求。",
    whyItMatters:
      "客户不只需要数据，更需要能进入审批、监控、报告、抽查、整改闭环的合规工具和底层证据。",
    action:
      "对金融客户重点卖“流程嵌入 + 证据留痕 + 解释能力”，而不是单独卖查询次数。",
    tags: ["金融机构", "合规管理", "流程嵌入"],
  },
  {
    id: "beneficial-owner",
    title: "存量主体受益所有人备案截止线已压到 2025-11-01",
    date: "2025-11-01",
    dateLabel: "2025-11-01 截止线",
    frame: "监管节点",
    kind: "demand",
    quadrant: "demand",
    ring: 1,
    priority: "P1",
    company: "监管",
    sourceType: "官方",
    sourceName: "中国人民银行",
    sourceUrl: "https://www.pbc.gov.cn/zhengwugongkai/4081330/4406346/4406348/2025092319185523934/index.html",
    summary:
      "《受益所有人信息管理办法》自 2024-11-01 施行，已登记主体应在 2025-11-01 前按要求完成备案。",
    whyItMatters:
      "受益所有人穿透、控制权识别、历史变更跟踪，已经从“加分项”变成很多尽调与合规场景的硬需求。",
    action:
      "把 BO 穿透链、历史变化、冲突提示、缺失提示、批量核验做成独立方案，方便金融和法务团队直接采购。",
    tags: ["受益所有人", "控制权穿透", "批量核验"],
  },
  {
    id: "dnb-healthcare",
    title: "D&B 正把通用企业数据拆成垂类行业包",
    date: "2025-07-31",
    dateLabel: "2025-07-31",
    frame: "新动作",
    kind: "benchmark",
    quadrant: "benchmark",
    ring: 2,
    priority: "P2",
    company: "Dun & Bradstreet",
    sourceType: "官方",
    sourceName: "D&B 新闻稿",
    sourceUrl: "https://investor.dnb.com/news-releases/news-release-details/dun-bradstreet-unveils-db-healthcare-insights-help-sales-and",
    summary:
      "D&B 在 2025 年 7 月推出 Healthcare Insights，直接面向销售和市场团队提供垂直行业数据集。",
    whyItMatters:
      "国际对标已经证明，行业包比通用数据库更容易讲清 ROI，也更容易与商机、营销、准入策略绑定。",
    action:
      "优先评估法律、银行、采购、医药、制造、出海这几类垂直包，按角色和流程打包而不是按字段打包。",
    tags: ["垂类数据包", "Healthcare", "ROI 叙事"],
  },
  {
    id: "dnb-ai-suite",
    title: "D&B 把可信企业标识与 GenAI 直接绑定",
    date: "2025-10-16",
    dateLabel: "2025-10-16",
    frame: "新动作",
    kind: "benchmark",
    quadrant: "ai",
    ring: 2,
    priority: "P1",
    company: "Dun & Bradstreet",
    sourceType: "官方",
    sourceName: "D&B 官方 PDF",
    sourceUrl: "https://www.dnb.com/content/dam/web/company/content/newsroom/corporate/2025/2025-10-16.pdf",
    summary:
      "D&B.AI 公开强调用 D-U-N-S 编码为生成式 AI 输出做锚定，并推出 ChatD&B 等统一提示入口。",
    whyItMatters:
      "海外标杆已经在卖“可信企业身份 + AI 交互层”，这正是企业数据服务进入 agentic 工作时代的标准姿势。",
    action:
      "继续强化企业唯一标识、实体对齐、跨数据源去重与引用链，这些会决定 AI 回答能不能被信任。",
    tags: ["Entity ID", "ChatD&B", "Agentic AI"],
  },
  {
    id: "dnb-ask-procurement",
    title: "D&B 用 AI 采购助手切入供应商决策链路",
    date: "2026-04-01",
    dateLabel: "2026-04 当前公开页",
    frame: "当前能力",
    kind: "benchmark",
    quadrant: "demand",
    ring: 2,
    priority: "P2",
    company: "Dun & Bradstreet",
    sourceType: "产品页",
    sourceName: "D&B Ask Procurement",
    sourceUrl: "https://www.dnb.com/en-us/products/dnb-ask-procurement.html",
    summary:
      "D&B 当前公开页显示，其采购 AI 助手可在供应商评估、风险与机会分析中实时回答复杂问题，并支持接入 ERP / CRM。",
    whyItMatters:
      "采购风控和供应商选择已经是标准化的高价值场景，企业愿意为“直接辅助决策”的能力付费。",
    action:
      "围绕供应商准入、关系冲突、异常事件、招采风险做标准工作流，直接对接采购与内控团队。",
    tags: ["采购 AI", "供应商风险", "ERP / CRM"],
  },
  {
    id: "bloomberg-ai-summary",
    title: "Bloomberg 继续扩展 AI 新闻摘要与公司级总结",
    date: "2025-11-24",
    dateLabel: "2025-11-24",
    frame: "新动作",
    kind: "benchmark",
    quadrant: "benchmark",
    ring: 2,
    priority: "P2",
    company: "Bloomberg",
    sourceType: "官方",
    sourceName: "Bloomberg Press",
    sourceUrl: "https://www.bloomberg.com/company/press/investors-harness-bloombergs-expanded-ai-tools-to-discover-and-summarize-news/",
    summary:
      "Bloomberg 在 2025 年 11 月扩展 AI Summary，把公司新闻与单篇新闻都做成可快速吸收的生成式摘要。",
    whyItMatters:
      "在高频决策场景里，“替客户省时间”比“多给客户一堆原始信息”更容易创造价值感。",
    action:
      "企业数据侧可以把公告、处罚、司法、招投标、舆情做成时间线摘要，让客户先读结论，再追溯原始证据。",
    tags: ["新闻摘要", "时间线", "高频决策"],
  },
  {
    id: "bloomberg-rag-safety",
    title: "Bloomberg 明确提醒：金融场景下 RAG 不天然更安全",
    date: "2025-04-28",
    dateLabel: "2025-04-28",
    frame: "研究信号",
    kind: "benchmark",
    quadrant: "ai",
    ring: 1,
    priority: "P1",
    company: "Bloomberg",
    sourceType: "官方",
    sourceName: "Bloomberg Research Story",
    sourceUrl: "https://www.bloomberg.com/company/stories/bloomberg-responsible-ai-research-mitigating-risky-rags-genai-in-finance/",
    summary:
      "Bloomberg 研究团队公开指出，在金融这类强监管行业，RAG 可能带来更多不安全或不可靠输出。",
    whyItMatters:
      "越是高风险行业，客户越不会只看‘能不能答’，而会看‘是否可解释、可复核、可留痕、可追责’。",
    action:
      "把引用、证据链、冲突提示、缺失提示、人工复核位做成默认能力，而不是高级选项。",
    tags: ["RAG 安全", "可解释性", "金融 AI"],
  },
];

const jobs = [
  {
    title: "律所 / 法务团队",
    body:
      "客户背景调查、涉诉与知识产权检索、资产线索、受益所有人穿透、风险监控与市场动态跟踪，正在成为更系统的一站式需求。",
    meta:
      "参考：企查查面向律所的公开方案提到客户背景调查、风险评估、市场动态、知产、涉诉、资产调查、合规检查等场景。",
    link: "https://b.qcc.com/portal/information-center/articles/2239865366bbd2987d235693ccc9e7a8",
  },
  {
    title: "金融机构",
    body:
      "从开户、授信、贷前调查到贷后监控，再到潜客挖掘，客户更需要企业 360 画像、事件驱动商机、控制权与异常关系识别。",
    meta:
      "参考：企查查公开提到事件驱动式获客、客户尽调中台、全流程周期管理与贷后风控。",
    link: "https://b.qcc.com/portal/information-center/articles/ac59c6b1b44495886fe7e237e0a55948",
  },
  {
    title: "采购 / 供应链 / 合规团队",
    body:
      "供应商准入、持续风险监控、围串标管理、利益冲突排查、上下游关系识别，已经从专项项目逐渐变成常态化机制。",
    meta:
      "参考：企查查公开案例提到供应商准入排查、围串标管理、利益冲突排查、风险实时监控。",
    link: "https://b.qcc.com/portal/information-center/articles/4c25e235dfb054b8ac9cfe6c6920cbf6",
  },
  {
    title: "销售 / BD / 市场团队",
    body:
      "客户不再只想拿企业名单，而是希望看到中标、扩产、迁移、资质变化、融资、合作网络与上下游动向，借此提升线索命中率。",
    meta:
      "参考：企查查当前公开能力与金融场景资料都在强化商机拓客、多维筛选与事件驱动线索。",
    link: "https://mobile.baidu.com/appitemp/1380553",
  },
];

const opportunities = [
  {
    title: "AI-ready 数据接口层",
    body:
      "不是再卖一个 API，而是卖“可引用、可解释、可追溯、对 Agent 友好”的企业知识层。优先级最高。",
    priority: "优先级 1",
  },
  {
    title: "受益所有人 / 控制权穿透引擎",
    body:
      "直接对应 AML、KYC、授信、法务尽调和投融资审查，需求刚性、付费能力强、复购也更稳。",
    priority: "优先级 1",
  },
  {
    title: "持续尽调与预警中台",
    body:
      "从单次查询升级到监控订阅、策略预警、事件推送、批量核验，收入模型更适合年框与中台部署。",
    priority: "优先级 1",
  },
  {
    title: "事件驱动商机雷达",
    body:
      "围绕中标、扩产、租约到期、资质变化、迁入迁出、产业链异动等事件，打造更像销售情报系统的产品。",
    priority: "优先级 2",
  },
  {
    title: "垂类解决方案包",
    body:
      "法律、银行、采购、医药、制造、出海客户都适合单独做模板、字段组合、报告格式和成功案例包装。",
    priority: "优先级 2",
  },
];

const watchlist = [
  {
    title: "谁会先把 MCP / Agent 能力做成规模化商用",
    body:
      "要持续盯天眼查、爱企查、启信宝是否从检索页升级成 Agent 工作流产品。",
  },
  {
    title: "律所与金融机构是否开始普遍要求 source-linked AI 报告",
    body:
      "如果客户开始要求“每一条结论都能追到原始证据”，那可审计报告会成为强卖点。",
  },
  {
    title: "数据资产与数据产品权属信息会不会成为新卖点",
    body:
      "启信宝切入之后，若更多平台跟进，数据资产透明度可能成为下一轮差异化竞争点。",
  },
  {
    title: "采购风控是否继续外溢到更多行业",
    body:
      "围串标、利益冲突、供应商异常监控若从制造扩散到医疗、能源、政企采购，会打开更大市场。",
  },
];

let activeFilter = "all";

const scoreGrid = document.querySelector("#scoreGrid");
const filterRow = document.querySelector("#filterRow");
const signalsFeed = document.querySelector("#signalsFeed");
const feedCount = document.querySelector("#feedCount");
const jobsList = document.querySelector("#jobsList");
const opportunityList = document.querySelector("#opportunityList");
const watchList = document.querySelector("#watchList");
const sourcesList = document.querySelector("#sourcesList");
const radarBoard = document.querySelector("#radarBoard");

function renderScores() {
  scoreGrid.innerHTML = scores
    .map(
      (score) => `
        <article class="score-card">
          <p class="eyebrow">Radar Score</p>
          <div class="score-top">
            <h3>${score.label}</h3>
            <div class="score-value">${score.value}</div>
          </div>
          <div class="score-bar" aria-hidden="true"><span style="width:${score.value}%"></span></div>
          <p>${score.note}</p>
        </article>
      `,
    )
    .join("");
}

function renderFilters() {
  filterRow.innerHTML = filters
    .map(
      (filter) => `
        <button class="filter-btn ${filter.key === activeFilter ? "is-active" : ""}" data-filter="${filter.key}">
          ${filter.label}
        </button>
      `,
    )
    .join("");

  filterRow.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderFilters();
      renderSignals();
      renderRadar();
    });
  });
}

function getFilteredSignals() {
  if (activeFilter === "all") return [...signals];
  return signals.filter((signal) => signal.kind === activeFilter);
}

function renderSignals() {
  const filtered = getFilteredSignals().sort((a, b) => (a.date < b.date ? 1 : -1));
  feedCount.textContent = `当前展示 ${filtered.length} 条公开信号`;
  signalsFeed.innerHTML = filtered
    .map(
      (signal) => `
        <article class="signal-card" id="signal-${signal.id}">
          <div class="signal-top">
            <div>
              <div class="signal-meta">
                <span>${signal.frame}</span>
                <span>${signal.company}</span>
                <span>${signal.dateLabel}</span>
              </div>
              <h4>${signal.title}</h4>
            </div>
            <span class="priority-pill priority-${signal.priority.toLowerCase()}">${signal.priority}</span>
          </div>

          <div class="signal-body">
            <p><strong>发生了什么：</strong>${signal.summary}</p>
            <p><strong>为什么重要：</strong>${signal.whyItMatters}</p>
            <p><strong>对企查查意味着什么：</strong>${signal.action}</p>
          </div>

          <div class="signal-foot">
            <div class="signal-tags">
              ${signal.tags.map((tag) => `<span class="tag-pill">${tag}</span>`).join("")}
            </div>
            <a class="signal-link" href="${signal.sourceUrl}" target="_blank" rel="noreferrer">
              查看来源：${signal.sourceName}
            </a>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderStack(target, items, className) {
  target.innerHTML = items
    .map(
      (item) => `
        <article class="${className}">
          <h4>${item.title}</h4>
          <p>${item.body}</p>
          ${item.priority ? `<p class="job-meta">${item.priority}</p>` : ""}
          ${item.meta ? `<p class="job-meta">${item.meta}</p>` : ""}
          ${item.link ? `<p class="job-meta"><a class="source-link" href="${item.link}" target="_blank" rel="noreferrer">对应来源</a></p>` : ""}
        </article>
      `,
    )
    .join("");
}

function uniqueSources() {
  const map = new Map();
  signals.forEach((signal) => {
    if (!map.has(signal.sourceUrl)) {
      map.set(signal.sourceUrl, {
        title: signal.sourceName,
        url: signal.sourceUrl,
        meta: `${signal.sourceType} · ${signal.dateLabel}`,
        body: signal.title,
      });
    }
  });
  return [...map.values()];
}

function renderSources() {
  sourcesList.innerHTML = uniqueSources()
    .map(
      (source) => `
        <article class="source-card">
          <h4>${source.title}</h4>
          <p>${source.body}</p>
          <p class="source-meta">${source.meta}</p>
          <p><a class="source-link" href="${source.url}" target="_blank" rel="noreferrer">${source.url}</a></p>
        </article>
      `,
    )
    .join("");
}

function renderRadar() {
  const center = 50;
  const ringRadius = { 1: 16, 2: 29, 3: 41 };
  const quadrantConfig = {
    ai: { label: "AI 数据底座", angleStart: -30, angleEnd: 30, x: 83, y: 48, className: "quadrant-ai" },
    demand: { label: "合规与尽调", angleStart: 55, angleEnd: 125, x: 50, y: 84, className: "quadrant-demand" },
    growth: { label: "增长与拓客", angleStart: 150, angleEnd: 210, x: 16, y: 50, className: "quadrant-growth" },
    benchmark: { label: "全球对标", angleStart: 235, angleEnd: 305, x: 50, y: 16, className: "quadrant-benchmark" },
  };

  const grouped = Object.keys(quadrantConfig).reduce((acc, key) => {
    acc[key] = signals.filter((signal) => signal.quadrant === key);
    return acc;
  }, {});

  const axisLabels = Object.values(quadrantConfig)
    .map(
      (quadrant) => `
        <div class="axis-label" style="left:${quadrant.x}%; top:${quadrant.y}%;">
          ${quadrant.label}
        </div>
      `,
    )
    .join("");

  const points = Object.entries(grouped)
    .flatMap(([quadrantKey, group]) => {
      const config = quadrantConfig[quadrantKey];
      const spread = (config.angleEnd - config.angleStart) / (group.length + 1);

      return group.map((signal, index) => {
        const angle = config.angleStart + spread * (index + 1);
        const radius = ringRadius[signal.ring];
        const x = center + Math.cos((angle * Math.PI) / 180) * radius;
        const y = center + Math.sin((angle * Math.PI) / 180) * radius;
        const isDim = activeFilter !== "all" && activeFilter !== signal.kind;

        return `
          <a
            href="#signal-${signal.id}"
            class="radar-point ${isDim ? "is-dim" : ""}"
            style="left:${x}%; top:${y}%;"
            aria-label="${signal.title}"
          >
            <span class="point-pin ${config.className}"></span>
            <span class="point-label">${signal.company}</span>
          </a>
        `;
      });
    })
    .join("");

  radarBoard.innerHTML = axisLabels + points;
}

renderScores();
renderFilters();
renderSignals();
renderStack(jobsList, jobs, "job-card");
renderStack(opportunityList, opportunities, "opportunity-card");
renderStack(watchList, watchlist, "watch-card");
renderSources();
renderRadar();
