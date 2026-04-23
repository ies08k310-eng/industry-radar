const state = {
  data: null,
  selectedDate: null,
  calendarFilter: "all",
};

const generatedAt = document.getElementById("generatedAt");
const windowDays = document.getElementById("windowDays");
const dayHeadline = document.getElementById("dayHeadline");
const dayCounts = document.getElementById("dayCounts");
const dayQuickPoints = document.getElementById("dayQuickPoints");
const calendarNote = document.getElementById("calendarNote");
const calendarFilterBar = document.getElementById("calendarFilterBar");
const calendarGrid = document.getElementById("calendarGrid");
const rollingHeadline = document.getElementById("rollingHeadline");
const rollingOverview = document.getElementById("rollingOverview");
const rollingKeyPoints = document.getElementById("rollingKeyPoints");
const trendGrid = document.getElementById("trendGrid");
const actionGrid = document.getElementById("actionGrid");
const eventBoardTitle = document.getElementById("eventBoardTitle");
const eventBoardNote = document.getElementById("eventBoardNote");
const eventSections = document.getElementById("eventSections");
const citationList = document.getElementById("citationList");

const calendarFilters = [
  { key: "all", label: "全部", note: "显示每天事件总数，点击后跳到当天事件模块。" },
  { key: "competitor", label: "竞品", note: "只看竞品与对标产品动作，颜色深浅按竞品事件数分级。" },
  { key: "demand", label: "需求", note: "只看客户需求与政策信号，方便快速判断需求强弱。" },
  { key: "opportunity", label: "机会", note: "只看商机与事件机会，方便优先查看值得跟进的日期。" },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getDay(dateKey) {
  return state.data.days.find((day) => day.date === dateKey);
}

function getFilterConfig(filterKey = state.calendarFilter) {
  return calendarFilters.find((item) => item.key === filterKey) || calendarFilters[0];
}

function getFilterCount(day, filterKey = state.calendarFilter) {
  return day.counts[filterKey] ?? day.counts.all;
}

function getVisibleSections(day, filterKey = state.calendarFilter) {
  if (filterKey === "all") return day.sections;
  return day.sections.filter((section) => section.key === filterKey);
}

function getFilterCitations(day, filterKey = state.calendarFilter) {
  if (filterKey === "all") return day.citations;

  const seen = new Set();
  const citations = [];

  getVisibleSections(day, filterKey).forEach((section) => {
    section.items.forEach((item) => {
      const citationKey = item.link || `${item.source}-${item.title}`;
      if (seen.has(citationKey)) return;
      seen.add(citationKey);
      citations.push({
        source: item.source,
        title: item.title,
        link: item.link,
      });
    });
  });

  return citations;
}

function arraysEqual(left = [], right = []) {
  if (left.length !== right.length) return false;
  return left.every((item, index) => item === right[index]);
}

function getSharedSectionPlan(section) {
  if (!section.items.length) return null;

  const [first, ...rest] = section.items;
  const hasSharedPlan = rest.every(
    (item) =>
      item.app_module === first.app_module &&
      item.app_change === first.app_change &&
      item.web_module === first.web_module &&
      item.web_change === first.web_change &&
      arraysEqual(item.app_data_points, first.app_data_points) &&
      arraysEqual(item.web_data_points, first.web_data_points),
  );

  if (!hasSharedPlan) return null;

  return {
    app_module: first.app_module,
    app_change: first.app_change,
    app_data_points: first.app_data_points,
    web_module: first.web_module,
    web_change: first.web_change,
    web_data_points: first.web_data_points,
  };
}

function getEventLayoutClass(sectionCount) {
  if (sectionCount <= 1) return "is-single";
  if (sectionCount === 2) return "is-dual";
  return "";
}

function renderEmptyInlineSection(section) {
  return `
    <section class="event-column is-empty-inline">
      <div class="empty-inline-main">
        <h4>${escapeHtml(section.title)}</h4>
        <span class="empty-inline-count">0 条</span>
        <p class="empty-inline-copy">${escapeHtml(section.empty)}</p>
      </div>
    </section>
  `;
}

function renderEventSection(section, { isFocused = false } = {}) {
  const sharedPlan = getSharedSectionPlan(section);
  const sectionClass = ["event-column", isFocused ? "is-focused" : "", sharedPlan ? "has-shared-plan" : ""]
    .filter(Boolean)
    .join(" ");

  return `
    <section class="${sectionClass}">
      <div class="event-column-head">
        <h4>${escapeHtml(section.title)}</h4>
        <span>${section.items.length} 条</span>
      </div>
      <p class="event-column-note">${escapeHtml(section.description)}</p>
      ${
        sharedPlan
          ? `
            <div class="section-plan">
              <div class="section-plan-head">
                <span>本类统一产品动作</span>
                <strong>去掉重复建议，先看共性调整方向</strong>
              </div>
              <div class="section-plan-grid">
                <div class="section-plan-block app-block">
                  <span>企查查 APP：${escapeHtml(sharedPlan.app_module)}</span>
                  <p>${escapeHtml(sharedPlan.app_change)}</p>
                  <div class="chip-row">
                    ${sharedPlan.app_data_points.map((point) => `<span class="data-chip">${escapeHtml(point)}</span>`).join("")}
                  </div>
                </div>
                <div class="section-plan-block web-block">
                  <span>企查查 Web：${escapeHtml(sharedPlan.web_module)}</span>
                  <p>${escapeHtml(sharedPlan.web_change)}</p>
                  <div class="chip-row">
                    ${sharedPlan.web_data_points.map((point) => `<span class="data-chip">${escapeHtml(point)}</span>`).join("")}
                  </div>
                </div>
              </div>
            </div>
          `
          : ""
      }
      <div class="event-list">
        ${section.items
          .map(
            (item) => `
              <article class="event-card ${sharedPlan ? "is-condensed" : ""}">
                <div class="event-meta">
                  <span>${escapeHtml(item.source)}</span>
                  <span>${escapeHtml(item.published_label)}</span>
                </div>
                <h5>${escapeHtml(item.title)}</h5>
                <div class="event-takeaway">${escapeHtml(item.product_takeaway)}</div>
                ${
                  sharedPlan
                    ? `
                      <div class="event-route">
                        <span class="route-tag">建议入口</span>
                        <strong>${escapeHtml(item.app_module)}</strong>
                        <span class="route-divider">/</span>
                        <strong>${escapeHtml(item.web_module)}</strong>
                      </div>
                    `
                    : `
                      <div class="event-compare compact-brief">
                        <div class="event-brief app-brief">
                          <span>APP</span>
                          <strong>${escapeHtml(item.app_module)}</strong>
                          <p>${escapeHtml(item.app_change)}</p>
                          <div class="brief-chip-row">
                            ${item.app_data_points.map((point) => `<span class="brief-chip">${escapeHtml(point)}</span>`).join("")}
                          </div>
                        </div>
                        <div class="event-brief web-brief">
                          <span>Web</span>
                          <strong>${escapeHtml(item.web_module)}</strong>
                          <p>${escapeHtml(item.web_change)}</p>
                          <div class="brief-chip-row">
                            ${item.web_data_points.map((point) => `<span class="brief-chip">${escapeHtml(point)}</span>`).join("")}
                          </div>
                        </div>
                      </div>
                    `
                }
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function getCalendarLevel(count) {
  if (count === 0) return "calendar-level-0";
  if (count <= 2) return "calendar-level-1";
  if (count <= 4) return "calendar-level-2";
  if (count <= 6) return "calendar-level-3";
  return "calendar-level-4";
}

function renderHeaderMeta() {
  generatedAt.textContent = state.data.generated_label;
  windowDays.textContent = `最近 ${state.data.window_days} 天`;
}

function renderCalendarFilters() {
  calendarFilterBar.innerHTML = calendarFilters
    .map((filter) => {
      const active = filter.key === state.calendarFilter ? "is-active" : "";
      const total = state.data.days.reduce((sum, day) => sum + getFilterCount(day, filter.key), 0);
      return `
        <button class="filter-chip ${active}" data-filter="${filter.key}">
          <span>${escapeHtml(filter.label)}</span>
          <strong>${total}</strong>
        </button>
      `;
    })
    .join("");

  calendarNote.textContent = getFilterConfig().note;

  calendarFilterBar.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.calendarFilter = button.dataset.filter;
      renderCalendarFilters();
      renderCalendar();
      renderSelectedDay();
    });
  });
}

function renderCalendar() {
  const calendarDays = [...state.data.days].reverse();
  calendarGrid.innerHTML = calendarDays
    .map((day) => {
      const active = day.date === state.selectedDate ? "is-active" : "";
      const count = getFilterCount(day);
      const level = getCalendarLevel(count);
      return `
        <button class="calendar-day ${active} ${level}" data-date="${day.date}">
          <span class="calendar-weekday">${escapeHtml(day.weekday)}</span>
          <strong class="calendar-label">${escapeHtml(day.label)}</strong>
          <span class="calendar-count">${count} 条</span>
        </button>
      `;
    })
    .join("");

  calendarGrid.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDate = button.dataset.date;
      renderCalendar();
      renderSelectedDay();
      document.getElementById("eventBoard").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderTodaySnapshot(day) {
  dayHeadline.textContent = day.headline;
  dayCounts.innerHTML = [
    { label: "当天新增", value: `${day.counts.all} 条` },
    { label: "竞品动作", value: `${day.counts.competitor} 条` },
    { label: "需求信号", value: `${day.counts.demand} 条` },
    { label: "机会事件", value: `${day.counts.opportunity} 条` },
  ]
    .map(
      (item) => `
        <article class="stat-chip">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `,
    )
    .join("");
  dayQuickPoints.innerHTML = day.quick_points.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderRollingSummary() {
  const summary = state.data.rolling_summary;
  rollingHeadline.textContent = summary.headline;
  rollingOverview.textContent = summary.overview;
  rollingKeyPoints.innerHTML = summary.key_points.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  trendGrid.innerHTML = summary.trends
    .map(
      (trend) => `
        <article class="trend-card">
          <div class="card-top">
            <p class="mini-kicker">近15天信号 ${trend.signal_count} 条</p>
            <h4>${escapeHtml(trend.theme)}</h4>
          </div>
          <p class="card-copy">${escapeHtml(trend.summary)}</p>
          <div class="compare-stack compact-compare">
            <div class="compare-block app-block">
              <span>企查查 APP</span>
              <p>${escapeHtml(trend.app_change)}</p>
              <div class="chip-row">
                ${trend.app_data_points.map((point) => `<span class="data-chip">${escapeHtml(point)}</span>`).join("")}
              </div>
            </div>
            <div class="compare-block web-block">
              <span>企查查 Web</span>
              <p>${escapeHtml(trend.web_change)}</p>
              <div class="chip-row">
                ${trend.web_data_points.map((point) => `<span class="data-chip">${escapeHtml(point)}</span>`).join("")}
              </div>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderActions() {
  const actions = state.data.rolling_summary.actions;
  actionGrid.innerHTML = actions
    .map(
      (action) => `
        <article class="action-card">
          <div class="card-top">
            <p class="mini-kicker">重点方向</p>
            <h4>${escapeHtml(action.title)}</h4>
          </div>
          <div class="compare-stack">
            <div class="compare-block app-block">
              <span>企查查 APP：${escapeHtml(action.app.module)}</span>
              <p>${escapeHtml(action.app.change)}</p>
              <ul>
                ${action.app.data_points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
              </ul>
            </div>
            <div class="compare-block web-block">
              <span>企查查 Web：${escapeHtml(action.web.module)}</span>
              <p>${escapeHtml(action.web.change)}</p>
              <ul>
                ${action.web.data_points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
              </ul>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderSelectedDay() {
  const day = getDay(state.selectedDate) || state.data.days[0];
  const filter = getFilterConfig();
  const visibleSections = getVisibleSections(day);
  const visibleCount = getFilterCount(day);
  const populatedSections = visibleSections.filter((section) => section.items.length);
  const emptySections = visibleSections.filter((section) => !section.items.length);
  const layoutClass = getEventLayoutClass(populatedSections.length || visibleSections.length);

  eventBoardTitle.textContent =
    state.calendarFilter === "all" ? `${day.label}当天新增事件` : `${day.label}${filter.label}新增事件`;
  eventBoardNote.textContent =
    state.calendarFilter === "all"
      ? `${day.weekday} · 共 ${day.counts.all} 条新增信号`
      : `${day.weekday} · ${filter.label} ${visibleCount} 条信号`;
  eventSections.className = `event-sections ${layoutClass}`.trim();

  eventSections.innerHTML = [
    ...populatedSections.map((section) =>
      renderEventSection(section, { isFocused: populatedSections.length === 1 }),
    ),
    ...emptySections.map((section) => renderEmptyInlineSection(section)),
  ].join("");

  const citations = getFilterCitations(day);
  citationList.innerHTML = citations.length
    ? citations
        .map(
          (item) => `
            <a class="citation-item" href="${item.link}" target="_blank" rel="noreferrer">
              <span>${escapeHtml(item.source)}</span>
              <strong>${escapeHtml(item.title)}</strong>
            </a>
          `,
        )
        .join("")
    : `<p class="citation-empty">当日无新增引用来源。</p>`;
}

function renderPage() {
  const today = getDay(state.data.default_date) || state.data.days[0];
  renderHeaderMeta();
  renderTodaySnapshot(today);
  renderCalendarFilters();
  renderCalendar();
  renderRollingSummary();
  renderActions();
  renderSelectedDay();
}

async function load() {
  try {
    const response = await fetch(`./data/daily-brief.json?t=${Date.now()}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.data = await response.json();
    state.selectedDate = state.data.default_date;
    renderPage();
  } catch (error) {
    dayHeadline.textContent = "日报数据加载失败";
    dayQuickPoints.innerHTML = `<li>${escapeHtml(error.message)}</li>`;
  }
}

load();
