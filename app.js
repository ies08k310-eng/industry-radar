const state = {
  data: null,
  selectedDate: null,
};

const generatedAt = document.getElementById("generatedAt");
const windowDays = document.getElementById("windowDays");
const dayHeadline = document.getElementById("dayHeadline");
const dayCounts = document.getElementById("dayCounts");
const dayQuickPoints = document.getElementById("dayQuickPoints");
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

function renderCalendar() {
  const calendarDays = [...state.data.days].reverse();
  calendarGrid.innerHTML = calendarDays
    .map((day) => {
      const active = day.date === state.selectedDate ? "is-active" : "";
      const level = getCalendarLevel(day.counts.all);
      return `
        <button class="calendar-day ${active} ${level}" data-date="${day.date}">
          <span class="calendar-weekday">${escapeHtml(day.weekday)}</span>
          <strong class="calendar-label">${escapeHtml(day.label)}</strong>
          <span class="calendar-count">${day.counts.all} 条</span>
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
  eventBoardTitle.textContent = `${day.label}当天新增事件`;
  eventBoardNote.textContent = `${day.weekday} · 共 ${day.counts.all} 条新增信号`;

  eventSections.innerHTML = day.sections
    .map(
      (section) => `
        <section class="event-column">
          <div class="event-column-head">
            <h4>${escapeHtml(section.title)}</h4>
            <span>${section.items.length} 条</span>
          </div>
          <p class="event-column-note">${escapeHtml(section.description)}</p>
          <div class="event-list">
            ${
              section.items.length
                ? section.items
                    .map(
                      (item) => `
                        <article class="event-card">
                          <div class="event-meta">
                            <span>${escapeHtml(item.source)}</span>
                            <span>${escapeHtml(item.published_label)}</span>
                          </div>
                          <h5>${escapeHtml(item.title)}</h5>
                          <div class="event-takeaway">${escapeHtml(item.product_takeaway)}</div>
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
                        </article>
                      `,
                    )
                    .join("")
                : `<div class="event-empty">${escapeHtml(section.empty)}</div>`
            }
          </div>
        </section>
      `,
    )
    .join("");

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
  const today = getDay(state.data.default_date) || state.data.days[0];
  renderHeaderMeta();
  renderTodaySnapshot(today);
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
