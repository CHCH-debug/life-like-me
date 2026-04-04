const STORAGE_KEYS = {
  saved: "llm-saved-methods",
  inbox: "llm-annoyance-inbox",
};

const PROFILE_ORDER = ["reset", "low_energy", "procrastination", "irritated"];
const STATE_ORDER = ["tired", "messy", "stuck", "foggy"];
const SUPPORT_ORDER = ["decide", "gentle", "steady", "clear"];

const EFFECT_LABELS = {
  soothe: "先接住",
  order: "先扶正",
  clear: "先减负",
  start: "先打开开头",
  settle: "先降噪",
  prep: "先让明天轻一点",
  reset: "先回正",
};

const profiles = {
  reset: {
    name: "回正模式",
    short: "回正",
    cardCopy: "状态还可以，但想把生活扶正一点。",
    summary: "给精神还行、只是想把生活重新扶正一点的人。这里不用苦情文案，给你更直接、更利落的入口。",
    toneHint: "语气更直接，少一点“我很惨”，多一点“我先把这一块扶正”。",
    stateKicker: "这次你更想先处理哪类阻力",
    stateHeading: "先选这次更接近你的入口。",
    quickLabel: "别让我选了，直接给我一个最顺手的",
    sceneKicker: "现在最卡的是哪一块",
    supportKicker: "这一次，你希望我怎么出手",
    supportHeading: "我会按你这次的模式来收窄建议。",
    completePrompt: "先选一个最像你此刻结果的变化。",
    focusCopyNormal: "先别想后面。做完这一小段，今天就已经往前了一格。",
    focusCopyLighter: "这次我已经帮你切成更小的一步了。做到这里就停，也算成立。",
    defaults: { state: "messy", scene: "desk", support: "decide", lighter: false },
    effectBias: { soothe: 0, order: 2, clear: 2, start: 1, settle: 1, prep: 1, reset: 2 },
    inboxBias: { message: 1, space: 2, sink: 1, admin: 1, tomorrow: 2, body: 1, misc: 1 },
    supportOptions: {
      decide: { title: "直接给我一个最顺手的", desc: "别让我想太多，直接递给我一个能马上做的入口。" },
      gentle: { title: "给我小一点的", desc: "动作可以小，但不要空泛，要真的能落地。" },
      steady: { title: "给我利落一点的", desc: "不要绕太多，给我一步直接、可执行的。" },
      clear: { title: "先帮我清一个挂点", desc: "我想先把一个现实阻力从脑子里拿下去。" },
    },
    stateCards: {
      tired: { title: "我想把状态扶正一点", tag: "回到在线", desc: "不一定很丧，但整个人还没真正进入今天。" },
      messy: { title: "我想把一处收顺", tag: "恢复秩序", desc: "有些乱在打断我，我想先把一小块扶正。" },
      stuck: { title: "我想清掉一个挂点", tag: "减少拖挂", desc: "那件事一直挂着，我想先减掉一点重量。" },
      foggy: { title: "我想先进入今天", tag: "启动一下", desc: "不是很差，就是人还没完全上线。" },
    },
  },
  low_energy: {
    name: "低电量模式",
    short: "低电量",
    cardCopy: "累、钝、想被轻一点接住的时候。",
    summary: "给低能量、想被轻一点接住的时候。这里会把动作切小，不会用高要求和鸡血语气压你。",
    toneHint: "语气更柔、更接住，不把“立刻振作”当成默认要求。",
    stateKicker: "你现在更接近哪一种低电量状态",
    stateHeading: "先对一下你现在更像哪种累法。",
    quickLabel: "我不想想太多，直接给我一个最轻的",
    sceneKicker: "现在最压着你的是哪一块",
    supportKicker: "这一次，你更想被怎么接住",
    supportHeading: "我会优先给你更轻、更不逼迫的入口。",
    completePrompt: "先选一个最接近你现在感受的变化。",
    focusCopyNormal: "先别想后面。做完这一件就可以停，不需要顺手扩展。",
    focusCopyLighter: "这次我已经切到更轻的一步了。做到这里就停，也完全可以。",
    defaults: { state: "foggy", scene: "micro", support: "gentle", lighter: true },
    effectBias: { soothe: 2, order: 1, clear: 1, start: 0, settle: 2, prep: 1, reset: 2 },
    inboxBias: { message: 1, space: 2, sink: 1, admin: 0, tomorrow: 1, body: 2, misc: 1 },
    supportOptions: {
      decide: { title: "替我做决定", desc: "我现在不想想太多，你直接递给我一件就行。" },
      gentle: { title: "给我轻一点的", desc: "别给完整方案，只给我不会把我压住的一步。" },
      steady: { title: "给我稳一点的", desc: "我不想被鸡血推着走，我想被稳稳地接住。" },
      clear: { title: "先帮我少挂着一件", desc: "我想减掉一个小负担，不求一下轻很多。" },
    },
    stateCards: {
      tired: { title: "我很累", tag: "低电量", desc: "今天像没充上电，做什么都很费劲。" },
      messy: { title: "我很乱", tag: "空间失控", desc: "眼前和脑子都乱，看到哪里都想躲开。" },
      stuck: { title: "我拖着一件事", tag: "拖着没碰", desc: "那件小事不大，但一直挂着，越挂越重。" },
      foggy: { title: "我只是不想动", tag: "先别逼我", desc: "不是没有道理，是现在不想被逼着立刻振作。" },
    },
  },
  procrastination: {
    name: "拖延启动",
    short: "拖延",
    cardCopy: "知道要做，但一直没开头的时候。",
    summary: "给明知道该做、但就是迟迟没有启动的人。这里不会把你骂醒，而是直接给开头动作。",
    toneHint: "语气更偏启动和破冰，少讲情绪，多给能立刻碰到的入口。",
    stateKicker: "你这次更像卡在哪种开头上",
    stateHeading: "先选你现在是被什么拖住。",
    quickLabel: "别让我选了，直接给我一个开头",
    sceneKicker: "哪一类开头最难碰",
    supportKicker: "这次你想让我怎么帮你启动",
    supportHeading: "我会优先给能立刻碰到、又不容易继续拖掉的动作。",
    completePrompt: "先选一个能证明你已经动起来的结果。",
    focusCopyNormal: "先别想完整方案，先把开头做出来。开头出来，后面才有得选。",
    focusCopyLighter: "这次我已经把开头切得更小了。先破冰，不求一次做顺。",
    defaults: { state: "stuck", scene: "entry", support: "clear", lighter: false },
    effectBias: { soothe: 0, order: 1, clear: 2, start: 3, settle: 0, prep: 1, reset: 1 },
    inboxBias: { message: 2, space: 1, sink: 1, admin: 2, tomorrow: 2, body: 0, misc: 1 },
    supportOptions: {
      decide: { title: "帮我立刻定一个开头", desc: "别分析太多，帮我定一个最容易碰的起点。" },
      gentle: { title: "别给我太重的", desc: "我能动，但不能一上来就给整套任务。" },
      steady: { title: "给我不容易拖掉的", desc: "我想要一个开始以后不容易散掉的小回合。" },
      clear: { title: "先让我动起来", desc: "我最需要的是从“知道”进入“开始”。" },
    },
    stateCards: {
      tired: { title: "我明知道该做但起不来", tag: "启动失败", desc: "道理都懂，但行动就是没有接上去。" },
      messy: { title: "杂乱把我拖住了", tag: "被打断", desc: "不是没能力，是乱让我总在绕开开始。" },
      stuck: { title: "那件事一直没开头", tag: "入口缺失", desc: "它不一定难，只是我迟迟没碰到第一步。" },
      foggy: { title: "我只想先破冰", tag: "先动一下", desc: "我不需要鼓励很多，只需要一个开机动作。" },
    },
  },
  irritated: {
    name: "减噪模式",
    short: "减噪",
    cardCopy: "脑子太吵、眼前太顶的时候。",
    summary: "给烦躁、脑子太吵、眼前很多东西顶着你的时候。这里会优先切掉噪音和阻力，不再往你身上加东西。",
    toneHint: "语气更偏降噪和减负，不会继续堆情绪词，也不会逼你自我说服。",
    stateKicker: "你现在最像哪一种被顶着的状态",
    stateHeading: "先看清你现在最烦的是哪类噪音。",
    quickLabel: "我不想多选了，直接切掉一个噪点",
    sceneKicker: "现在最顶着你的是哪一块",
    supportKicker: "这一次，你想让我怎么帮你降噪",
    supportHeading: "我会优先给能立刻减阻力、少刺激的动作。",
    completePrompt: "先选一个最像“噪音降下去了一点”的结果。",
    focusCopyNormal: "先别解释原因，先让这个噪点降半格。做到这里就够。",
    focusCopyLighter: "这次我已经给你换成更小的降噪动作了。先减一格，不求完美。",
    defaults: { state: "messy", scene: "desk", support: "steady", lighter: false },
    effectBias: { soothe: 1, order: 1, clear: 2, start: 0, settle: 3, prep: 0, reset: 1 },
    inboxBias: { message: 0, space: 2, sink: 2, admin: 1, tomorrow: 1, body: 1, misc: 1 },
    supportOptions: {
      decide: { title: "直接切掉一个噪点", desc: "别再给我更多选择了，直接切一块阻力下来。" },
      gentle: { title: "别再给我压力", desc: "动作可以小一点，但不要空，不要继续耗我。" },
      steady: { title: "给我降噪一点的", desc: "我想先让眼前和脑子没那么顶。" },
      clear: { title: "先少一个顶着我的点", desc: "我想先让一个现实阻力不再继续吵我。" },
    },
    stateCards: {
      tired: { title: "我有点被耗空了", tag: "体感发涩", desc: "不是纯粹困，是整个人都被磨得有点干。" },
      messy: { title: "眼前太吵了", tag: "噪音过载", desc: "东西不一定很多，但一直顶着我，静不下来。" },
      stuck: { title: "有个点一直顶着我", tag: "现实阻力", desc: "那件事不一定大，但一直卡在心口和眼前。" },
      foggy: { title: "我需要先降点噪", tag: "先缓一格", desc: "我不想做激励题，只想先少一点干扰。" },
    },
  },
};

const sceneCatalog = {
  tired: [
    { id: "body", title: "先把身体叫回来", desc: "适合先做一点能让体感重新上线的动作。" },
    { id: "seat", title: "把待着的地方扶正一点", desc: "先处理你现在正待着的那一小块。" },
    { id: "air", title: "让空间开始流动", desc: "空气、光线和身体一起动一点就够了。" },
  ],
  messy: [
    { id: "desk", title: "桌面这一小块最打断我", desc: "先处理最常进入视线、最容易起作用的一块。" },
    { id: "floor", title: "地上 / 角落很碍事", desc: "不是大清理，只是先减少最顶人的杂乱感。" },
    { id: "sink", title: "厨房 / 水槽挂在那里", desc: "这个点一直存在，我想先把阻力降一点。" },
  ],
  stuck: [
    { id: "message", title: "有一条消息 / 小事挂着", desc: "适合先碰最轻的一条，不扩展到整串任务。" },
    { id: "entry", title: "那件事太大，不知道从哪开头", desc: "这次不用解决，只要把入口找出来。" },
    { id: "tomorrow", title: "我想先让明天顺一点", desc: "先做一个能替明天减压的动作就够了。" },
  ],
  foggy: [
    { id: "micro", title: "我只想先动一毫米", desc: "不给大任务，只给一个几乎能立刻开始的动作。" },
    { id: "body", title: "先让身体在线", desc: "先让体感回来一点，再决定要不要往下走。" },
    { id: "nearby", title: "就处理眼前这一小块", desc: "别讲道理，先让眼前顺一点点。" },
  ],
};

const taskLibrary = [
  { id: "body-reset", states: ["tired", "foggy"], scenes: ["body", "air", "micro"], supports: ["gentle", "steady", "decide"], categories: ["body", "misc"], effects: ["soothe", "reset"], intensity: 1 },
  { id: "surface-reset", states: ["messy", "foggy"], scenes: ["desk", "nearby"], supports: ["decide", "gentle", "steady"], categories: ["space", "misc"], effects: ["order", "settle"], intensity: 1 },
  { id: "five-things", states: ["messy", "tired"], scenes: ["floor", "seat"], supports: ["decide", "gentle", "steady"], categories: ["space", "misc"], effects: ["order", "clear"], intensity: 2 },
  { id: "sink-reset", states: ["messy"], scenes: ["sink"], supports: ["clear", "steady", "decide"], categories: ["sink", "space"], effects: ["clear", "order"], intensity: 2 },
  { id: "message-open", states: ["stuck"], scenes: ["message"], supports: ["clear", "decide", "gentle"], categories: ["message", "misc"], effects: ["clear", "start"], intensity: 1 },
  { id: "entry-open", states: ["stuck"], scenes: ["entry"], supports: ["clear", "steady", "decide"], categories: ["admin", "misc"], effects: ["start", "clear"], intensity: 1 },
  { id: "tomorrow-pack", states: ["stuck", "tired"], scenes: ["tomorrow", "seat"], supports: ["clear", "steady", "decide"], categories: ["tomorrow", "admin"], effects: ["prep", "order"], intensity: 1 },
];

const inboxRules = [
  { id: "message", label: "消息沟通", pattern: /消息|微信|回复|回消息|电话|邮件|联系|客户|老板|群聊|短信/u, stateHint: "stuck", sceneHint: "message", taskBias: "message-open", insight: "这类事最怕一直挂着，先碰一下比一次说清更现实。" },
  { id: "sink", label: "厨房水槽", pattern: /水槽|洗碗|厨房|锅|碗|餐具/u, stateHint: "messy", sceneHint: "sink", taskBias: "sink-reset", insight: "先减一个看得见的阻力点，现实感会先松一点。" },
  { id: "tomorrow", label: "明天准备", pattern: /明天|出门|上班|上课|会议|出差|带|包|钥匙|证件|充电器/u, stateHint: "stuck", sceneHint: "tomorrow", taskBias: "tomorrow-pack", insight: "先替明天铺一个入口，比临时继续压着更有用。" },
  { id: "admin", label: "账单文档", pattern: /账单|报销|材料|表格|发票|申请|文件|文档|合同|缴费/u, stateHint: "stuck", sceneHint: "entry", taskBias: "entry-open", insight: "这类事不用一次搞完，先把入口找出来就不再是一团黑。" },
  { id: "body", label: "身体基础", pattern: /喝水|洗澡|睡觉|睡眠|吃饭|早餐|午饭|晚饭|药|休息/u, stateHint: "tired", sceneHint: "body", taskBias: "body-reset", insight: "体感基础先补一点，后面的动作才更容易接上。" },
  { id: "space", label: "空间杂乱", pattern: /桌|衣服|床|地上|角落|垃圾|快递|纸箱|杯子|纸堆|抽屉|沙发/u, stateHint: "messy", sceneHint: null, taskBias: null, insight: "空间类烦点适合先清一小块，不用一次收完整。" },
];

const state = {
  step: 0,
  profileId: "reset",
  pickedState: null,
  pickedScene: null,
  pickedSupport: null,
  pickedTimer: 2,
  activeTaskId: null,
  lighterMode: false,
  focusRemaining: 120,
  timerId: null,
  completion: null,
  afterglowText: "",
  completeStoppedEarly: false,
  activeReasons: [],
  analysisCopy: "",
  activeInboxItem: null,
};

const screens = {
  state: document.querySelector('[data-screen="state"]'),
  scene: document.querySelector('[data-screen="scene"]'),
  support: document.querySelector('[data-screen="support"]'),
  ritual: document.querySelector('[data-screen="ritual"]'),
  focus: document.querySelector('[data-screen="focus"]'),
  complete: document.querySelector('[data-screen="complete"]'),
};

const progressDots = Array.from(document.querySelectorAll("[data-progress]"));

const ids = {
  profileCards: document.getElementById("profileCards"),
  profileSummary: document.getElementById("profileSummary"),
  toneHint: document.getElementById("toneHint"),
  inboxStats: document.getElementById("inboxStats"),
  stateCards: document.getElementById("stateCards"),
  stateKicker: document.getElementById("stateKicker"),
  stateHeading: document.getElementById("stateHeading"),
  sceneCards: document.getElementById("sceneCards"),
  sceneKicker: document.getElementById("sceneKicker"),
  sceneHeading: document.getElementById("sceneHeading"),
  supportCards: document.getElementById("supportCards"),
  supportKicker: document.getElementById("supportKicker"),
  supportHeading: document.getElementById("supportHeading"),
  profilePill: document.getElementById("profilePill"),
  statePill: document.getElementById("statePill"),
  scenePill: document.getElementById("scenePill"),
  analysisCopy: document.getElementById("analysisCopy"),
  reasonChips: document.getElementById("reasonChips"),
  realityCard: document.getElementById("realityCard"),
  realityTitle: document.getElementById("realityTitle"),
  realityCopy: document.getElementById("realityCopy"),
  ritualTitle: document.getElementById("ritualTitle"),
  ritualCopy: document.getElementById("ritualCopy"),
  ritualSteps: document.getElementById("ritualSteps"),
  timerChips: document.getElementById("timerChips"),
  timerValue: document.getElementById("timerValue"),
  timerNote: document.getElementById("timerNote"),
  focusTitle: document.getElementById("focusTitle"),
  focusCopy: document.getElementById("focusCopy"),
  focusTimer: document.getElementById("focusTimer"),
  focusStep: document.getElementById("focusStep"),
  completionList: document.getElementById("completionList"),
  afterglow: document.getElementById("afterglow"),
  savedList: document.getElementById("savedList"),
  savedSheet: document.getElementById("savedSheet"),
  inboxSheet: document.getElementById("inboxSheet"),
  inboxList: document.getElementById("inboxList"),
  inboxHelper: document.getElementById("inboxHelper"),
  inboxCategorySummary: document.getElementById("inboxCategorySummary"),
  annoyanceInput: document.getElementById("annoyanceInput"),
  returnChip: document.getElementById("savedEntry"),
  inboxEntry: document.getElementById("inboxEntry"),
  sheetBackdrop: document.getElementById("sheetBackdrop"),
};

function getProfile() {
  return profiles[state.profileId];
}

function getStateOptions() {
  const profile = getProfile();
  return STATE_ORDER.map((id) => ({ id, ...profile.stateCards[id] }));
}

function getSceneOptions(stateId) {
  return sceneCatalog[stateId] ?? [];
}

function getSupportOptions() {
  const profile = getProfile();
  return SUPPORT_ORDER.map((id) => ({ id, ...profile.supportOptions[id] }));
}

function setStep(stepName, progressIndex) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[stepName].classList.add("is-active");
  progressDots.forEach((dot, index) => dot.classList.toggle("is-active", index <= progressIndex));
  state.step = progressIndex;
}

function renderProfileCards() {
  ids.profileCards.innerHTML = PROFILE_ORDER.map((profileId) => {
    const profile = profiles[profileId];
    return `
      <button class="persona-card${state.profileId === profileId ? " is-selected" : ""}" type="button" data-profile="${profileId}">
        <span class="persona-name">${escapeHtml(profile.name)}</span>
        <span class="persona-copy">${escapeHtml(profile.cardCopy)}</span>
      </button>
    `;
  }).join("");

  ids.profileCards.querySelectorAll("[data-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      state.profileId = button.dataset.profile;
      renderAllCopy();
      renderProfileCards();
      renderStateCards();
      renderSceneCards();
      renderSupportCards();
      if (state.pickedState && state.pickedScene && state.pickedSupport) {
        resolveRecommendation({ preferLighter: state.lighterMode, preferredTaskId: state.activeTaskId });
        renderRitual();
      }
      renderSavedList();
      renderInboxList();
    });
  });
}

function renderAllCopy() {
  const profile = getProfile();
  ids.profileSummary.textContent = profile.summary;
  ids.toneHint.textContent = profile.toneHint;
  ids.stateKicker.textContent = profile.stateKicker;
  ids.stateHeading.textContent = profile.stateHeading;
  ids.sceneKicker.textContent = profile.sceneKicker;
  ids.supportKicker.textContent = profile.supportKicker;
  ids.supportHeading.textContent = profile.supportHeading;
  document.getElementById("quickDecide").textContent = profile.quickLabel;
  renderInboxStats();
}

function renderInboxStats() {
  const items = getInbox();
  ids.inboxEntry.textContent = items.length > 0 ? `烦心事收集箱 ${items.length}` : "先把烦心事放这里";
  if (items.length === 0) {
    ids.inboxStats.innerHTML = `
      <span class="insight-chip is-empty">还没有真实素材</span>
      <span class="insight-chip is-empty">先存 1 条，推荐会更贴你</span>
    `;
    return;
  }

  const stats = summarizeInbox(items);
  ids.inboxStats.innerHTML = stats.map((item) => `
    <span class="insight-chip">${escapeHtml(`${item.label} ${item.count}`)}</span>
  `).join("");
}

function renderStateCards() {
  ids.stateCards.innerHTML = getStateOptions().map((item) => `
    <button class="select-card${state.pickedState === item.id ? " is-selected" : ""}" type="button" data-state="${item.id}">
      <div class="card-head">
        <span class="card-title">${escapeHtml(item.title)}</span>
        <span class="tag">${escapeHtml(item.tag)}</span>
      </div>
      <p class="card-desc">${escapeHtml(item.desc)}</p>
    </button>
  `).join("");

  ids.stateCards.querySelectorAll("[data-state]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pickedState = button.dataset.state;
      state.pickedScene = null;
      state.pickedSupport = null;
      state.activeTaskId = null;
      state.activeInboxItem = null;
      state.lighterMode = false;
      state.completion = null;
      state.afterglowText = "";
      renderStateCards();
      renderSceneCards();
      renderSupportCards();
      renderRitual();
      setStep("scene", 1);
    });
  });
}

function renderSceneCards() {
  const scenes = getSceneOptions(state.pickedState);
  ids.sceneHeading.textContent = getStateOptions().find((item) => item.id === state.pickedState)?.title ?? "我先知道你是卡在哪。";
  ids.sceneCards.innerHTML = scenes.map((item) => `
    <button class="select-card${state.pickedScene === item.id ? " is-selected" : ""}" type="button" data-scene="${item.id}">
      <div class="card-head">
        <span class="card-title">${escapeHtml(item.title)}</span>
      </div>
      <p class="card-desc">${escapeHtml(item.desc)}</p>
    </button>
  `).join("");

  ids.sceneCards.querySelectorAll("[data-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pickedScene = button.dataset.scene;
      state.pickedSupport = null;
      state.activeTaskId = null;
      state.lighterMode = false;
      state.completion = null;
      state.afterglowText = "";
      renderSceneCards();
      renderSupportCards();
      renderRitual();
      setStep("support", 2);
    });
  });
}

function renderSupportCards() {
  ids.supportCards.innerHTML = getSupportOptions().map((item) => `
    <button class="support-card${state.pickedSupport === item.id ? " is-selected" : ""}" type="button" data-support="${item.id}">
      <div class="card-head">
        <span class="card-title">${escapeHtml(item.title)}</span>
      </div>
      <p class="support-desc">${escapeHtml(item.desc)}</p>
    </button>
  `).join("");

  ids.supportCards.querySelectorAll("[data-support]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pickedSupport = button.dataset.support;
      state.completion = null;
      state.afterglowText = "";
      resolveRecommendation();
      renderRitual();
      setStep("ritual", 3);
    });
  });
}

function analyzeAnnoyance(text) {
  const trimmed = String(text).trim();
  const matched = inboxRules.find((rule) => rule.pattern.test(trimmed));

  if (matched) {
    const sceneHint = matched.id === "space" ? inferSpaceScene(trimmed) : matched.sceneHint;
    const taskBias = matched.id === "space" ? inferSpaceTask(sceneHint) : matched.taskBias;
    return {
      categoryId: matched.id,
      label: matched.label,
      stateHint: matched.stateHint,
      sceneHint,
      taskBias,
      insight: matched.insight,
    };
  }

  return {
    categoryId: "misc",
    label: "待处理小事",
    stateHint: "stuck",
    sceneHint: "entry",
    taskBias: "entry-open",
    insight: "先把它从脑子里拿出来，再切成一个能碰的入口。",
  };
}

function inferSpaceScene(text) {
  if (/床边|沙发/u.test(text)) return "seat";
  if (/地上|角落/u.test(text)) return "floor";
  return "desk";
}

function inferSpaceTask(sceneHint) {
  return sceneHint === "floor" || sceneHint === "seat" ? "five-things" : "surface-reset";
}

function normalizeInboxItem(item, index = 0) {
  const createdAt = item.createdAt || new Date().toISOString();
  const analysis = item.analysis && item.analysis.categoryId ? item.analysis : analyzeAnnoyance(item.text || "");
  return {
    id: item.id || `inbox-${Date.now()}-${index}`,
    text: String(item.text || "").trim(),
    createdAt,
    createdAtLabel: item.createdAtLabel || formatInboxTime(createdAt),
    analysis,
  };
}

function getInbox() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS.inbox)) ?? [];
    return parsed
      .map((item, index) => normalizeInboxItem(item, index))
      .filter((item) => item.text);
  } catch {
    return [];
  }
}

function persistInbox(items) {
  localStorage.setItem(STORAGE_KEYS.inbox, JSON.stringify(items.slice(0, 20)));
}

function summarizeInbox(items) {
  const counts = new Map();
  items.forEach((item) => {
    const label = item.analysis.label;
    counts.set(label, (counts.get(label) || 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}

function renderInboxList() {
  const items = getInbox();
  const stats = summarizeInbox(items);
  ids.inboxCategorySummary.innerHTML = stats.length > 0
    ? stats.map((item) => `<span class="insight-chip">${escapeHtml(`${item.label} ${item.count}`)}</span>`).join("")
    : `<span class="insight-chip is-empty">还没有可供参考的烦点</span>`;

  if (items.length === 0) {
    ids.inboxList.innerHTML = `
      <div class="saved-card empty">
        <div class="saved-title">这里还没有内容</div>
        <p class="card-desc">你状态还可以的时候，把最近烦你的几件小事先放进来。以后你不想解释太多时，这里就能给推荐提供真实素材。</p>
      </div>
    `;
    return;
  }

  ids.inboxList.innerHTML = items.map((item) => `
    <article class="saved-card${state.activeInboxItem?.id === item.id ? " is-selected" : ""}">
      <div class="saved-head">
        <span class="saved-title">${escapeHtml(item.text)}</span>
        <span class="tag">${escapeHtml(item.analysis.label)}</span>
      </div>
      <p class="card-desc">${escapeHtml(item.analysis.insight)}</p>
      <p class="saved-meta">${escapeHtml(item.createdAtLabel)}</p>
      <div class="inline-actions">
        <button class="tiny-button" type="button" data-use-annoyance="${item.id}">拿来生成建议</button>
        <button class="tiny-button is-muted" type="button" data-delete-annoyance="${item.id}">删除</button>
      </div>
    </article>
  `).join("");

  ids.inboxList.querySelectorAll("[data-use-annoyance]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = getInbox().find((entry) => entry.id === button.dataset.useAnnoyance);
      if (!item) return;
      applyInboxItem(item);
    });
  });

  ids.inboxList.querySelectorAll("[data-delete-annoyance]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = getInbox().filter((entry) => entry.id !== button.dataset.deleteAnnoyance);
      persistInbox(next);
      if (state.activeInboxItem?.id === button.dataset.deleteAnnoyance) {
        state.activeInboxItem = null;
      }
      ids.inboxHelper.textContent = "这条已经移出收集箱。";
      renderInboxStats();
      renderInboxList();
      if (state.pickedState && state.pickedScene && state.pickedSupport) {
        resolveRecommendation({ preferLighter: state.lighterMode, preferredTaskId: state.activeTaskId });
        renderRitual();
      }
    });
  });
}

function saveAnnoyance() {
  const text = ids.annoyanceInput.value.trim();
  if (!text) {
    ids.annoyanceInput.focus();
    return;
  }

  const analysis = analyzeAnnoyance(text);
  const createdAt = new Date().toISOString();
  const items = getInbox().filter((item) => item.text !== text);
  items.unshift({
    id: `inbox-${Date.now()}`,
    text,
    createdAt,
    createdAtLabel: formatInboxTime(createdAt),
    analysis,
  });
  persistInbox(items);
  ids.annoyanceInput.value = "";
  ids.inboxHelper.textContent = `刚刚已粗分为“${analysis.label}”。${analysis.insight}`;
  renderInboxStats();
  renderInboxList();
}

function scoreInboxItem(item, preferredState, preferredScene) {
  const bias = getProfile().inboxBias[item.analysis.categoryId] ?? 0;
  let score = bias;
  if (preferredState && item.analysis.stateHint === preferredState) score += 3;
  if (preferredScene && item.analysis.sceneHint === preferredScene) score += 2;
  return score;
}

function pickBestInboxItem(preferredState, preferredScene) {
  const items = getInbox();
  if (items.length === 0) return null;
  return items
    .map((item) => ({ item, score: scoreInboxItem(item, preferredState, preferredScene) }))
    .sort((a, b) => b.score - a.score)[0]?.item ?? null;
}

function applyInboxItem(item) {
  clearInterval(state.timerId);
  state.pickedState = item.analysis.stateHint;
  state.pickedScene = item.analysis.sceneHint || "entry";
  state.pickedSupport = getProfile().defaults.support;
  state.pickedTimer = 2;
  state.activeInboxItem = item;
  state.completion = null;
  state.afterglowText = "";
  state.lighterMode = false;
  renderStateCards();
  renderSceneCards();
  renderSupportCards();
  resolveRecommendation({ inboxItem: item });
  renderRitual();
  closeSheets();
  setStep("ritual", 3);
}

function useInboxForDecision() {
  const item = pickBestInboxItem(getProfile().defaults.state, getProfile().defaults.scene);
  if (!item) return;
  applyInboxItem(item);
}

function autoSelectInboxItem() {
  if (state.activeInboxItem) return state.activeInboxItem;
  if (!state.pickedState || !state.pickedScene || !state.pickedSupport) return null;
  const shouldUseInbox = state.pickedSupport === "clear" || state.pickedState === "stuck" || state.profileId === "procrastination";
  if (!shouldUseInbox) return null;
  return pickBestInboxItem(state.pickedState, state.pickedScene);
}

function scoreTask(task, context) {
  let score = 0;

  if (task.states.includes(context.pickedState)) score += 5;
  if (task.scenes.includes(context.pickedScene)) score += 4;
  if (task.supports.includes(context.pickedSupport)) score += 3;

  task.effects.forEach((effect) => {
    score += getProfile().effectBias[effect] ?? 0;
  });

  if (context.inboxItem) {
    const analysis = context.inboxItem.analysis;
    if (task.categories.includes(analysis.categoryId)) score += 4;
    if (analysis.stateHint === context.pickedState) score += 1;
    if (analysis.sceneHint && task.scenes.includes(analysis.sceneHint)) score += 2;
    if (analysis.taskBias === task.id) score += 3;
  }

  if (context.pickedSupport === "gentle") score += Math.max(0, 3 - task.intensity * 2);
  if (context.pickedSupport === "clear") {
    if (task.effects.includes("clear")) score += 2;
    if (task.effects.includes("start")) score += 1;
  }
  if (context.pickedSupport === "steady" && (task.effects.includes("settle") || task.effects.includes("order"))) score += 1;
  if (context.pickedSupport === "decide" && task.intensity <= 2) score += 1;
  if (context.pickedState === "tired" && task.intensity > 1) score -= 2;
  if (context.profileId === "low_energy" && task.intensity > 1) score -= 1;
  if (context.preferLighter) score -= task.intensity * 3;
  if (context.preferredTaskId === task.id) score += 4;

  return score;
}

function resolveRecommendation(options = {}) {
  const explicitInbox = Object.prototype.hasOwnProperty.call(options, "inboxItem");
  const inboxItem = explicitInbox ? options.inboxItem : autoSelectInboxItem();
  const context = {
    profileId: state.profileId,
    pickedState: state.pickedState,
    pickedScene: state.pickedScene,
    pickedSupport: state.pickedSupport,
    inboxItem,
    preferLighter: Boolean(options.preferLighter),
    preferredTaskId: options.preferredTaskId || null,
  };

  const best = taskLibrary
    .map((task) => ({ task, score: scoreTask(task, context) }))
    .sort((a, b) => b.score - a.score)[0];

  state.activeTaskId = best?.task?.id ?? null;
  state.activeInboxItem = inboxItem;

  const content = getTaskContent(state.activeTaskId, state.profileId, state.activeInboxItem);
  state.lighterMode = Boolean(options.preferLighter && content?.lighter);
  state.activeReasons = buildReasonChips(context, best?.task).slice(0, 5);
  state.analysisCopy = buildAnalysisCopy(context, best?.task);
}

function buildReasonChips(context, task) {
  if (!task) return ["先完成前面的选择"];

  const chips = [
    getProfile().name,
    `状态：${findTitle(getStateOptions(), context.pickedState) ?? "未选"}`,
    `场景：${findTitle(getSceneOptions(context.pickedState), context.pickedScene) ?? "未选"}`,
    `帮法：${findTitle(getSupportOptions(), context.pickedSupport) ?? "未选"}`,
  ];

  const primaryEffect = pickPrimaryEffect(task);
  if (primaryEffect) chips.push(`策略：${EFFECT_LABELS[primaryEffect]}`);
  if (context.inboxItem) chips.push(`参考：${context.inboxItem.analysis.label}`);
  return chips;
}

function buildAnalysisCopy(context, task) {
  if (!task) {
    return "先选前面的内容，我再说明为什么这条建议更贴合你。";
  }

  const profile = getProfile();
  const stateTitle = findTitle(getStateOptions(), context.pickedState) ?? "未选择的状态";
  const sceneTitle = findTitle(getSceneOptions(context.pickedState), context.pickedScene) ?? "未选择的场景";
  const supportTitle = findTitle(getSupportOptions(), context.pickedSupport) ?? "未选择的帮法";
  const primaryEffect = EFFECT_LABELS[pickPrimaryEffect(task)] ?? "先落地";
  const inboxLine = context.inboxItem ? ` 这次还参考了你收集箱里的“${truncate(context.inboxItem.text, 18)}”。` : "";

  return `你现在走的是“${profile.name}”，更接近“${stateTitle}”，卡点在“${sceneTitle}”，而且你希望我“${supportTitle}”。所以我没有给一条通用文案，而是给你一条“${primaryEffect}”的现实入口。${inboxLine}`;
}

function pickPrimaryEffect(task) {
  return [...task.effects].sort((a, b) => (getProfile().effectBias[b] ?? 0) - (getProfile().effectBias[a] ?? 0))[0];
}

function renderTimerChips() {
  ids.timerChips.innerHTML = [2, 5, 10].map((value) => `
    <button class="timer-chip${state.pickedTimer === value ? " is-selected" : ""}" type="button" data-timer="${value}">
      ${value} 分钟
    </button>
  `).join("");

  ids.timerChips.querySelectorAll("[data-timer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pickedTimer = Number(button.dataset.timer);
      ids.timerValue.textContent = formatTime(state.pickedTimer * 60);
      renderTimerChips();
    });
  });
}

function renderRitual() {
  const view = currentRitualView();
  ids.profilePill.textContent = `模式：${getProfile().name}`;
  ids.statePill.textContent = `状态：${findTitle(getStateOptions(), state.pickedState) ?? "未选择"}`;
  ids.scenePill.textContent = `场景：${findTitle(getSceneOptions(state.pickedState), state.pickedScene) ?? "未选择"}`;
  ids.analysisCopy.textContent = state.analysisCopy || "先选前面的内容，我再说明为什么这条建议更贴合你。";
  ids.reasonChips.innerHTML = (state.activeReasons.length > 0 ? state.activeReasons : ["先完成前面的选择"]).map((item) => `
    <span class="reason-chip${state.activeReasons.length > 0 ? "" : " is-empty"}">${escapeHtml(item)}</span>
  `).join("");
  ids.timerValue.textContent = formatTime(state.pickedTimer * 60);
  ids.timerNote.textContent = state.lighterMode ? "这次我已经自动往更轻的一侧切了。" : "这次只做一个小回合，不扩展。";
  renderTimerChips();

  if (state.activeInboxItem) {
    ids.realityCard.hidden = false;
    ids.realityTitle.textContent = state.activeInboxItem.text;
    ids.realityCopy.textContent = `系统粗分：${state.activeInboxItem.analysis.label}。${state.activeInboxItem.analysis.insight}`;
  } else {
    ids.realityCard.hidden = true;
    ids.realityTitle.textContent = "";
    ids.realityCopy.textContent = "";
  }

  if (!view) {
    ids.ritualTitle.textContent = "先选前面的内容，我再把这一件事递给你。";
    ids.ritualCopy.textContent = "这里不会把同一种语言和方法塞给所有人。";
    ids.ritualSteps.innerHTML = "<li>先选人群模式</li><li>再选眼前最卡的地方</li><li>再告诉我你想被怎么帮</li>";
    return;
  }

  ids.ritualTitle.textContent = view.title;
  ids.ritualCopy.textContent = view.copy;
  ids.ritualSteps.innerHTML = view.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
}

function currentRitualView() {
  const content = getTaskContent(state.activeTaskId, state.profileId, state.activeInboxItem);
  if (!content) return null;
  if (state.lighterMode && content.lighter) {
    return {
      title: content.lighter.title,
      copy: content.lighter.copy,
      steps: content.lighter.steps,
      complete: content.complete,
      after: content.after,
    };
  }
  return {
    title: content.title,
    copy: content.copy,
    steps: content.steps,
    complete: content.complete,
    after: content.after,
  };
}

function startFocus() {
  const view = currentRitualView();
  if (!view) return;
  state.focusRemaining = state.pickedTimer * 60;
  ids.focusTitle.textContent = view.title;
  ids.focusCopy.textContent = state.lighterMode ? getProfile().focusCopyLighter : getProfile().focusCopyNormal;
  ids.focusStep.textContent = view.steps[0];
  ids.focusTimer.textContent = formatTime(state.focusRemaining);
  setStep("focus", 3);
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    state.focusRemaining -= 1;
    ids.focusTimer.textContent = formatTime(Math.max(0, state.focusRemaining));
    if (state.focusRemaining <= 0) clearInterval(state.timerId);
  }, 1000);
}

function finishFocus(stoppedEarly = false) {
  clearInterval(state.timerId);
  state.completeStoppedEarly = stoppedEarly;
  state.completion = null;
  state.afterglowText = "";
  renderCompletion();
  setStep("complete", 3);
}

function renderCompletion() {
  const view = currentRitualView();
  const choices = view?.complete ?? ["眼前轻一点了", "我没刚才那么卡了", "我至少动了一下"];

  ids.completionList.innerHTML = choices.map((item) => `
    <button class="completion-card${state.completion === item ? " is-selected" : ""}" type="button" data-completion="${escapeHtml(item)}">
      <div class="card-title">${escapeHtml(item)}</div>
    </button>
  `).join("");

  ids.completionList.querySelectorAll("[data-completion]").forEach((button) => {
    button.addEventListener("click", () => {
      state.completion = button.dataset.completion;
      const afterLines = view?.after ?? ["今天先做到这里，也算把自己往现实里接回来一点。"];
      const picked = afterLines[Math.floor(Math.random() * afterLines.length)];
      state.afterglowText = `${picked} 你刚刚选的是：“${state.completion}”。`;
      renderCompletion();
    });
  });

  const defaultPrompt = state.completeStoppedEarly
    ? "你没有把这次做完整，也没关系。能停在一个你还能接受的位置，本身就是一种照顾。"
    : getProfile().completePrompt;

  ids.afterglow.textContent = state.afterglowText || defaultPrompt;
  ids.afterglow.classList.add("is-visible");
}

function normalizeSavedItem(item, index = 0) {
  return {
    id: item.id || `saved-${index}`,
    taskId: item.taskId || item.id || null,
    title: item.title || "留给下次的办法",
    copy: item.copy || "",
    profileId: item.profileId || "reset",
    state: item.state || null,
    scene: item.scene || null,
    support: item.support || null,
    lighterMode: Boolean(item.lighterMode),
    inboxSnapshot: item.inboxSnapshot ? normalizeInboxItem(item.inboxSnapshot, index) : null,
    stateTitle: item.stateTitle || "",
    supportTitle: item.supportTitle || "",
  };
}

function getSaved() {
  try {
    return (JSON.parse(localStorage.getItem(STORAGE_KEYS.saved)) ?? []).map((item, index) => normalizeSavedItem(item, index));
  } catch {
    return [];
  }
}

function persistSaved(items) {
  localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(items.slice(0, 8)));
}

function renderSavedList() {
  const saved = getSaved();
  ids.returnChip.textContent = `留给下次的办法 ${saved.length} 个`;

  if (saved.length === 0) {
    ids.savedList.innerHTML = `
      <div class="saved-card empty">
        <div class="saved-title">这里还没有留东西</div>
        <p class="card-desc">当某一次方法真的帮到了你，就把它留在这里。下次不必再从头解释，也不用重新找入口。</p>
      </div>
    `;
    return;
  }

  ids.savedList.innerHTML = saved.map((item) => `
    <button class="saved-card is-clickable" type="button" data-saved="${item.id}">
      <div class="saved-head">
        <span class="saved-title">${escapeHtml(item.title)}</span>
        <span class="tag">${escapeHtml(profiles[item.profileId]?.short || "旧版")}</span>
      </div>
      <p class="card-desc">${escapeHtml(item.copy)}</p>
      <p class="saved-meta">${escapeHtml(`${item.stateTitle || "未标记状态"} · ${item.supportTitle || "未标记帮法"}`)}</p>
    </button>
  `).join("");

  ids.savedList.querySelectorAll("[data-saved]").forEach((button) => {
    button.addEventListener("click", () => {
      const savedItem = getSaved().find((item) => item.id === button.dataset.saved);
      if (!savedItem) return;
      state.profileId = savedItem.profileId;
      state.pickedState = savedItem.state;
      state.pickedScene = savedItem.scene;
      state.pickedSupport = savedItem.support;
      state.activeInboxItem = savedItem.inboxSnapshot;
      state.pickedTimer = 2;
      state.completion = null;
      state.afterglowText = "";
      renderAllCopy();
      renderProfileCards();
      renderStateCards();
      renderSceneCards();
      renderSupportCards();
      resolveRecommendation({
        preferLighter: savedItem.lighterMode,
        preferredTaskId: savedItem.taskId,
        inboxItem: savedItem.inboxSnapshot,
      });
      renderRitual();
      closeSheets();
      setStep("ritual", 3);
    });
  });
}

function saveCurrentMethod() {
  const view = currentRitualView();
  if (!view || !state.activeTaskId) return;

  const saved = getSaved().filter((item) => item.taskId !== state.activeTaskId || item.profileId !== state.profileId);
  saved.unshift({
    id: `saved-${Date.now()}`,
    taskId: state.activeTaskId,
    title: view.title,
    copy: view.copy,
    profileId: state.profileId,
    state: state.pickedState,
    scene: state.pickedScene,
    support: state.pickedSupport,
    lighterMode: state.lighterMode,
    inboxSnapshot: state.activeInboxItem,
    stateTitle: findTitle(getStateOptions(), state.pickedState),
    supportTitle: findTitle(getSupportOptions(), state.pickedSupport),
  });
  persistSaved(saved);
  renderSavedList();
  ids.afterglow.textContent = "这次的方法已经给你留好了。下次不用再从头解释，可以直接从这里进入。";
  ids.afterglow.classList.add("is-visible");
}

function openSheet(type) {
  closeSheets();
  document.body.classList.add("has-sheet");
  ids.sheetBackdrop.classList.add("is-open");

  if (type === "saved") {
    ids.savedSheet.classList.add("is-open");
    ids.savedSheet.setAttribute("aria-hidden", "false");
    renderSavedList();
  }

  if (type === "inbox") {
    ids.inboxSheet.classList.add("is-open");
    ids.inboxSheet.setAttribute("aria-hidden", "false");
    ids.inboxHelper.textContent = "它会做粗分，不会把你的输入当成心理诊断。";
    renderInboxList();
  }
}

function closeSheets() {
  document.body.classList.remove("has-sheet");
  ids.sheetBackdrop.classList.remove("is-open");
  ids.savedSheet.classList.remove("is-open");
  ids.savedSheet.setAttribute("aria-hidden", "true");
  ids.inboxSheet.classList.remove("is-open");
  ids.inboxSheet.setAttribute("aria-hidden", "true");
}

function resetJourney() {
  clearInterval(state.timerId);
  state.pickedState = null;
  state.pickedScene = null;
  state.pickedSupport = null;
  state.pickedTimer = 2;
  state.activeTaskId = null;
  state.lighterMode = false;
  state.completion = null;
  state.afterglowText = "";
  state.completeStoppedEarly = false;
  state.activeReasons = [];
  state.analysisCopy = "";
  state.activeInboxItem = null;
  renderStateCards();
  renderSceneCards();
  renderSupportCards();
  renderRitual();
  setStep("state", 0);
}

function quickDecide() {
  const candidate = pickBestInboxItem(getProfile().defaults.state, getProfile().defaults.scene);
  if (candidate) {
    applyInboxItem(candidate);
    if (getProfile().defaults.lighter) {
      resolveRecommendation({ inboxItem: candidate, preferLighter: true });
      renderRitual();
    }
    return;
  }

  const defaults = getProfile().defaults;
  state.pickedState = defaults.state;
  state.pickedScene = defaults.scene;
  state.pickedSupport = defaults.support;
  state.activeInboxItem = null;
  state.pickedTimer = 2;
  state.completion = null;
  state.afterglowText = "";
  renderStateCards();
  renderSceneCards();
  renderSupportCards();
  resolveRecommendation({ preferLighter: defaults.lighter });
  renderRitual();
  setStep("ritual", 3);
}

function findTitle(list, id) {
  return list.find((item) => item.id === id)?.title;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatInboxTime(value) {
  const date = new Date(value);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}/${day} ${hours}:${minutes}`;
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getInboxText(item, allowedCategories) {
  if (!item || !allowedCategories.includes(item.analysis.categoryId)) return "";
  return truncate(item.text, 20);
}

function getTaskContent(taskId, profileId, inboxItem) {
  if (!taskId) return null;

  switch (taskId) {
    case "body-reset":
      return buildBodyResetContent(profileId);
    case "surface-reset":
      return buildSurfaceResetContent(profileId, inboxItem);
    case "five-things":
      return buildFiveThingsContent(profileId, inboxItem);
    case "sink-reset":
      return buildSinkResetContent(profileId, inboxItem);
    case "message-open":
      return buildMessageOpenContent(profileId, inboxItem);
    case "entry-open":
      return buildEntryOpenContent(profileId, inboxItem);
    case "tomorrow-pack":
      return buildTomorrowPackContent(profileId, inboxItem);
    default:
      return null;
  }
}

function buildBodyResetContent(profileId) {
  switch (profileId) {
    case "low_energy":
      return {
        title: "先让身体回来一点",
        copy: "不是要求你振作，只是先把身体从停住的地方轻轻接回来。",
        steps: ["喝一口水。", "把窗帘拉开一点，或者站到更亮的地方停 10 秒。", "做完就停，不往下加任务。"],
        lighter: {
          title: "先只喝一口水",
          copy: "这次轻到只做一个身体动作就够了。",
          steps: ["喝一口水。", "做到这里就停。"],
        },
        complete: ["身体回来一点了", "人没刚才那么闷了", "我至少没继续停在那里"],
        after: ["你刚刚做的不是小事，是把自己从静止里接回来一点。", "今天不一定要变好，但至少你没有把自己完全丢下。"],
      };
    case "procrastination":
      return {
        title: "先用一个身体动作破冰",
        copy: "别先等动力，先给大脑一个“已经开始了”的证据。",
        steps: ["喝一口水。", "站起来走 5 步，或者把肩膀放松一下。", "做到这里就停，先把冰层敲开。"],
        lighter: {
          title: "先站起来一下",
          copy: "今天先只做最小的开机动作。",
          steps: ["站起来一下。", "坐回去也没关系，但这一下已经算开始。"],
        },
        complete: ["我已经不是完全没动", "开头被我碰到了", "原来启动可以这么小"],
        after: ["拖延常常不是不会做，而是没有第一下。你刚刚已经做了第一下。", "只要开始的证据出现，后面就不再全是脑内想象。"],
      };
    case "irritated":
      return {
        title: "先降一点体感噪音",
        copy: "先别分析情绪，先把身体的不舒服降半格。",
        steps: ["喝一口水。", "把肩膀放松一下，或者把窗帘拉开一半。", "做到这里就停，不继续给自己加任务。"],
        lighter: {
          title: "先只改一个体感",
          copy: "先让身体少一格不舒服，就够了。",
          steps: ["喝一口水，或者拉开一点窗帘。", "做到这里就停。"],
        },
        complete: ["我没刚才那么顶了", "体感降了一点噪", "至少人没继续发涩"],
        after: ["有时候先缓的不是情绪，而是身体。身体松半格，脑子也会跟着松半格。", "你不是在逃避问题，你是在先把噪音降到能处理问题的范围。"],
      };
    default:
      return {
        title: "先把自己重新上线",
        copy: "不需要丧感叙事，先用一个动作把今天接上。",
        steps: ["喝一口水。", "站到更亮一点的地方，或者把窗帘拉开。", "做到这里就停，今天先往前一格。"],
        lighter: {
          title: "先只做一个开机动作",
          copy: "先让自己上线一点，不求一口气进入状态。",
          steps: ["喝一口水，或者站起来一下。", "做到这里就停。"],
        },
        complete: ["我稍微上线了一点", "今天开始接上了", "至少不是刚才那种悬着的状态"],
        after: ["进入状态不一定靠狠劲，有时候靠的是一个足够小、但真的做了的动作。", "你刚刚不是在自我鼓励，你是在让生活重新接到自己身上。"],
      };
  }
}

function buildSurfaceResetContent(profileId, inboxItem) {
  const mention = getInboxText(inboxItem, ["space"]);
  switch (profileId) {
    case "low_energy":
      return {
        title: "先把眼前一小块救回来",
        copy: mention ? `不用整理全部。先把和“${mention}”最接近的那一小块安静下来。` : "不用整理全部。只让眼前有一小块地方安静下来。",
        steps: ["先拿走桌上最碍眼的垃圾、杯子或纸。", "只清出一小块，不顺手扩展。", "看一眼那块空出来的位置。"],
        lighter: {
          title: "只拿走最碍眼的一样东西",
          copy: "这次不做一小块，只做一个最轻的动作。",
          steps: ["选最碍眼的一样东西，把它挪开。", "到这里就停。"],
        },
        complete: ["眼前终于没那么吵了", "我没那么想躲开这里了", "至少有一小块地方安静下来了"],
        after: ["你没有把一切整理好，但你已经把眼前救回来一点。", "有时候不是靠做很多，而是先让眼前出现一块能喘气的地方。"],
      };
    case "procrastination":
      return {
        title: "先清出一个开工点",
        copy: mention ? `不用整片收拾。先围绕“${mention}”清出一个能开始的位置。` : "不用整片收拾。先清出一个能让你开始的点。",
        steps: ["拿走桌上最碍眼的 3 样东西。", "把你等会儿最可能用到的一样东西放到最前面。", "做到这里就停，直接保留这个起点。"],
        lighter: {
          title: "先只清一只手能碰到的范围",
          copy: "今天先做一个很小但能立刻看见的开头。",
          steps: ["把手边最近的 2 样杂物挪开。", "这一下就算开始。"],
        },
        complete: ["我有地方可以开始了", "开头被清出来了", "原来先动空间比先动意志容易"],
        after: ["拖延经常不是因为不会做，而是没有起点。你刚刚把起点做出来了。", "空间一出现入口，动作就不再只停在脑子里。"],
      };
    case "irritated":
      return {
        title: "先切掉眼前最吵的一块",
        copy: mention ? `先别全收。先把“${mention}”附近那块最顶人的区域切干净一点。` : "先别全收。先把最顶人的那一小块切干净一点。",
        steps: ["选一个最打断你的角落。", "挪走最碍眼的 3 样东西。", "到这里就停，让噪音先降一格。"],
        lighter: {
          title: "先少一个噪点",
          copy: "不用整理，先让最吵的那样东西离开视线。",
          steps: ["把最顶你的那样东西挪开。", "做到这里就停。"],
        },
        complete: ["眼前没刚才那么顶了", "噪音降了一格", "这块地方不再一直撞我"],
        after: ["你不是在做家务考核，你是在把噪音往下切。", "当最吵的一块先安静下来，人就比较有余地呼吸。"],
      };
    default:
      return {
        title: "先把一小块收顺",
        copy: mention ? `不用收完整个区域。先围绕“${mention}”把眼前最关键的一小块扶正。` : "不用收完整个区域。先把眼前最关键的一小块扶正。",
        steps: ["拿走最碍眼的几样零碎。", "留出一块你看了会比较顺的空位。", "做到这里就停，不往大整理扩展。"],
        lighter: {
          title: "先只扶正一个点",
          copy: "今天先让一小点顺起来，就已经够用了。",
          steps: ["选一个最显眼的东西，把它放回位。", "做到这里就停。"],
        },
        complete: ["这一块顺起来了", "我看这里没那么别扭了", "生活感回来一点了"],
        after: ["秩序感不一定靠一口气整理完，有时候靠先扶正一小块。", "当眼前能顺起来一点，人也更容易回到自己的节奏。"],
      };
  }
}

function buildFiveThingsContent(profileId, inboxItem) {
  const mention = getInboxText(inboxItem, ["space"]);
  switch (profileId) {
    case "low_energy":
      return {
        title: "只让身边少 5 样东西",
        copy: mention ? `不用处理完整件事。先让“${mention}”附近少 5 样最碍眼的东西。` : "不是收拾房间，是让你待着的地方先没那么顶着你。",
        steps: ["把身边最碍眼的 5 样东西放回去。", "到 5 件就停，不补做。", "看一眼你现在待着的这一小块。"],
        lighter: {
          title: "只挪开 2 样最碍眼的",
          copy: "今天先少两样，也算往前挪了一点。",
          steps: ["选 2 样最碍眼的挪开。", "到这里就停。"],
        },
        complete: ["脚边终于没那么乱了", "我能在这里多待一会儿了", "这个地方开始重新像我的了"],
        after: ["你不是在大扫除，你是在替自己把待着的地方扶正一点。", "空间一安静一点，人心也会跟着安静一点。"],
      };
    case "procrastination":
      return {
        title: "先做一个能看见进度的小回合",
        copy: mention ? `先别处理全部。围绕“${mention}”，做一个能立刻看见完成感的小回合。` : "先别处理全部，先做一个能立刻看见进度的小回合。",
        steps: ["给自己定 5 样东西。", "每放回去 1 样就算 1 次进度，不补做。", "做到 5 样立刻停。"],
        lighter: {
          title: "先完成 2 样",
          copy: "今天先用最短的回合证明你动起来了。",
          steps: ["放回去 2 样最碍眼的东西。", "做到这里就停。"],
        },
        complete: ["我有一个完成回合了", "进度不是零了", "我已经从想变成做了"],
        after: ["拖延最怕任务没有边界。你刚刚给它定了一个非常清楚的边界。", "当完成感出现，开始就不再只靠意志硬拉。"],
      };
    case "irritated":
      return {
        title: "先少 5 个噪点",
        copy: mention ? `围绕“${mention}”这块区域，先切掉 5 个最顶你的噪点。` : "不是整理环境，是先让你周围少 5 个最顶人的噪点。",
        steps: ["找出最打断你的 5 样东西。", "一件一件挪开，到 5 件立刻停。", "看一眼噪音少掉后的这块地方。"],
        lighter: {
          title: "先少 2 个噪点",
          copy: "今天先降一点噪，不求一口气安静下来。",
          steps: ["挪开 2 个最顶人的东西。", "做到这里就停。"],
        },
        complete: ["这里没刚才那么吵了", "顶着我的东西少了", "我终于能多呼一口气"],
        after: ["你不是在追求整洁感，你是在切掉现实里的干扰。", "噪音一少，人就更容易回到自己。"],
      };
    default:
      return {
        title: "先把待着的一小圈扶正",
        copy: mention ? `不用整理整间。围绕“${mention}”这一带先少 5 样东西。` : "不用整理整间，只把你正待着的一小圈先扶正。",
        steps: ["挪走 5 样最打断你的东西。", "到 5 件就停，不追加新任务。", "看一眼现在这块区域是不是顺一点了。"],
        lighter: {
          title: "先只挪开 2 样",
          copy: "今天先让这块区域变顺一点点，就够了。",
          steps: ["选 2 样最碍眼的挪开。", "做到这里就停。"],
        },
        complete: ["这块区域顺起来了", "我没刚才那么想躲开这里了", "生活秩序回来一点了"],
        after: ["秩序感不是一下全部回来，而是先从你正待着的这块地方回来。", "你刚刚做的是扶正，不是硬撑。"],
      };
  }
}

function buildSinkResetContent(profileId, inboxItem) {
  const mention = getInboxText(inboxItem, ["sink"]);
  switch (profileId) {
    case "low_energy":
      return {
        title: "只让水槽轻一点",
        copy: mention ? `不用把“${mention}”整件事解决。先让水槽少一点重量。` : "不用把厨房整件事解决。先让水槽少一点重量。",
        steps: ["只洗或冲 3 件最容易处理的。", "做到 3 件就停，不顺手扩展。", "看一眼水槽现在是不是轻一点了。"],
        lighter: {
          title: "只洗 1 个杯子或碗",
          copy: "这次先轻到只处理一个最容易的。",
          steps: ["洗掉 1 个最容易处理的杯子或碗。", "做到这里就停。"],
        },
        complete: ["厨房没刚才那么压我了", "现实阻力少了一点", "至少这一块开始松了"],
        after: ["你不是在做完整家务，你是在把一个持续顶着你的阻力减轻一点。", "有些卡点一松，心里那口气也会先松一点。"],
      };
    case "procrastination":
      return {
        title: "先把厨房这一步打开",
        copy: mention ? `先别想把“${mention}”全部搞定。先做一个能立刻算开始的厨房动作。` : "先别想把厨房全部搞定。先做一个能立刻算开始的动作。",
        steps: ["只处理 3 件最容易洗的东西。", "做到 3 件立刻停，不延长任务。", "保留这个“已经开始”的证据。"],
        lighter: {
          title: "先洗 1 件",
          copy: "今天先只做一个开头动作。",
          steps: ["洗 1 件最容易洗的东西。", "做到这里就停。"],
        },
        complete: ["我已经开头了", "厨房不是完全没碰", "原来开始可以这么小"],
        after: ["开始一出现，拖延就不再是全黑。", "你不是在做完厨房，你是在让“开始”变得真实。"],
      };
    case "irritated":
      return {
        title: "先切掉厨房这个噪点",
        copy: mention ? `先别整理厨房全局。先把“${mention}”这块最顶人的噪点降下来。` : "先别整理厨房全局。先把最顶人的那块噪点降下来。",
        steps: ["只洗 3 件最碍眼的东西。", "做到 3 件立刻停。", "看一眼这块区域是不是没刚才那么吵。"],
        lighter: {
          title: "先少一个噪点",
          copy: "先让厨房少一个最顶人的东西就够了。",
          steps: ["洗掉 1 个最碍眼的杯子或碗。", "做到这里就停。"],
        },
        complete: ["厨房没刚才那么刺眼了", "这块噪音降了一点", "我不再一直被它顶着"],
        after: ["你不是在家务打卡，你是在切掉一个现实噪点。", "噪点先降一点，人才有空间决定要不要继续。"],
      };
    default:
      return {
        title: "先把厨房卡点清一半",
        copy: mention ? `不用处理完整个“${mention}”。先把厨房里这块最卡的部分清掉一半。` : "不用处理整个厨房。先把最卡的那一块清掉一半。",
        steps: ["只洗或冲 3 件最容易处理的。", "做到 3 件就停。", "看一眼这块空间是不是顺一点了。"],
        lighter: {
          title: "先洗 1 件最容易的",
          copy: "今天先让厨房顺一点点，不求一口气解决。",
          steps: ["处理 1 件最容易的杯子或碗。", "做到这里就停。"],
        },
        complete: ["厨房顺一点了", "这块卡点被我碰开了", "生活感回来一点了"],
        after: ["现实里的卡点常常不需要一次做完，先让它顺一点就已经很值。", "你刚刚不是解决全部，而是把堵点打开了一条缝。"],
      };
  }
}

function buildMessageOpenContent(profileId, inboxItem) {
  const mention = getInboxText(inboxItem, ["message"]);
  switch (profileId) {
    case "low_energy":
      return {
        title: "只碰最轻的一条",
        copy: mention ? `不用把它解决。先只碰一下“${mention}”。` : "不是清空，不是补完，只是少挂着一件。",
        steps: [
          mention ? `先只点开“${mention}”，或者写下一句你准备怎么回。` : "选最短、最不费力的一条消息或提醒。",
          "做到这一步就已经可以，不顺手扩展。",
          "对自己说一句：今天已经少挂着一件。",
        ],
        lighter: {
          title: "只把那条消息点开",
          copy: "如果今天连回复都重，那就先只碰到它。",
          steps: [mention ? `把“${mention}”点开。` : "把那条消息点开。", "看到它就停。"],
        },
        complete: ["我少挂着一件了", "脑子里空出一点地方", "原来我不是完全做不到"],
        after: ["不是每一件事都要今天做完，但少挂着一件，人就会轻一点。", "你刚刚不是回了一条消息，而是把一根小刺拔出来了。"],
      };
    case "procrastination":
      return {
        title: "先把那件拖着的事碰开一个口",
        copy: mention ? `别想着一次处理完“${mention}”。先做一个最小的入口动作。` : "别想着一次处理完。先做一个最小的入口动作。",
        steps: [
          mention ? `先点开“${mention}”，或者写一句最简短的回复草稿。` : "选一条最容易开始的消息或提醒。",
          "做到这一步就停，不要求把整串任务做完。",
          "保留“我已经碰到了”的证据。",
        ],
        lighter: {
          title: "先只打开它",
          copy: "今天先破冰，不求回复质量。",
          steps: [mention ? `先打开“${mention}”。` : "先打开那条消息。", "做到这里就停。"],
        },
        complete: ["我已经碰到开头了", "那件事不再是全黑的", "原来第一步可以这么小"],
        after: ["拖延常常卡在开头。你刚刚做的，就是把开头从脑子里搬到现实里。", "一旦碰到入口，事情就不再只剩下心理重量。"],
      };
    case "irritated":
      return {
        title: "先把一直顶着你的那条放下半格",
        copy: mention ? `不用处理完“${mention}”。先让它不再一直顶着你。` : "不用清空待办，只先减掉一个一直顶着你的点。",
        steps: [
          mention ? `先只点开“${mention}”，或者把它单独记到便签上。` : "先选那条最顶你的消息。",
          "做到这一步就停，不继续扩散成更多任务。",
          "让它从持续噪音，变成一个已被看到的点。",
        ],
        lighter: {
          title: "先只把它从脑子里拿出来",
          copy: "先让这件事不再只是脑内噪音。",
          steps: [mention ? `把“${mention}”写到便签上。` : "把那条消息写到便签上。", "做到这里就停。"],
        },
        complete: ["它没刚才那么顶我了", "噪音降了一点", "至少它不再只在我脑子里吵"],
        after: ["有些烦点一旦被碰到，噪音就会先降半格。", "你不是在逃避它，而是在把它从持续噪音改成可处理对象。"],
      };
    default:
      return {
        title: "先清掉一个挂点",
        copy: mention ? `不用把“${mention}”解决掉。先做一个最小的现实入口。` : "不用清空全部，只先清掉一个挂点。",
        steps: [
          mention ? `先点开“${mention}”，或者写一句最简短的下一步。` : "先碰最轻的一条消息或提醒。",
          "做到这一步就停，不往整串任务扩展。",
          "确认一下：这件事现在已经不再只是挂着。",
        ],
        lighter: {
          title: "先只碰到它",
          copy: "今天先把挂点变成已接触，就够了。",
          steps: [mention ? `先打开“${mention}”。` : "先打开那条消息。", "做到这里就停。"],
        },
        complete: ["我清掉一个挂点了", "脑子轻一点了", "这件事终于被我碰到了"],
        after: ["很多挂点不需要一次清空，先碰到一个就已经会让生活顺一点。", "你刚刚做的不是回消息而已，而是把一个现实阻力往下放了一格。"],
      };
  }
}

function buildEntryOpenContent(profileId, inboxItem) {
  const mention = getInboxText(inboxItem, ["admin", "misc"]);
  switch (profileId) {
    case "low_energy":
      return {
        title: "先把入口打开",
        copy: mention ? `这次不解决“${mention}”，只让它不再是一团黑。` : "这次不解决问题，只是让它不再是一团黑。",
        steps: [
          mention ? `把“${mention}”对应的东西先找出来，或者先打开文档。` : "把那张账单、那个文档，或者那样东西先找出来。",
          "只写一句下一步，或者只把它放到门口/桌面最前面。",
          "做到这里就够了。",
        ],
        lighter: {
          title: "只把它找出来",
          copy: "这次不写下一步，只让它从模糊变清楚。",
          steps: [mention ? `把“${mention}”先找出来。` : "把那样东西找出来。", "放到看得见的地方就停。"],
        },
        complete: ["那件事终于不是一团黑了", "明天会轻一点", "我至少碰到了入口"],
        after: ["最难的常常不是做，而是碰。你刚刚已经碰到了。", "入口一出现，事情就不会一直只有阴影。"],
      };
    case "procrastination":
      return {
        title: "先做开头，不做全套",
        copy: mention ? `别想着一口气搞定“${mention}”。先把开头动作做出来。` : "别想着一口气搞定。先把开头动作做出来。",
        steps: [
          mention ? `先打开“${mention}”相关的文件、页面或实物。` : "先把那件事对应的文件、网页或物件找出来。",
          "只写一句下一步，不追加整套计划。",
          "做到这里就停，开头已经成立。",
        ],
        lighter: {
          title: "先只把文件打开",
          copy: "今天先只做“开始”这个动作。",
          steps: [mention ? `先打开“${mention}”。` : "先把那份文件打开。", "做到这里就停。"],
        },
        complete: ["开头被我做出来了", "这件事不再完全悬着", "原来开始真的可以这么小"],
        after: ["拖延不一定是懒，很多时候是入口太模糊。你刚刚把入口做清楚了。", "只要开始是现实的，后面就不再只能靠想象。"],
      };
    case "irritated":
      return {
        title: "先让那团黑的东西变清楚",
        copy: mention ? `别解决“${mention}”全套，只先把它从噪音改成可见对象。` : "别解决全套，只先把它从噪音改成可见对象。",
        steps: [
          mention ? `先把“${mention}”对应的东西找出来或打开。` : "先把那件一直顶着你的东西找出来。",
          "只写一句下一步，或者放到最显眼的位置。",
          "做到这里就停，让它不再一直模糊地撞你。",
        ],
        lighter: {
          title: "先只让它出现",
          copy: "先让它从模糊噪音变成一个看得见的点。",
          steps: [mention ? `把“${mention}”放到你看得见的地方。` : "把那样东西找出来。", "做到这里就停。"],
        },
        complete: ["它没刚才那么压我了", "至少我知道入口在哪了", "这团黑开始有边界了"],
        after: ["很多烦躁来自模糊。模糊一旦变清楚，压力就会先降一点。", "你刚刚不是解决问题，而是在切断持续压着你的那层雾。"],
      };
    default:
      return {
        title: "先把挂点变成下一步",
        copy: mention ? `不用一次解决“${mention}”。先把它变成一个明确的下一步。` : "不用一次解决。先把挂点变成一个明确的下一步。",
        steps: [
          mention ? `先把“${mention}”对应的东西打开或找出来。` : "先把那件一直挂着的事对应的东西找出来。",
          "只写一句下一步，或者把它移到最容易碰到的位置。",
          "做到这里就停，让这件事从“挂着”变成“已进入”。",
        ],
        lighter: {
          title: "先只把它摆到面前",
          copy: "今天先让入口出现，就已经够用。",
          steps: [mention ? `把“${mention}”放到你一眼能看见的地方。` : "把那样东西找出来。", "做到这里就停。"],
        },
        complete: ["我把入口做出来了", "这件事顺一点了", "至少它不再只是挂着"],
        after: ["很多生活挂点不需要今天清空，但很值得今天先把入口做出来。", "当下一步变清楚，人就容易重新拿回掌控感。"],
      };
  }
}

function buildTomorrowPackContent(profileId, inboxItem) {
  const mention = getInboxText(inboxItem, ["tomorrow", "admin"]);
  switch (profileId) {
    case "low_energy":
      return {
        title: "先替明天减一点压",
        copy: mention ? `今天不需要解决“${mention}”，先让明天的你轻一点。` : "今天不需要解决很多，先让明天的你轻一点。",
        steps: [
          mention ? `把“${mention}”放进包里、门口，或者写到便签上。` : "把明天最容易忘的一样东西提前放好。",
          "只准备一个入口，不追加整套计划。",
          "做到这里就停。",
        ],
        lighter: {
          title: "先只放好一样东西",
          copy: "今天先替明天省掉一次慌乱，就够了。",
          steps: [mention ? `先把“${mention}”放到门口或包里。` : "先放好一样明天要带的东西。", "做到这里就停。"],
        },
        complete: ["明天会轻一点", "我没把压力全留给明天", "至少有一件事已经先准备好了"],
        after: ["有时候照顾自己，不是今天做更多，而是替明天少留一点重量。", "你刚刚做的，是给明天的自己留出一点余地。"],
      };
    case "procrastination":
      return {
        title: "先给明天铺一个开头",
        copy: mention ? `别想着把“${mention}”全部规划好。先给明天铺一个最容易接上的入口。` : "别想着把明天全部规划好。先铺一个最容易接上的入口。",
        steps: [
          mention ? `把“${mention}”放好，或者写成一句明天的第一步。` : "先放好明天最容易忘的一样东西。",
          "只准备一个入口，不顺手展开更多事项。",
          "做到这里就停，明天已经更好开头了。",
        ],
        lighter: {
          title: "先只写一句明天的第一步",
          copy: "今天先让明天的开头存在，就够了。",
          steps: [mention ? `写下：“明天先处理 ${mention}”。` : "写下一句明天的第一步。", "做到这里就停。"],
        },
        complete: ["明天更容易开始了", "我给自己铺了一个入口", "拖延没法全靠明天临场解决"],
        after: ["很多拖延不是明天不会做，而是明天还要从零开始。你刚刚已经替明天开了个头。", "入口先铺好，明天就更像接续，而不是重启。"],
      };
    case "irritated":
      return {
        title: "先把明天那个噪点放下",
        copy: mention ? `先别把“${mention}”继续顶在脑子里。先把它落到现实里。` : "先别把明天的压力继续顶在脑子里。先把它落到现实里。",
        steps: [
          mention ? `把“${mention}”放到门口、包里，或者写到便签上。` : "把明天最容易忘的一样东西提前放好。",
          "只做一个准备动作，不继续扩张成整套待办。",
          "做到这里就停，让这个噪点先降一格。",
        ],
        lighter: {
          title: "先只处理一个明天的噪点",
          copy: "今天先把一个最顶人的明天压力落地。",
          steps: [mention ? `先把“${mention}”放好。` : "先放好一样明天要带的东西。", "做到这里就停。"],
        },
        complete: ["这个噪点没刚才那么顶了", "明天少一个容易慌的点", "我终于把它放下半格"],
        after: ["很多烦躁来自明天还悬着。你刚刚已经把其中一个悬点落地了。", "现实里一放好，脑子里的顶感就会先降下来。"],
      };
    default:
      return {
        title: "先让明天顺一点",
        copy: mention ? `不用把“${mention}”一次处理完。先替明天减少一个阻力。` : "不用把明天全部安排好。先减少一个最容易卡住你的阻力。",
        steps: [
          mention ? `把“${mention}”放到门口、包里，或者写成一句提醒。` : "先放好明天最容易忘的一样东西。",
          "只准备一个入口动作，不追加整套清单。",
          "做到这里就停，让明天更顺一点。",
        ],
        lighter: {
          title: "先只放好一样东西",
          copy: "今天先替明天省一次阻力，就已经够值。",
          steps: [mention ? `先把“${mention}”放好。` : "先放好一样明天要用的东西。", "做到这里就停。"],
        },
        complete: ["明天更顺一点了", "我替未来的自己减了一个阻力", "至少一个挂点已经提前处理了"],
        after: ["生活感经常来自这些小小的提前量。", "你刚刚做的不是规划焦虑，而是实打实地让明天更容易过。"],
      };
  }
}

document.getElementById("quickDecide").addEventListener("click", quickDecide);
document.getElementById("skipScene").addEventListener("click", () => {
  const fallback = getSceneOptions(state.pickedState)[0];
  if (!fallback) return;
  state.pickedScene = fallback.id;
  renderSceneCards();
  renderSupportCards();
  setStep("support", 2);
});
document.getElementById("lighterButton").addEventListener("click", () => {
  if (!state.activeTaskId) return;
  resolveRecommendation({ preferLighter: true, preferredTaskId: state.activeTaskId });
  state.pickedTimer = 2;
  renderRitual();
});
document.getElementById("startButton").addEventListener("click", startFocus);
document.getElementById("doneButton").addEventListener("click", () => finishFocus(false));
document.getElementById("pauseButton").addEventListener("click", () => finishFocus(true));
document.getElementById("saveMethod").addEventListener("click", saveCurrentMethod);
document.getElementById("restartButton").addEventListener("click", resetJourney);
document.getElementById("savedEntry").addEventListener("click", () => openSheet("saved"));
document.getElementById("closeSaved").addEventListener("click", closeSheets);
document.getElementById("inboxEntry").addEventListener("click", () => openSheet("inbox"));
document.getElementById("closeInbox").addEventListener("click", closeSheets);
document.getElementById("saveAnnoyance").addEventListener("click", saveAnnoyance);
document.getElementById("pickFromInbox").addEventListener("click", useInboxForDecision);
ids.sheetBackdrop.addEventListener("click", closeSheets);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSheets();
});

function bootFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const profile = params.get("profile");
  if (profile && profiles[profile]) {
    state.profileId = profile;
  }

  renderAllCopy();
  renderProfileCards();
  renderStateCards();
  renderSceneCards();
  renderSupportCards();
  renderRitual();
  renderSavedList();
  renderInboxList();

  if (params.get("quick") === "1") {
    quickDecide();
  }

  const sheet = params.get("sheet");
  if (sheet === "inbox") openSheet("inbox");
  if (sheet === "saved") openSheet("saved");
}

bootFromUrl();
