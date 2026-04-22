const state = {
  data: null,
  selectedDate: null,
};

const generatedAt = document.getElementById("generatedAt");
const windowDays = document.getElementById("windowDays");
const headline = document.getElementById("headline");
const overview = document.getElementById("overview");
const summaryStats = document.getElementById("summaryStats");
const quickList = document.getElementById("quickList");
const dateTabs = document.getElementById("dateTabs");
const trendGrid = document.getElementById("trendGrid");
const actionGrid = document.getElementById("actionGrid");
const newsSections = document.getElementById("newsSections");
const citationList = document.getElementById("citationList");

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

function renderHeaderMeta() {
  generatedAt.textContent = state.data.generated_label;
  windowDays.textContent = `最近 ${state.data.window_days} 天`;
}

function renderDateTabs() {
  dateTabs.innerHTML = state.data.days
    .map((day) => {
      const active = day.date === state.selectedDate ? "is-active" : "";
      return `
        <button class="date-tab ${active}" data-date="${day.date}">
          <span>${day.label}</span>
          <strong>${day.counts.all}</strong>
        </button>
      `;
    })
    .join("");

  dateTabs.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedDate = button.dataset.date;
      renderPage();
    });
  });
}

function renderHero(day) {
  headline.textContent = day.headline;
  overview.textContent = day.overview;
  quickList.innerHTML = day.quick_points.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  summaryStats.innerHTML = [
    { label: "当天新增", value: `${day.counts.all} 条` },
    { label: "竞品动作", value: `${day.counts.competitor} 条` },
    { label: "需求信号", value: `${day.counts.demand} 条` },
    { label: "机会信号", value: `${day.counts.opportunity} 条` },
  ]
    .map(
      (item) => `
        <article class="summary-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `,
    )
    .join("");
}

function renderTrends(day) {
  trendGrid.innerHTML = day.trends
    .map(
      (trend) => `
        <article class="trend-card">
          <div class="card-top">
            <p class="mini-kicker">近7天信号 ${trend.signal_count} 条</p>
            <h4>${escapeHtml(trend.theme)}</h4>
          </div>
          <p>${escapeHtml(trend.summary)}</p>
          <div class="insight-block">
            <span>建议动作</span>
            <p>${escapeHtml(trend.product_change)}</p>
          </div>
          <div class="chip-row">
            ${trend.data_points.map((point) => `<span class="data-chip">${escapeHtml(point)}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderActions(day) {
  actionGrid.innerHTML = day.actions
    .map(
      (action) => `
        <article class="action-card">
          <div class="card-top">
            <p class="mini-kicker">建议新增模块</p>
            <h4>${escapeHtml(action.title)}</h4>
          </div>
          <p>${escapeHtml(action.detail)}</p>
          <div class="data-list">
            <span>建议展示的数据内容</span>
            <ul>
              ${action.data_points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
            </ul>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderNews(day) {
  newsSections.innerHTML = day.sections
    .map(
      (section) => `
        <section class="panel section-panel news-panel">
          <div class="section-head">
            <div>
              <p class="kicker">Daily Signals</p>
              <h3>${escapeHtml(section.title)}</h3>
            </div>
            <p class="section-note">${escapeHtml(section.description)}</p>
          </div>
          <div class="news-grid">
            ${
              section.items.length
                ? section.items
                    .map(
                      (item) => `
                        <article class="news-card">
                          <div class="news-meta">
                            <span>${escapeHtml(item.source)}</span>
                            <span>${escapeHtml(item.published_label)}</span>
                          </div>
                          <h4>${escapeHtml(item.title)}</h4>
                          <p>${escapeHtml(item.product_takeaway)}</p>
                          <div class="module-line">
                            <strong>建议模块：</strong>${escapeHtml(item.module)}
                          </div>
                          <div class="chip-row">
                            ${item.data_points.map((point) => `<span class="data-chip">${escapeHtml(point)}</span>`).join("")}
                          </div>
                        </article>
                      `,
                    )
                    .join("")
                : `<div class="empty-card">${escapeHtml(section.empty)}</div>`
            }
          </div>
        </section>
      `,
    )
    .join("");
}

function renderCitations(day) {
  citationList.innerHTML = day.citations.length
    ? day.citations
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
  const day = getDay(state.selectedDate) || state.data.days[0];
  renderHeaderMeta();
  renderDateTabs();
  renderHero(day);
  renderTrends(day);
  renderActions(day);
  renderNews(day);
  renderCitations(day);
}

async function load() {
  try {
    const response = await fetch(`./data/daily-brief.json?t=${Date.now()}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.data = await response.json();
    state.selectedDate = state.data.default_date;
    renderPage();
  } catch (error) {
    headline.textContent = "日报数据加载失败";
    overview.textContent = "未能读取自动更新的数据文件。请稍后刷新，或检查 data/daily-brief.json 是否存在。";
    quickList.innerHTML = `<li>${escapeHtml(error.message)}</li>`;
  }
}

load();
