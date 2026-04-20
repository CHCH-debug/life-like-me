const focusModes = [
  {
    id: "prototype",
    label: "Prototype",
    title: "把模糊需求做成能演示、能点击、能说服人的交互原型。",
    summary:
      "我更擅长把一句模糊想法拆成信息结构、交互节奏和视觉层次，然后做成可以直接打开体验的网页。适合 MVP 验证、Demo 演示和招聘展示。",
    identityTitle: "Prototype Builder",
    identitySummary: "适合需要短周期、强演示感、移动端可直接打开体验的项目。",
    metrics: [
      { value: "1-2 周", label: "原型交付节奏" },
      { value: "Mobile-first", label: "默认先做手机可打开" },
      { value: "可直发链接", label: "GitHub / 网页即交付" },
    ],
    signals: [
      { title: "信息结构", body: "先决定用户第一眼看到什么，避免页面只是在堆模块。" },
      { title: "交互节奏", body: "会把点击路径、停顿点和情绪节奏一起设计进去。" },
      { title: "视觉方向", body: "不做模板味强的安全答案，页面会有明显个性。" },
      { title: "展示转化", body: "页面不是静态海报，而是可以直接作为演示入口。" },
    ],
    capabilities: {
      title: "先把真实问题压到一个可交付边界里。",
      copy:
        "交互原型不是随便摆几个 section。更重要的是先决定什么信息必须出场、什么动作值得被点击、什么情绪节奏能让人愿意继续往下看。",
      points: [
        "先收窄页面主线，再决定交互强度，而不是一开始就堆满炫技效果。",
        "视觉、文案、交互同频，避免只有 UI 没有叙事。",
        "默认考虑手机端打开体验，不把移动端当成桌面缩小版。",
      ],
      cards: [
        { title: "Narrative", body: "让页面自己解释你是谁、适合做什么。" },
        { title: "Interaction", body: "用切换、滚动、点击来制造理解，而不是只靠文字堆砌。" },
        { title: "Visual direction", body: "每个站都有明确气质，而不是套一个通用 SaaS 模板。" },
        { title: "Deployment", body: "最后交付的是可打开的网页链接，而不是设计稿截图。" },
      ],
    },
  },
  {
    id: "automation",
    label: "Automation",
    title: "把重复的人肉流程整理成稳得住的自动化工作流。",
    summary:
      "从抓取、筛选、打分、生成到状态同步，我更关心流程有没有真的替你省时间，而不是只多写了几个脚本文件。",
    identityTitle: "Workflow Designer",
    identitySummary: "适合有重复动作、信息杂、需要结果稳定输出的小团队。",
    metrics: [
      { value: "30%", label: "已验证效率提升" },
      { value: "Node + Python", label: "工作流常用栈" },
      { value: "端到端", label: "抓取到交付一条线" },
    ],
    signals: [
      { title: "数据入口", body: "公开信息抓取、结构化整理、输入校验都能接起来。" },
      { title: "规则判断", body: "做过滤、打分、优先级和边界约束，不只停在采集。" },
      { title: "输出生成", body: "把模板、批量生成、投递包或汇总结果一起做出来。" },
      { title: "状态追踪", body: "会考虑同步、更新、版本和可回查，不做一次性脚本。" },
    ],
    capabilities: {
      title: "自动化的重点不是跑起来，而是能稳定接下一次。",
      copy:
        "我更偏向把流程做成可重跑、可检查、可交付的结构。这样脚本不是一次性的，而是能逐步沉淀成工作系统。",
      points: [
        "入口、规则、输出、状态四层会分开，不把所有逻辑糊在一个脚本里。",
        "优先做最省时间的节点，不把复杂度浪费在没人会用的环节上。",
        "会明确哪些环节自动处理，哪些环节留给人确认，降低误伤和维护成本。",
      ],
      cards: [
        { title: "Input", body: "公开数据、表格、文本和半结构化信息都能整理到同一入口。" },
        { title: "Logic", body: "按业务需要做过滤、分类、加权和优先级。" },
        { title: "Output", body: "最终不是日志，而是能直接拿去用的报告、包或页面。" },
        { title: "Trace", body: "保留状态更新和证据链，让流程可以复盘。" },
      ],
    },
  },
  {
    id: "growth",
    label: "Growth Ops",
    title: "把内容、获客和 AI 工具包装成能持续复用的业务能力。",
    summary:
      "我做过外贸获客、CRM 分层、关键词优化，也做过小红书分阶段生产流程。适合想低成本试跑增长动作的小团队。",
    identityTitle: "Growth + AI Ops",
    identitySummary: "适合要做冷启动、内容生产和流程复用，但资源有限的业务场景。",
    metrics: [
      { value: "40%", label: "询盘量提升" },
      { value: "8%", label: "邮件开发转化" },
      { value: "冷启动", label: "账号与流程都能搭" },
    ],
    signals: [
      { title: "关键词优化", body: "做过询盘提升和 listing 调整，不是空喊增长。" },
      { title: "CRM 分层", body: "会把线索和客户按可行动规则拆层，不靠拍脑袋。" },
      { title: "内容流程", body: "能把研究、写作、模板和交付编成分阶段工作流。" },
      { title: "AI 包装", body: "把复杂工具变成业务能直接调用的小型能力面板。" },
    ],
    capabilities: {
      title: "增长动作要能被复用，才不是一次性的爆发。",
      copy:
        "我更愿意把增长拆成可被执行、可被记录、可被复用的流程，而不是把结果押在一次随机创意上。",
      points: [
        "先定义最有价值的输入和指标，再决定内容或触达动作怎么跑。",
        "把研究、选题、文案、素材和交付链路接起来，减少上下文丢失。",
        "会保留手动确认边界，避免把高风险动作完全交给自动化。",
      ],
      cards: [
        { title: "Research", body: "先做证据和信号收敛，再决定内容或触达方向。" },
        { title: "Packaging", body: "把结果做成对外能看懂、对内能复用的材料。" },
        { title: "Routing", body: "给不同阶段的任务安排合适的动作和人工确认边界。" },
        { title: "Iteration", body: "做复盘接口，让下一轮不是重新来过。" },
      ],
    },
  },
];

const projectData = [
  {
    tag: "Prototype",
    year: "2026",
    title: "Life Like Me",
    summary:
      "一个移动端优先的交互式产品原型，核心不是打卡，而是让用户通过真实环境里的小动作把生活感重新接回来。",
    teaser: "现实感、交互节奏、移动端体验都直接放在可打开的网页里。",
    points: [
      "把状态分流、建议入口、烦心事收集和下一次复用做成连贯体验。",
      "页面本身就是产品逻辑演示，不需要额外讲解就能理解方向。",
      "已经公开部署，可直接在手机上打开体验。",
    ],
    links: [
      { label: "Open live demo", href: "https://chch-debug.github.io/life-like-me/" },
      { label: "View repo", href: "https://github.com/CHCH-debug/life-like-me" },
    ],
  },
  {
    tag: "AI Tooling",
    year: "2026",
    title: "AI-movie Gateway",
    summary:
      "围绕更大的 AI 视频后端，设计了一层更安全、更小、更容易调用的网关和适配面，把复杂能力缩成可控接口。",
    teaser: "重点不是会用工具，而是能给复杂工具设计出安全边界和稳定调用面。",
    points: [
      "把剪辑、智能编辑、自然语言编辑、文案生成、封面分析压成较小任务面。",
      "明确允许调用的任务边界，降低误用风险和维护成本。",
      "更适合团队或系统集成，而不是只给单人使用的临时脚本。",
    ],
    links: [],
  },
  {
    tag: "Content workflow",
    year: "2026",
    title: "manman Staged Xiaohongshu Workflow",
    summary:
      "把选题研究、账号复盘、证据卡写作、模板选择、出图和手机交付串成一个分阶段的内容生产流程。",
    teaser: "不是只产一篇文案，而是把整条生产链做成能复用的动作系统。",
    points: [
      "把研究和生产拆层，避免一股脑生成带来内容同质化。",
      "保留登录、发布等高风险动作的人工确认边界。",
      "兼顾低风险批量交付和内容风格质量控制。",
    ],
    links: [],
  },
  {
    tag: "Automation",
    year: "2026",
    title: "Job-hunt Automation Toolkit",
    summary:
      "本地优先的自动化投递辅助工具，负责抓取公开机会、做优先级筛选、同步状态，并生成定制化投递材料。",
    teaser: "说明我会围绕真实流程做工具，而不是只交一段孤立脚本。",
    points: [
      "从公开信息获取、候选过滤、跟踪更新到材料生成形成闭环。",
      "输出的是每天可直接执行的清单和投递包，不只是原始数据。",
      "适合演示我处理复杂信息流和多阶段交付的能力。",
    ],
    links: [
      { label: "View repo", href: "https://github.com/CHCH-debug/job-hunt" },
    ],
  },
];

const timelineData = [
  {
    period: "2021 - 2025",
    title: "经济统计训练",
    subtitle: "Hunan University of Finance and Economics",
    copy:
      "起点是经济统计。数据分析、计量、Python 和结构化思考给了我一个习惯：先找变量、先找证据、再决定动作。",
    evidence: ["Statistics", "Econometrics", "Python", "Data analysis"],
  },
  {
    period: "2024",
    title: "从数据看板到现场执行",
    subtitle: "Data analyst / KPI operations",
    copy:
      "做过 20+ 站点的 KPI 分析、看板和成本优化建议。这个阶段让我把“数据要服务动作”这件事真正做实了。",
    evidence: ["20+ sites", "12% cost down", "20% utilization up"],
  },
  {
    period: "2024 - 2025",
    title: "外贸获客与增长支持",
    subtitle: "Foreign trade / lead generation",
    copy:
      "从 0 到 1 搭 Alibaba 国际站，也做 LinkedIn、Facebook、Instagram 冷启动和 CRM 分层。开始把增长、内容和流程编在一起考虑。",
    evidence: ["40% inquiries", "8% email conversion", "0-1 setup"],
  },
  {
    period: "2025 - 2026",
    title: "跨部门流程推进",
    subtitle: "Assistant engineer / operations bridge",
    copy:
      "做过项目节点推进、审批协调、系统与纸面数据对齐，以及周报瓶颈分析。更清楚知道什么叫真实业务里的协作摩擦。",
    evidence: ["30% efficiency gain", "15+ monthly items", "95% on-time"],
  },
  {
    period: "2026 - now",
    title: "AI 工作流与交互原型",
    subtitle: "Current build direction",
    copy:
      "最近把交互原型、内容流程、AI 工具包装和自动化交付压到同一条工作线上。重点不是“我会很多”，而是“我能把一小段事情做成可打开、可复用、可继续推进的结果”。",
    evidence: ["Prototype builds", "Workflow automation", "AI tooling", "Public demos"],
  },
];

const tickerFacts = [
  "30% efficiency gain in cross-system export flow",
  "40% monthly inquiry lift through keyword optimization",
  "8% email conversion via CRM segmentation + Python collection",
  "20+ site KPI tracking and dashboard support",
  "15+ monthly cross-functional items with 95% on-time delivery",
  "Mobile-first public demo already live on GitHub Pages",
];

const els = {
  modeSwitch: document.getElementById("modeSwitch"),
  heroTitle: document.getElementById("heroTitle"),
  heroSummary: document.getElementById("heroSummary"),
  identityTitle: document.getElementById("identityTitle"),
  identitySummary: document.getElementById("identitySummary"),
  metricStrip: document.getElementById("metricStrip"),
  signalGrid: document.getElementById("signalGrid"),
  tickerTrack: document.getElementById("tickerTrack"),
  projectStack: document.getElementById("projectStack"),
  projectTag: document.getElementById("projectTag"),
  projectYear: document.getElementById("projectYear"),
  projectTitle: document.getElementById("projectTitle"),
  projectSummary: document.getElementById("projectSummary"),
  projectPoints: document.getElementById("projectPoints"),
  projectLinks: document.getElementById("projectLinks"),
  projectIndex: document.getElementById("projectIndex"),
  projectPrev: document.getElementById("projectPrev"),
  projectNext: document.getElementById("projectNext"),
  timelineTabs: document.getElementById("timelineTabs"),
  timelineRange: document.getElementById("timelineRange"),
  timelinePeriod: document.getElementById("timelinePeriod"),
  timelineTitle: document.getElementById("timelineTitle"),
  timelineCopy: document.getElementById("timelineCopy"),
  timelineEvidence: document.getElementById("timelineEvidence"),
  capabilityGrid: document.getElementById("capabilityGrid"),
  capabilityTitle: document.getElementById("capabilityTitle"),
  capabilityCopy: document.getElementById("capabilityCopy"),
  capabilityPoints: document.getElementById("capabilityPoints"),
  copyEmail: document.getElementById("copyEmail"),
  copyEmailFooter: document.getElementById("copyEmailFooter"),
  pointerGlow: document.getElementById("pointerGlow"),
};

const state = {
  modeIndex: 0,
  projectIndex: 0,
  timelineIndex: 0,
};

function setAccentPalette(modeId) {
  const palettes = {
    prototype: {
      accent: "#b86b3d",
      strong: "#8d4f2c",
      soft: "rgba(184, 107, 61, 0.14)",
      wash: "rgba(184, 107, 61, 0.08)",
      glow: "rgba(184, 107, 61, 0.26)",
    },
    automation: {
      accent: "#257c77",
      strong: "#175d59",
      soft: "rgba(37, 124, 119, 0.14)",
      wash: "rgba(37, 124, 119, 0.08)",
      glow: "rgba(37, 124, 119, 0.24)",
    },
    growth: {
      accent: "#bf5c55",
      strong: "#8d3c36",
      soft: "rgba(191, 92, 85, 0.14)",
      wash: "rgba(191, 92, 85, 0.08)",
      glow: "rgba(191, 92, 85, 0.24)",
    },
  };

  const palette = palettes[modeId];
  if (!palette) return;

  const root = document.documentElement;
  root.style.setProperty("--accent", palette.accent);
  root.style.setProperty("--accent-strong", palette.strong);
  root.style.setProperty("--accent-soft", palette.soft);
  root.style.setProperty("--accent-wash", palette.wash);
  root.style.setProperty("--glow", palette.glow);
}

function renderModeSwitch() {
  els.modeSwitch.innerHTML = focusModes
    .map(
      (mode, index) => `
        <button
          class="mode-pill"
          type="button"
          role="tab"
          aria-selected="${index === state.modeIndex}"
          data-mode-index="${index}"
        >
          ${mode.label}
        </button>
      `
    )
    .join("");

  els.modeSwitch.querySelectorAll("[data-mode-index]").forEach((button) => {
    button.addEventListener("click", () => setMode(Number(button.dataset.modeIndex)));
  });
}

function renderTicker() {
  const items = [...tickerFacts, ...tickerFacts];
  els.tickerTrack.innerHTML = items.map((item) => `<span class="ticker-pill">${item}</span>`).join("");
}

function renderMode() {
  const mode = focusModes[state.modeIndex];
  setAccentPalette(mode.id);
  els.heroTitle.textContent = mode.title;
  els.heroSummary.textContent = mode.summary;
  els.identityTitle.textContent = mode.identityTitle;
  els.identitySummary.textContent = mode.identitySummary;

  els.metricStrip.innerHTML = mode.metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <strong>${metric.value}</strong>
          <span>${metric.label}</span>
        </article>
      `
    )
    .join("");

  els.signalGrid.innerHTML = mode.signals
    .map(
      (signal) => `
        <article class="signal-card">
          <strong>${signal.title}</strong>
          <p>${signal.body}</p>
        </article>
      `
    )
    .join("");

  renderCapabilities();
}

function setMode(index) {
  state.modeIndex = index;
  renderModeSwitch();
  renderMode();
}

function renderProjects() {
  els.projectStack.innerHTML = projectData
    .map(
      (project, index) => `
        <button
          class="project-card${index === state.projectIndex ? " is-active" : ""}"
          type="button"
          role="option"
          aria-selected="${index === state.projectIndex}"
          data-project-index="${index}"
        >
          <span class="card-tag">${project.tag}</span>
          <strong>${project.title}</strong>
          <p>${project.teaser}</p>
        </button>
      `
    )
    .join("");

  els.projectStack.querySelectorAll("[data-project-index]").forEach((button) => {
    button.addEventListener("click", () => setProject(Number(button.dataset.projectIndex)));
  });

  renderProjectDetail();
}

function renderProjectDetail() {
  const project = projectData[state.projectIndex];
  els.projectTag.textContent = project.tag;
  els.projectYear.textContent = project.year;
  els.projectTitle.textContent = project.title;
  els.projectSummary.textContent = project.summary;
  els.projectPoints.innerHTML = project.points.map((point) => `<li>${point}</li>`).join("");
  els.projectLinks.innerHTML = project.links.length
    ? project.links
        .map(
          (link) =>
            `<a class="link-chip" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`
        )
        .join("")
    : '<span class="link-chip">Private build details available on request</span>';

  els.projectIndex.textContent = `${String(state.projectIndex + 1).padStart(2, "0")} / ${String(projectData.length).padStart(2, "0")}`;
}

function setProject(index) {
  state.projectIndex = (index + projectData.length) % projectData.length;
  renderProjects();
}

function renderTimelineTabs() {
  els.timelineTabs.innerHTML = timelineData
    .map(
      (item, index) => `
        <button
          class="timeline-tab${index === state.timelineIndex ? " is-active" : ""}"
          type="button"
          role="tab"
          aria-selected="${index === state.timelineIndex}"
          data-timeline-index="${index}"
        >
          <strong>${item.title}</strong>
          <span>${item.subtitle}</span>
        </button>
      `
    )
    .join("");

  els.timelineTabs.querySelectorAll("[data-timeline-index]").forEach((button) => {
    button.addEventListener("click", () => setTimeline(Number(button.dataset.timelineIndex)));
  });
}

function renderTimeline() {
  renderTimelineTabs();
  const item = timelineData[state.timelineIndex];
  els.timelineRange.value = String(state.timelineIndex);
  els.timelinePeriod.textContent = item.period;
  els.timelineTitle.textContent = item.title;
  els.timelineCopy.textContent = item.copy;
  els.timelineEvidence.innerHTML = item.evidence.map((fact) => `<span>${fact}</span>`).join("");
}

function setTimeline(index) {
  state.timelineIndex = index;
  renderTimeline();
}

function renderCapabilities() {
  const mode = focusModes[state.modeIndex];
  els.capabilityTitle.textContent = mode.capabilities.title;
  els.capabilityCopy.textContent = mode.capabilities.copy;
  els.capabilityPoints.innerHTML = mode.capabilities.points.map((point) => `<li>${point}</li>`).join("");

  els.capabilityGrid.innerHTML = mode.capabilities.cards
    .map(
      (card, index) => `
        <button
          class="capability-card${index === 0 ? " is-active" : ""}"
          type="button"
          data-capability-index="${index}"
        >
          <strong>${card.title}</strong>
          <p>${card.body}</p>
        </button>
      `
    )
    .join("");

  els.capabilityGrid.querySelectorAll("[data-capability-index]").forEach((button) => {
    button.addEventListener("click", () => {
      els.capabilityGrid.querySelectorAll(".capability-card").forEach((card) => card.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });
}

async function copyEmail(button) {
  try {
    await navigator.clipboard.writeText("2111413873@qq.com");
    const original = button.textContent;
    button.textContent = "已复制";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1400);
  } catch {
    button.textContent = "复制失败";
  }
}

function setupCopyButtons() {
  [els.copyEmail, els.copyEmailFooter].forEach((button) => {
    button.addEventListener("click", () => copyEmail(button));
  });
}

function setupProjectControls() {
  els.projectPrev.addEventListener("click", () => setProject(state.projectIndex - 1));
  els.projectNext.addEventListener("click", () => setProject(state.projectIndex + 1));
}

function setupTimelineControl() {
  els.timelineRange.addEventListener("input", () => setTimeline(Number(els.timelineRange.value)));
}

function setupPointerGlow() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    els.pointerGlow.style.display = "none";
    return;
  }

  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
}

function init() {
  renderModeSwitch();
  renderTicker();
  renderMode();
  renderProjects();
  renderTimeline();
  setupCopyButtons();
  setupProjectControls();
  setupTimelineControl();
  setupPointerGlow();
  setupReveal();
}

init();
