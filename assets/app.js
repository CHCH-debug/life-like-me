const stateOptions = [
  { id: "tired", title: "我很累", tag: "低电量", desc: "今天像没充上电，做什么都很费劲。" },
  { id: "messy", title: "我很乱", tag: "空间失控", desc: "眼前和脑子都乱，看到哪里都想躲开。" },
  { id: "stuck", title: "我拖着一件事", tag: "拖着没碰", desc: "那件小事不大，但一直挂着，越挂越重。" },
  { id: "foggy", title: "我只是不想动", tag: "先别逼我", desc: "不是没有道理，是现在不想被逼着立刻振作。" },
];

const scenesByState = {
  tired: [
    { id: "body", title: "身体像没醒", desc: "适合先做一点让身体回来、又不费力的动作。" },
    { id: "seat", title: "床边 / 沙发边让我烦", desc: "我待着的地方已经开始不像一个能待的地方。" },
    { id: "air", title: "房间闷住了", desc: "像一直没真正开始今天，空气和人都没动起来。" },
  ],
  messy: [
    { id: "desk", title: "桌面最让我烦", desc: "每看一眼都觉得烦，但又不想开始收。" },
    { id: "floor", title: "地上和角落在压我", desc: "不是很多，但就是一直在眼里，躲不开。" },
    { id: "sink", title: "水槽 / 厨房挂在那里", desc: "知道它在，但就是不想碰整件事。" },
  ],
  stuck: [
    { id: "message", title: "有一条消息 / 一件小事拖着", desc: "适合先处理最轻的一条，不碰别的。" },
    { id: "entry", title: "那件事太大，不知道从哪开头", desc: "这次不用解决，只要找到入口。" },
    { id: "tomorrow", title: "我想先让明天轻一点", desc: "做一个能替明天减压的动作就行。" },
  ],
  foggy: [
    { id: "micro", title: "我只想先动一毫米", desc: "不给大任务，只给你一个极轻的动作。" },
    { id: "body", title: "先把身体接回来", desc: "不是要你积极，是先让身体别继续漂着。" },
    { id: "nearby", title: "就处理眼前这一小块", desc: "别讲道理，先让眼前顺一点。" },
  ],
};

const supportOptions = [
  { id: "decide", title: "替我做决定", desc: "我现在不想想太多，你直接递给我一件就行。" },
  { id: "gentle", title: "给我轻一点的", desc: "别给我完整方案，只给我不会把我压住的一步。" },
  { id: "steady", title: "给我稳一点的", desc: "我不想被鸡血推着走，我想被稳稳地接住。" },
  { id: "clear", title: "先帮我少挂着一件", desc: "我想减掉一个小负担，不求一下轻很多。" },
];

const ritualLibrary = [
  {
    id: "desk-spot",
    states: ["messy", "foggy"],
    scenes: ["desk", "nearby"],
    supports: ["decide", "gentle", "steady"],
    title: "先把桌上一小块空出来",
    copy: "不用整理桌面。只让眼前有一小块地方安静下来。",
    steps: [
      "先拿走桌上的垃圾、杯子和纸巾。",
      "停一下，不顺手扩展。",
      "看一眼那块空出来的位置。"
    ],
    lighter: {
      title: "只拿走最碍眼的一样东西",
      copy: "这次不做一小块，只做一个最轻的动作。",
      steps: ["选最碍眼的一样东西，把它挪开。", "到这里就停。"]
    },
    complete: [
      "眼前终于没那么吵了",
      "我没那么想躲开这里了",
      "至少有一小块地方安静下来了"
    ],
    after: [
      "你没有把一切整理好，但你已经把眼前救回来一点。",
      "有时候不是靠做很多，而是先让眼前出现一块能喘气的地方。"
    ]
  },
  {
    id: "water-light",
    states: ["tired", "foggy"],
    scenes: ["body", "air", "micro"],
    supports: ["gentle", "steady", "decide"],
    title: "先让身体回来一点",
    copy: "不是要求你振作，只是先把身体从停住的地方轻轻接回来。",
    steps: [
      "喝一口水。",
      "如果房间闷着，就拉开窗帘；如果已经很亮，就站到更亮一点的地方停 10 秒。",
      "做完就停，不往下加任务。"
    ],
    lighter: {
      title: "先只喝一口水",
      copy: "这次轻到只做一个身体动作就够了。",
      steps: ["喝一口水。", "做完就停。"]
    },
    complete: [
      "身体终于回来一点",
      "房间没刚才那么闷了",
      "我没有继续完全停在那里"
    ],
    after: [
      "你刚刚做的不是小事，是把自己从静止里接回来一点。",
      "今天不一定要变好，但至少你没有把自己完全丢下。"
    ]
  },
  {
    id: "one-message",
    states: ["stuck"],
    scenes: ["message"],
    supports: ["clear", "decide", "gentle"],
    title: "只处理最轻的一条",
    copy: "不是清空，不是补完，只是少挂着一件。",
    steps: [
      "选最短、最不费力的一条消息或提醒。",
      "处理完就退出，不顺手扩展。",
      "对自己说一句：今天已经少挂着一件。"
    ],
    lighter: {
      title: "只把那条消息点开",
      copy: "如果今天连回复都重，那就先只碰到它。",
      steps: ["把那条消息点开。", "看到它就停。"]
    },
    complete: [
      "我少挂着一件了",
      "脑子里空出一点地方",
      "原来我不是完全做不到"
    ],
    after: [
      "不是每一件事都要今天做完，但少挂着一件，人就会轻一点。",
      "你刚刚不是回了一条消息，而是把一根小刺拔出来了。"
    ]
  },
  {
    id: "entry-only",
    states: ["stuck"],
    scenes: ["entry", "tomorrow"],
    supports: ["clear", "steady", "decide"],
    title: "先把入口打开",
    copy: "这次不解决问题，只是让它不再是一团黑的。",
    steps: [
      "把那张账单、那个文档，或者明天要带的东西先找出来。",
      "只写一句下一步，或者只把它放到门口。",
      "做到这里就够了。"
    ],
    lighter: {
      title: "只把它找出来",
      copy: "这次不写下一步，只让它从模糊变清楚。",
      steps: ["把那样东西找出来。", "放到看得见的地方就停。"]
    },
    complete: [
      "那件事终于不是一团黑了",
      "明天会轻一点",
      "我至少碰到了入口"
    ],
    after: [
      "最难的常常不是做，而是碰。你刚刚已经碰到了。",
      "入口一出现，事情就不会一直只有阴影。"
    ]
  },
  {
    id: "five-things",
    states: ["messy", "tired"],
    scenes: ["floor", "seat"],
    supports: ["decide", "gentle", "steady"],
    title: "只让身边少 5 样东西",
    copy: "不是收拾房间，是让你待着的地方先没那么顶着你。",
    steps: [
      "把身边最碍眼的 5 样东西放回去。",
      "到 5 件就停，不补做。",
      "看一眼你现在待着的这一小块。"
    ],
    lighter: {
      title: "只挪开 2 样最碍眼的",
      copy: "今天先少两样，也算往前挪了一点。",
      steps: ["选 2 样最碍眼的挪开。", "到这里就停。"]
    },
    complete: [
      "脚边终于没那么乱了",
      "我能在这里多待一会儿了",
      "这个地方开始重新像我的了"
    ],
    after: [
      "你不是在大扫除，你是在替自己把待着的地方扶正一点。",
      "空间一安静一点，人心也会跟着安静一点。"
    ]
  }
];

const state = {
  step: 0,
  pickedState: null,
  pickedScene: null,
  pickedSupport: null,
  pickedTimer: 2,
  activeRitual: null,
  lighterMode: false,
  focusRunning: false,
  focusRemaining: 120,
  timerId: null,
  completion: null,
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
  stateCards: document.getElementById("stateCards"),
  sceneCards: document.getElementById("sceneCards"),
  supportCards: document.getElementById("supportCards"),
  statePill: document.getElementById("statePill"),
  scenePill: document.getElementById("scenePill"),
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
  returnChip: document.getElementById("savedEntry"),
  sceneHeading: document.getElementById("sceneHeading"),
};

function setStep(stepName, progressIndex) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[stepName].classList.add("is-active");
  progressDots.forEach((dot, index) => dot.classList.toggle("is-active", index <= progressIndex));
  state.step = progressIndex;
}

function renderStateCards() {
  ids.stateCards.innerHTML = stateOptions.map((item) => `
    <button class="select-card${state.pickedState === item.id ? " is-selected" : ""}" type="button" data-state="${item.id}">
      <div class="card-head">
        <span class="card-title">${item.title}</span>
        <span class="tag">${item.tag}</span>
      </div>
      <p class="card-desc">${item.desc}</p>
    </button>
  `).join("");

  ids.stateCards.querySelectorAll("[data-state]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pickedState = button.dataset.state;
      state.pickedScene = null;
      state.pickedSupport = null;
      state.activeRitual = null;
      state.lighterMode = false;
      renderStateCards();
      renderSceneCards();
      setStep("scene", 1);
    });
  });
}

function renderSceneCards() {
  const scenes = scenesByState[state.pickedState] ?? [];
  ids.sceneHeading.textContent = stateOptions.find((item) => item.id === state.pickedState)?.title ?? "我先知道你是卡在哪。";
  ids.sceneCards.innerHTML = scenes.map((item) => `
    <button class="select-card${state.pickedScene === item.id ? " is-selected" : ""}" type="button" data-scene="${item.id}">
      <div class="card-head">
        <span class="card-title">${item.title}</span>
      </div>
      <p class="card-desc">${item.desc}</p>
    </button>
  `).join("");

  ids.sceneCards.querySelectorAll("[data-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pickedScene = button.dataset.scene;
      state.pickedSupport = null;
      state.activeRitual = null;
      state.lighterMode = false;
      renderSceneCards();
      renderSupportCards();
      setStep("support", 2);
    });
  });
}

function renderSupportCards() {
  ids.supportCards.innerHTML = supportOptions.map((item) => `
    <button class="support-card${state.pickedSupport === item.id ? " is-selected" : ""}" type="button" data-support="${item.id}">
      <div class="card-head">
        <span class="card-title">${item.title}</span>
      </div>
      <p class="support-desc">${item.desc}</p>
    </button>
  `).join("");

  ids.supportCards.querySelectorAll("[data-support]").forEach((button) => {
    button.addEventListener("click", () => {
      state.pickedSupport = button.dataset.support;
      state.activeRitual = pickRitual();
      state.lighterMode = false;
      renderRitual();
      setStep("ritual", 3);
    });
  });
}

function pickRitual() {
  return ritualLibrary.find((item) =>
    item.states.includes(state.pickedState) &&
    item.scenes.includes(state.pickedScene) &&
    item.supports.includes(state.pickedSupport)
  ) || ritualLibrary[0];
}

function currentRitualView() {
  if (!state.activeRitual) return null;
  return state.lighterMode && state.activeRitual.lighter
    ? { title: state.activeRitual.lighter.title, copy: state.activeRitual.lighter.copy, steps: state.activeRitual.lighter.steps }
    : { title: state.activeRitual.title, copy: state.activeRitual.copy, steps: state.activeRitual.steps };
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
  ids.statePill.textContent = `状态：${findTitle(stateOptions, state.pickedState) ?? "未选择"}`;
  ids.scenePill.textContent = `场景：${findTitle(scenesByState[state.pickedState] ?? [], state.pickedScene) ?? "未选择"}`;
  ids.timerValue.textContent = formatTime(state.pickedTimer * 60);
  ids.timerNote.textContent = state.lighterMode ? "这次已经切成更轻的一步了。" : "这次只做一个小回合，不扩展。";
  renderTimerChips();

  if (!view) {
    ids.ritualTitle.textContent = "先选前面的内容，我再把这一件事递给你。";
    ids.ritualCopy.textContent = "我不会让你一下子跳出当前状态，也不会乱给一个不贴合的动作。";
    ids.ritualSteps.innerHTML = "<li>先选一个状态</li><li>再选一下眼前最卡的地方</li><li>再告诉我这次你更想被怎么帮</li>";
    return;
  }

  ids.ritualTitle.textContent = view.title;
  ids.ritualCopy.textContent = view.copy;
  ids.ritualSteps.innerHTML = view.steps.map((step) => `<li>${step}</li>`).join("");
}

function startFocus() {
  const view = currentRitualView();
  if (!view) return;
  state.focusRemaining = state.pickedTimer * 60;
  ids.focusTitle.textContent = view.title;
  ids.focusCopy.textContent = state.lighterMode ? "这次已经给你换成更轻的一步了。做到这里就停，也完全可以。" : "先不要想后面。做完这一件就可以停。";
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
  renderCompletion(stoppedEarly);
  setStep("complete", 3);
}

function renderCompletion(stoppedEarly) {
  const choices = state.activeRitual?.complete ?? ["眼前轻一点了", "我没刚才那么卡了", "我至少动了一下"];
  ids.completionList.innerHTML = choices.map((item) => `
    <button class="completion-card${state.completion === item ? " is-selected" : ""}" type="button" data-completion="${escapeHtml(item)}">
      <div class="card-title">${item}</div>
    </button>
  `).join("");
  ids.afterglow.classList.remove("is-visible");
  ids.afterglow.textContent = stoppedEarly
    ? "你没有把这次做完整，也没关系。能停在一个你还能接受的位置，本身就是一种照顾。"
    : "先选一个最接近你现在感受的结果。";

  ids.completionList.querySelectorAll("[data-completion]").forEach((button) => {
    button.addEventListener("click", () => {
      state.completion = button.dataset.completion;
      const lines = state.activeRitual?.after ?? [];
      const picked = lines[Math.floor(Math.random() * lines.length)] ?? "今天先做到这里，也算把自己接回来了。";
      ids.afterglow.textContent = `${picked} 你刚刚选的是：“${state.completion}”。`;
      ids.afterglow.classList.add("is-visible");
      renderCompletion(false);
    });
  });
}

function renderSavedList() {
  const saved = getSaved();
  if (saved.length === 0) {
    ids.savedList.innerHTML = `
      <div class="saved-card empty">
        <div class="saved-title">这里还没有留东西</div>
        <p class="card-desc">当某一次方法真的帮到了你，就把它留在这里。下次没力气时，不用再从头开始。</p>
      </div>
    `;
    return;
  }

  ids.savedList.innerHTML = saved.map((item) => `
    <button class="saved-card" type="button" data-saved="${item.id}">
      <div class="saved-head">
        <span class="saved-title">${item.title}</span>
        <span class="tag">${item.stateTitle}</span>
      </div>
      <p class="card-desc">${item.copy}</p>
    </button>
  `).join("");

  ids.savedList.querySelectorAll("[data-saved]").forEach((button) => {
    button.addEventListener("click", () => {
      const saved = getSaved().find((item) => item.id === button.dataset.saved);
      if (!saved) return;
      state.pickedState = saved.state;
      state.pickedScene = saved.scene;
      state.pickedSupport = saved.support;
      state.activeRitual = ritualLibrary.find((item) => item.id === saved.id) || null;
      state.lighterMode = saved.lighterMode;
      renderStateCards();
      renderSceneCards();
      renderSupportCards();
      renderRitual();
      toggleSaved(false);
      setStep("ritual", 3);
    });
  });
}

function saveCurrentMethod() {
  if (!state.activeRitual) return;
  const saved = getSaved();
  const next = saved.filter((item) => item.id !== state.activeRitual.id);
  next.unshift({
    id: state.activeRitual.id,
    title: currentRitualView().title,
    copy: currentRitualView().copy,
    state: state.pickedState,
    scene: state.pickedScene,
    support: state.pickedSupport,
    stateTitle: findTitle(stateOptions, state.pickedState),
    lighterMode: state.lighterMode,
  });
  localStorage.setItem("llm-saved-methods", JSON.stringify(next.slice(0, 5)));
  ids.returnChip.textContent = `留给下次的办法 ${next.length} 个`;
  renderSavedList();
  ids.afterglow.textContent = "这次的方法已经给你留好了。下次没力气的时候，可以直接从这里开始。";
  ids.afterglow.classList.add("is-visible");
}

function toggleSaved(force) {
  const willOpen = typeof force === "boolean" ? force : !ids.savedSheet.classList.contains("is-open");
  ids.savedSheet.classList.toggle("is-open", willOpen);
  if (willOpen) renderSavedList();
}

function getSaved() {
  try {
    return JSON.parse(localStorage.getItem("llm-saved-methods")) ?? [];
  } catch {
    return [];
  }
}

function findTitle(list, id) {
  return list.find((item) => item.id === id)?.title;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

document.getElementById("quickDecide").addEventListener("click", () => {
  state.pickedState = "foggy";
  state.pickedScene = "nearby";
  state.pickedSupport = "decide";
  state.activeRitual = pickRitual();
  state.lighterMode = true;
  renderStateCards();
  renderSceneCards();
  renderSupportCards();
  renderRitual();
  setStep("ritual", 3);
});

document.getElementById("skipScene").addEventListener("click", () => {
  const fallback = scenesByState[state.pickedState]?.[0];
  if (!fallback) return;
  state.pickedScene = fallback.id;
  renderSceneCards();
  renderSupportCards();
  setStep("support", 2);
});

document.getElementById("lighterButton").addEventListener("click", () => {
  if (!state.activeRitual) return;
  state.lighterMode = true;
  state.pickedTimer = 2;
  renderRitual();
});

document.getElementById("startButton").addEventListener("click", startFocus);
document.getElementById("doneButton").addEventListener("click", () => finishFocus(false));
document.getElementById("pauseButton").addEventListener("click", () => finishFocus(true));
document.getElementById("saveMethod").addEventListener("click", saveCurrentMethod);
document.getElementById("restartButton").addEventListener("click", () => {
  state.completion = null;
  setStep("state", 0);
});
document.getElementById("savedEntry").addEventListener("click", () => toggleSaved(true));
document.getElementById("closeSaved").addEventListener("click", () => toggleSaved(false));

ids.returnChip.textContent = `留给下次的办法 ${getSaved().length} 个`;
renderStateCards();
renderSceneCards();
renderSupportCards();
renderRitual();
renderSavedList();
