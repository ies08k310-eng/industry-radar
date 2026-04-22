const quickPoints = [
  "短期最强需求来自持续尽调、受益所有人穿透和合规留痕。",
  "竞品正在把产品从查询工具升级为 AI 工作台和数据底座。",
  "最值得投入的增长方向，是事件驱动获客和供应链风险监控。",
];

const stats = [
  {
    label: "本期重点主题",
    value: "3 类",
    note: "竞品动态、客户需求、发展机会。",
  },
  {
    label: "建议优先动作",
    value: "3 项",
    note: "先做合规与尽调能力，再做获客和行业方案。",
  },
  {
    label: "核心外部信号",
    value: "9 条",
    note: "优先使用监管网站、官方产品页与主流公开报道。",
  },
];

const timeline = [
  {
    date: "2025-01-01",
    title: "新修订《反洗钱法》施行",
    detail: "持续尽调、可解释留痕和异常监控的重要性显著提升。",
  },
  {
    date: "2025-03-01",
    title: "《金融机构合规管理办法》施行",
    detail: "金融客户更关注流程嵌入、证据留存和机构级合规能力。",
  },
  {
    date: "2025-11-01",
    title: "受益所有人备案关键节点",
    detail: "控制权穿透和批量核验将继续成为刚需场景。",
  },
];

const focusSections = [
  {
    title: "竞品动态",
    intro: "公开信号显示，主要竞品和国际对标都在把“查企业”能力包装成更完整的业务工作流。",
    items: [
      {
        title: "AI 原生能力成为主战场",
        detail:
          "企查查已推出智能体数据平台，启信慧眼也在强调 AI 拓客、AI 风控、AI 尽调等能力。行业主流叙事已从“数据多”转向“AI 可直接调用”。",
        impact: "影响：需要更强化引用、结构化状态和工作流模板。",
      },
      {
        title: "工作台化替代单点查询",
        detail:
          "Wind、D&B 都在把风险预警、客户管理、供应商决策和报告生成做成工作台，客户更愿意为完整流程买单，而不是只为查询权限付费。",
        impact: "影响：产品展示方式要更像业务台，而不是数据库。",
      },
      {
        title: "免费入口仍在争夺轻量用户",
        detail:
          "爱企查继续强调免费查询、监控和导出，天眼查持续强化榜单、招标和律所信息等发现型入口。轻量流量竞争仍然存在。",
        impact: "影响：专业场景必须拉开差距，避免陷入免费能力对比。",
      },
    ],
  },
  {
    title: "客户需求",
    intro: "客户购买理由正在从“查询一家公司”转向“持续完成一类业务动作”。",
    items: [
      {
        title: "持续尽调与受益所有人穿透",
        detail:
          "法律、金融和合规团队更需要持续监控、控制权识别、异常关系发现和可审计报告，而不是一次性结果页面。",
        impact: "结论：合规和尽调场景仍是近期最值得投入的高价值市场。",
      },
      {
        title: "事件驱动获客",
        detail:
          "金融机构和销售团队更看重中标、扩产、资质变化、迁移、融资等动态事件，因为这类信号更容易转化成高命中线索。",
        impact: "结论：名单式拓客正被事件式拓客替代。",
      },
      {
        title: "供应链和采购风险预警",
        detail:
          "供应商准入、利益冲突排查、围串标识别、异常舆情和经营变化监控，已经成为采购和内控团队的常见需求。",
        impact: "结论：供应链风控是跨行业可复制场景。",
      },
    ],
  },
  {
    title: "发展机会",
    intro: "对企查查而言，更值得优先布局的是可以标准化、可复用、能讲清 ROI 的能力模块。",
    items: [
      {
        title: "可信企业数据底座",
        detail:
          "把企业唯一标识、引用链、结构化状态、缺失提示和冲突提示做扎实，是 AI 场景里最基础也最难被替代的能力。",
        impact: "优先级：高。适合作为中长期底层投入。",
      },
      {
        title: "合规与尽调中台",
        detail:
          "围绕受益所有人、处罚诉讼、异常经营、舆情和监控订阅形成标准方案，更容易进入金融、法务和合规预算。",
        impact: "优先级：高。最适合作为短期商业化抓手。",
      },
      {
        title: "行业解决方案包",
        detail:
          "法律、银行、采购、制造等场景都适合用模板化报告、字段组合和案例包来提升成交效率，而不是只卖通用字段。",
        impact: "优先级：中高。适合配合销售打法快速落地。",
      },
    ],
  },
];

const actions = [
  {
    title: "先做“合规与尽调”标准包",
    detail:
      "优先把受益所有人、处罚诉讼、异常经营、舆情监控和证据留痕打成统一方案，形成更容易售卖的标准组合。",
    tag: "建议优先级：最高",
  },
  {
    title: "再做“事件驱动获客”轻量产品",
    detail:
      "围绕中标、扩产、迁入迁出、资质变化等事件，做更接近销售线索雷达的入口，提高业务和销售同事的使用频率。",
    tag: "建议优先级：高",
  },
  {
    title: "把 AI 报告做成“可引用、可复核”",
    detail:
      "高价值客户不会只接受自动摘要，更看重每条结论能否对应来源、能否留档、能否人工复核。",
    tag: "建议优先级：高",
  },
];

const sources = [
  {
    title: "中国人大网：反洗钱法修订施行",
    note: "监管正式生效时间点。",
    url: "https://www.npc.gov.cn/c2/c30834/202411/t20241111_440943.html",
  },
  {
    title: "中国政府网：金融机构合规管理办法",
    note: "金融机构合规要求的关键依据。",
    url: "https://www.gov.cn/zhengce/202412/content_6995383.htm",
  },
  {
    title: "中国人民银行：受益所有人信息管理办法",
    note: "受益所有人备案与穿透识别的重要来源。",
    url: "https://www.pbc.gov.cn/zhengwugongkai/4081330/4406346/4406348/2025092319185523934/index.html",
  },
  {
    title: "紫牛新闻：企查查智能体数据平台",
    note: "企查查 AI 数据底座动向。",
    url: "https://www.yzwb.net/news/ch/202604/t20260403_338692.html",
  },
  {
    title: "启信慧眼 App Store 页面",
    note: "AI 拓客、AI 风控、AI 尽调公开能力。",
    url: "https://apps.apple.com/cn/app/%E5%90%AF%E4%BF%A1%E6%85%A7%E7%9C%BC-%E6%B4%9E%E5%AF%9F%E9%A3%8E%E9%99%A9%E4%B8%8E%E5%95%86%E6%9C%BA/id1436957511",
  },
  {
    title: "Wind 研报平台",
    note: "AI 打标与研究内容编排能力。",
    url: "https://www.wind.com.cn/portal/zh/RPP/index.html",
  },
  {
    title: "Wind 投顾终端",
    note: "工作台化、获客与风险预警能力。",
    url: "https://www.wind.com.cn/portal/zh/WFC/index.html",
  },
  {
    title: "D&B Ask Procurement",
    note: "采购与供应商决策 AI 工作流。",
    url: "https://www.dnb.com/en-us/products/dnb-ask-procurement.html",
  },
  {
    title: "Bloomberg AI Summary / RAG 风险研究",
    note: "国际对标对 AI 摘要与可信输出的方向验证。",
    url: "https://www.bloomberg.com/company/stories/bloomberg-responsible-ai-research-mitigating-risky-rags-genai-in-finance/",
  },
];

function renderList(targetId, items) {
  const target = document.getElementById(targetId);
  target.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function renderStats() {
  const target = document.getElementById("statsGrid");
  target.innerHTML = stats
    .map(
      (item) => `
        <article class="panel stat-card">
          <div class="stat-label">${item.label}</div>
          <div class="stat-value">${item.value}</div>
          <p class="stat-note">${item.note}</p>
        </article>
      `,
    )
    .join("");
}

function renderTimeline() {
  const target = document.getElementById("timeline");
  target.innerHTML = timeline
    .map(
      (item) => `
        <article class="timeline-card">
          <div class="timeline-date">${item.date}</div>
          <h4>${item.title}</h4>
          <p>${item.detail}</p>
        </article>
      `,
    )
    .join("");
}

function renderFocusSections() {
  const target = document.getElementById("focusStack");
  target.innerHTML = focusSections
    .map(
      (section) => `
        <section class="panel focus-section">
          <div class="section-head">
            <div>
              <p class="kicker">重点分类</p>
              <h3>${section.title}</h3>
            </div>
          </div>
          <p class="focus-intro">${section.intro}</p>
          <div class="focus-grid">
            ${section.items
              .map(
                (item) => `
                  <article class="focus-card">
                    <h4>${item.title}</h4>
                    <p>${item.detail}</p>
                    <span class="impact-tag">${item.impact}</span>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function renderActions() {
  const target = document.getElementById("actionList");
  target.innerHTML = actions
    .map(
      (item) => `
        <article class="action-card">
          <h4>${item.title}</h4>
          <p>${item.detail}</p>
          <span class="action-tag">${item.tag}</span>
        </article>
      `,
    )
    .join("");
}

function renderSources() {
  const target = document.getElementById("sourceList");
  target.innerHTML = sources
    .map(
      (item) => `
        <article class="source-card">
          <h4>${item.title}</h4>
          <p>${item.note}</p>
          <p><a class="source-link" href="${item.url}" target="_blank" rel="noreferrer">查看来源</a></p>
        </article>
      `,
    )
    .join("");
}

renderList("quickList", quickPoints);
renderStats();
renderTimeline();
renderFocusSections();
renderActions();
renderSources();
