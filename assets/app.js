const flow = {
  state: null,
  scene: null,
  support: null,
  timer: 2,
  pack: null,
  completionChoice: null,
};

const stateOptions = [
  { id: "tired", label: "我很累", badge: "低电量", desc: "不是不想活，是一点劲都没有，连出门都像很重的事情。" },
  { id: "messy", label: "我很乱", badge: "空间失控", desc: "房间、桌面、脑子像缠在一起，看到哪都觉得烦。" },
  { id: "irritated", label: "我很烦", badge: "情绪起毛边", desc: "不是大事，但有很多小东西在磨你，让你只想躲起来。" },
  { id: "stuck", label: "我拖着一件事", badge: "小事压心口", desc: "一直知道那件小事该做，但越拖越重，越重越不想碰。" },
];

const sceneOptions = {
  tired: [
    { id: "body-low", label: "身体像没电了", desc: "适合先做不需要出门、不需要站很久的动作。" },
    { id: "bed-chaos", label: "床边和沙发边很乱", desc: "身体待的地方已经不再像一个可以休息的位置。" },
    { id: "dark-room", label: "房间闷着、暗着", desc: "像一直没真正醒过来，空气也没动起来。" },
  ],
  messy: [
    { id: "desk", label: "桌面最乱", desc: "眼睛一落下去就烦，像永远收不完。" },
    { id: "floor", label: "地面和角落有杂物", desc: "走路、坐下、抬眼都能看到那些没处理的东西。" },
    { id: "sink", label: "水槽或厨房在压我", desc: "不是难，是那种一直知道在那里却不想碰。" },
  ],
  irritated: [
    { id: "phone", label: "手机里堆着几件小事", desc: "消息、账单、提醒，一直在轻轻扯你。" },
    { id: "surface", label: "眼前这个小范围让我烦", desc: "不需要解决全部，只要先把眼前处理好一点。" },
    { id: "body-low", label: "我烦到只想先安静一点", desc: "不适合大动作，适合先把身体拉回来。" },
  ],
  stuck: [
    { id: "phone", label: "有一条消息 / 一件线上小事拖着", desc: "适合先处理最轻的一条，不碰别的。" },
    { id: "entry-point", label: "那件事太大，不知道从哪开始", desc: "这次不是做完，只是先找到入口。" },
    { id: "doorway", label: "我其实想先把明天减轻一点", desc: "适合做一个给明天减压的小动作。" },
  ],
};

const supportOptions = [
  { id: "decide", label: "替我做决定", badge: "少想一点", desc: "我现在不想再选了，你直接给我最轻、最稳的一步。" },
  { id: "lighter", label: "先更轻一点", badge: "别压我", desc: "不要来太完整的方案，只给我一个低门槛动作。" },
  { id: "body-first", label: "先把身体接回来", badge: "身体先行", desc: "先让身体、呼吸、光线回到现实，再说别的。" },
  { id: "clear-burden", label: "先消掉一个负担", badge: "减一点压", desc: "我想少挂着一件小事，不需要更多。" },
];

const packs = [
  {
    id: "desk-reset",
    states: ["messy", "irritated"],
    scenes: ["desk", "surface"],
    support: ["decide", "lighter"],
    title: "桌角先归位",
    subtitle: "不是整理桌面，是先把一块现实重新拿回来。",
    steps: ["只拿走桌上的垃圾、杯子和纸巾。", "别整理别的，也别顺手扩展。", "停下来，抬头看一眼那块空出来的地方。"],
    completion: ["眼前终于没那么吵了", "我能在这里再待一会儿了", "至少有一块地方开始属于我了"],
    afterLines: ["你没有把生活整理好，但你已经把一小块生活拿回来了。", "人不一定要一下子变好，只要先有一处现实开始听你的。"],
  },
  {
    id: "five-things-floor",
    states: ["messy"],
    scenes: ["floor", "bed-chaos"],
    support: ["decide", "lighter"],
    title: "只放回 5 样东西",
    subtitle: "不是打扫，只是把脚边的生活重新扶正一点。",
    steps: ["数 5 样东西，放回它们该去的地方。", "到 5 件就停，不追加，不升级。", "站着或者坐着都行，目标只是让脚边更安静一点。"],
    completion: ["脚边终于没那么乱了", "我没那么想逃开这个空间了", "我做成了一件现实里的小事"],
    afterLines: ["你不是在大扫除，你是在替自己把地面重新铺平一点。", "先让脚边能站稳，人心会比想象中更快安静一点。"],
  },
  {
    id: "sink-slice",
    states: ["messy", "irritated"],
    scenes: ["sink"],
    support: ["decide", "clear-burden", "lighter"],
    title: "只洗一个碗和一个杯子",
    subtitle: "不要处理整池，只制造一个明确的现实变化。",
    steps: ["只选一个碗和一个杯子。", "洗完就停，不管剩下多少。", "看一下水槽里那个被切开的缺口。"],
    completion: ["那个地方终于少压我一点了", "我没把事情做完，但我切开了它", "我现在没刚才那么烦了"],
    afterLines: ["你不用一次解决全部，切开一个口子就已经很有用了。", "混乱最怕的不是完美，而是开始有边界。"],
  },
  {
    id: "light-and-water",
    states: ["tired", "irritated"],
    scenes: ["body-low", "dark-room"],
    support: ["body-first", "lighter", "decide"],
    title: "先把光和水接进来",
    subtitle: "这不是任务，是把身体从停滞里轻轻叫醒。",
    steps: ["喝一口水。", "把窗帘拉开，或者打开一盏暖一点的灯。", "停 10 秒，感受一下房间有没有动起来一点。"],
    completion: ["身体终于回来了点", "房间没那么闷了", "我至少不再完全停在那里"],
    afterLines: ["今天不是你没有能力，只是你的电量太低了。", "你刚刚做的不是小事，是把自己从静止里接回来。"],
  },
  {
    id: "one-message",
    states: ["stuck", "irritated"],
    scenes: ["phone"],
    support: ["clear-burden", "decide", "lighter"],
    title: "只回最短的一条消息",
    subtitle: "不是清空聊天，只是少挂着一个小钩子。",
    steps: ["只选最短、最不费力的一条。", "回完就退出，不继续滑，不顺手清别的。", "对自己说一句：我刚刚少挂着一件事。"],
    completion: ["我少挂着一件事了", "脑子里空出来一点点位置", "原来我不是完全做不到"],
    afterLines: ["不是每一件事都要今天做完，但少挂着一件，人就会轻一点。", "你刚刚不是回了一条消息，而是给自己腾出了一点心。"],
  },
  {
    id: "open-the-entry",
    states: ["stuck"],
    scenes: ["entry-point", "doorway"],
    support: ["clear-burden", "decide"],
    title: "只打开入口，不要求解决",
    subtitle: "这次的目标不是完成，而是让那件事终于有了一个入口。",
    steps: ["把那张账单、那个文档、那条待办先打开。", "只写一句下一步，或者只把要带的东西放到门口。", "停在这里，也算今天有了进度。"],
    completion: ["那件事终于不再是黑箱了", "明天的我会轻一点", "原来我可以先做入口，不用一次做完"],
    afterLines: ["最难的常常不是做，而是碰。你刚刚已经碰到了。", "入口一旦出现，事情就不再只有阴影。"],
  },
];

const ids = {
  stateCards: document.getElementById("stateCards"),
  sceneCards: document.getElementById("sceneCards"),
  supportCards: document.getElementById("supportCards"),
  timerChips: document.getElementById("timerChips"),
  ritualTitle: document.getElementById("ritualTitle"),
  ritualSubtitle: document.getElementById("ritualSubtitle"),
  ritualSteps: document.getElementById("ritualSteps"),
  statePill: document.getElementById("statePill"),
  scenePill: document.getElementById("scenePill"),
  timerValue: document.getElementById("timerValue"),
  livePrompt: document.getElementById("livePrompt"),
  completionPanel: document.getElementById("completionPanel"),
  completionOptions: document.getElementById("completionOptions"),
  completionResult: document.getElementById("completionResult"),
  savePackButton: document.getElementById("savePackButton"),
  savedPacks: document.getElementById("savedPacks"),
  returnChip: document.getElementById("returnChip"),
};

const panels = Array.from(document.querySelectorAll("[data-step]"));
const progressDots = Array.from(document.querySelectorAll("[data-step-dot]"));

function renderStateCards() {
  ids.stateCards.innerHTML = "";
  stateOptions.forEach((item) => {
    const selected = flow.state === item.id ? " is-selected" : "";
    ids.stateCards.insertAdjacentHTML("beforeend", `
      <button class="state-card${selected}" type="button" data-state="${item.id}">
        <div class="state-card-head">
          <span class="state-card-title">${item.label}</span>
          <span class="badge">${item.badge}</span>
        </div>
        <p class="state-card-desc">${item.desc}</p>
      </button>
    `);
  });
  ids.stateCards.querySelectorAll("[data-state]").forEach((button) => {
    button.addEventListener("click", () => {
      flow.state = button.dataset.state;
      flow.scene = null;
      flow.support = null;
      flow.pack = null;
      flow.completionChoice = null;
      renderStateCards();
      renderSceneCards();
      renderSupportCards();
      renderPack();
      setStep(1);
    });
  });
}

function renderSceneCards() {
  ids.sceneCards.innerHTML = "";
  (sceneOptions[flow.state] ?? []).forEach((item) => {
    const selected = flow.scene === item.id ? " is-selected" : "";
    ids.sceneCards.insertAdjacentHTML("beforeend", `
      <button class="scene-card${selected}" type="button" data-scene="${item.id}">
        <div class="scene-card-head"><span class="scene-card-title">${item.label}</span></div>
        <p class="scene-card-desc">${item.desc}</p>
      </button>
    `);
  });
  ids.sceneCards.querySelectorAll("[data-scene]").forEach((button) => {
    button.addEventListener("click", () => {
      flow.scene = button.dataset.scene;
      flow.support = null;
      flow.pack = null;
      flow.completionChoice = null;
      renderSceneCards();
      renderSupportCards();
      renderPack();
      setStep(2);
    });
  });
}

function renderSupportCards() {
  ids.supportCards.innerHTML = "";
  supportOptions.forEach((item) => {
    const selected = flow.support === item.id ? " is-selected" : "";
    ids.supportCards.insertAdjacentHTML("beforeend", `
      <button class="support-card${selected}" type="button" data-support="${item.id}">
        <div class="support-card-head">
          <span class="support-card-title">${item.label}</span>
          <span class="badge">${item.badge}</span>
        </div>
        <p class="support-card-desc">${item.desc}</p>
      </button>
    `);
  });
  ids.supportCards.querySelectorAll("[data-support]").forEach((button) => {
    button.addEventListener("click", () => {
      flow.support = button.dataset.support;
      flow.pack = pickPack();
      flow.completionChoice = null;
      renderSupportCards();
      renderPack();
      setStep(3);
    });
  });
}

function renderTimers() {
  ids.timerChips.innerHTML = "";
  [2, 5, 10].forEach((minutes) => {
    const selected = flow.timer === minutes ? " is-selected" : "";
    ids.timerChips.insertAdjacentHTML("beforeend", `<button class="timer-chip${selected}" type="button" data-timer="${minutes}">${minutes} 分钟</button>`);
  });
  ids.timerChips.querySelectorAll("[data-timer]").forEach((button) => {
    button.addEventListener("click", () => {
      flow.timer = Number(button.dataset.timer);
      renderTimers();
      ids.timerValue.textContent = formatTimer(flow.timer);
    });
  });
}

function pickPack(mode = "default") {
  let candidates = packs.filter((item) => {
    return (!flow.state || item.states.includes(flow.state))
      && (!flow.scene || item.scenes.includes(flow.scene))
      && (!flow.support || item.support.includes(flow.support));
  });
  if (mode === "lighter") {
    candidates = candidates.filter((item) => item.support.includes("lighter") || item.support.includes("decide"));
  }
  return candidates[0] ?? null;
}

function renderPack() {
  ids.statePill.textContent = `状态：${findLabel(stateOptions, flow.state) ?? "未选择"}`;
  ids.scenePill.textContent = `场景：${findLabel(sceneOptions[flow.state] ?? [], flow.scene) ?? "未选择"}`;
  ids.timerValue.textContent = formatTimer(flow.timer);

  if (!flow.pack) {
    ids.ritualTitle.textContent = "先选前面的状态，我再把这一刻的微仪式递给你。";
    ids.ritualSubtitle.textContent = "这次不是问卷终点，而是一次现实中的开始。";
    ids.ritualSteps.innerHTML = "<li>先选你现在最接近的状态</li><li>再告诉我现实里最卡的是哪里</li><li>再选这次你想怎么被帮</li>";
    ids.livePrompt.innerHTML = "<p>现在还不需要变好，只需要先让我更了解你这一刻在哪里。</p>";
    ids.completionPanel.style.display = "none";
    ids.completionResult.classList.remove("is-visible");
    ids.completionResult.textContent = "";
    return;
  }

  ids.ritualTitle.textContent = flow.pack.title;
  ids.ritualSubtitle.textContent = flow.pack.subtitle;
  ids.ritualSteps.innerHTML = flow.pack.steps.map((step) => `<li>${step}</li>`).join("");
  ids.livePrompt.innerHTML = "<p>先做这一件就够了。做完停下，也算把自己接回来了一点。</p>";
  renderCompletionChoices();
}

function renderCompletionChoices() {
  if (!flow.pack) {
    ids.completionPanel.style.display = "none";
    return;
  }
  ids.completionPanel.style.display = "block";
  ids.completionOptions.innerHTML = flow.pack.completion.map((item) => {
    const selected = flow.completionChoice === item ? " is-selected" : "";
    return `<button class="completion-button${selected}" type="button" data-completion="${escapeHtml(item)}">${item}</button>`;
  }).join("");
  ids.completionOptions.querySelectorAll("[data-completion]").forEach((button) => {
    button.addEventListener("click", () => {
      flow.completionChoice = button.dataset.completion;
      const line = flow.pack.afterLines[Math.floor(Math.random() * flow.pack.afterLines.length)];
      ids.completionResult.textContent = `${line} 你刚刚选择的是：“${flow.completionChoice}”。`;
      ids.completionResult.classList.add("is-visible");
      renderCompletionChoices();
      persistCompletion();
    });
  });
}

function setStep(step) {
  panels.forEach((panel, index) => panel.classList.toggle("is-active", index === step));
  progressDots.forEach((dot, index) => dot.classList.toggle("is-active", index <= step));
}

function persistCompletion() {
  if (!flow.pack || !flow.completionChoice) return;
  const history = getStored("llm-history", []);
  history.unshift({
    packId: flow.pack.id,
    title: flow.pack.title,
    completionChoice: flow.completionChoice,
    completedAt: new Date().toISOString(),
  });
  localStorage.setItem("llm-history", JSON.stringify(history.slice(0, 12)));
  renderReturnChip();
}

function saveCurrentPack() {
  if (!flow.pack) return;
  const saved = getStored("llm-saved-packs", []);
  if (!saved.some((item) => item.id === flow.pack.id)) {
    saved.unshift({
      id: flow.pack.id,
      title: flow.pack.title,
      subtitle: flow.pack.subtitle,
      state: findLabel(stateOptions, flow.state),
      scene: findLabel(sceneOptions[flow.state] ?? [], flow.scene),
    });
  }
  localStorage.setItem("llm-saved-packs", JSON.stringify(saved.slice(0, 4)));
  renderSavedPacks();
}

function renderSavedPacks() {
  const saved = getStored("llm-saved-packs", []);
  if (saved.length === 0) {
    ids.savedPacks.innerHTML = `
      <div class="saved-pack empty">
        <div class="saved-pack-head"><span class="saved-pack-title">还没有自己的救命包</span></div>
        <p class="saved-pack-copy">当某一次微仪式真的对你有用时，把它存下来。这个产品以后就不只是推荐，而会慢慢变成你自己的回生活工具箱。</p>
      </div>
    `;
    return;
  }
  ids.savedPacks.innerHTML = saved.map((item) => `
    <button class="saved-pack" type="button" data-pack-id="${item.id}">
      <div class="saved-pack-head">
        <span class="saved-pack-title">${item.title}</span>
        <span class="badge">${item.state ?? "我的救命包"}</span>
      </div>
      <p class="saved-pack-copy">${item.subtitle}</p>
    </button>
  `).join("");

  ids.savedPacks.querySelectorAll("[data-pack-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const savedPack = packs.find((item) => item.id === button.dataset.packId);
      if (!savedPack) return;
      flow.pack = savedPack;
      flow.state = savedPack.states[0];
      flow.scene = savedPack.scenes[0];
      flow.support = savedPack.support[0];
      flow.completionChoice = null;
      renderStateCards();
      renderSceneCards();
      renderSupportCards();
      renderPack();
      setStep(3);
    });
  });
}

function renderReturnChip() {
  const history = getStored("llm-history", []);
  ids.returnChip.textContent = history.length === 0 ? "最近救回自己 0 次" : `最近救回自己 ${history.length} 次`;
}

function getStored(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function findLabel(list, id) {
  return list.find((item) => item.id === id)?.label;
}

function formatTimer(minutes) {
  return `${String(minutes).padStart(2, "0")}:00`;
}

function escapeHtml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

document.getElementById("startButton").addEventListener("click", () => {
  if (!flow.pack) return;
  ids.livePrompt.innerHTML = "<p>现在不要想后面。先把注意力放回现实里，做完这一个动作就可以停。</p>";
});

document.getElementById("lighterButton").addEventListener("click", () => {
  if (!flow.state || !flow.scene) return;
  flow.support = "lighter";
  flow.pack = pickPack("lighter");
  flow.completionChoice = null;
  renderSupportCards();
  renderPack();
});

ids.savePackButton.addEventListener("click", saveCurrentPack);

renderStateCards();
renderSceneCards();
renderSupportCards();
renderTimers();
renderPack();
renderSavedPacks();
renderReturnChip();
setStep(0);
