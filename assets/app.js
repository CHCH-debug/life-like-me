const options = {
  states: [
    "我很累",
    "我很乱",
    "我很烦",
    "我拖着一件事",
    "我只想先做一点点"
  ],
  environments: [
    "床 / 沙发周围很乱",
    "书桌 / 桌面很乱",
    "水槽 / 厨房很乱",
    "地面 / 角落有杂物",
    "手机里拖着几件小事",
    "身体状态不好，只能做最轻的动作"
  ],
  energy: [
    "只能做超小的",
    "还可以做一点",
    "可以认真做一件"
  ],
  time: [
    "2 分钟",
    "5 分钟",
    "10 分钟"
  ],
  blockers: [
    "我不知道从哪里开始",
    "我知道要做什么，但就是不想动",
    "我怕一做就停不下来",
    "我现在很烦，只想先让眼前好一点"
  ]
};

const taskLibrary = [
  {
    states: ["我很乱", "我只想先做一点点"],
    environments: ["书桌 / 桌面很乱"],
    energy: ["只能做超小的", "还可以做一点"],
    time: ["2 分钟", "5 分钟"],
    blockers: ["我不知道从哪里开始", "我现在很烦，只想先让眼前好一点"],
    title: "只把桌上的垃圾、杯子和纸巾拿走",
    description: "不用整理整个桌面。先把最显眼、最影响心情的三类东西移开，让眼前空一点。",
    why: "这一步不是为了做完整理，而是为了让你马上看到一处现实变化。"
  },
  {
    states: ["我很乱", "我只想先做一点点"],
    environments: ["床 / 沙发周围很乱"],
    energy: ["只能做超小的", "还可以做一点"],
    time: ["2 分钟", "5 分钟"],
    blockers: ["我怕一做就停不下来", "我现在很烦，只想先让眼前好一点"],
    title: "把床上或沙发上的 5 样东西挪开",
    description: "只数五件，不扩展，不大扫除。先把身体要占据的那块地方清出来。",
    why: "当身体能重新待在一个更安稳的位置，情绪也会跟着松一点。"
  },
  {
    states: ["我很累", "我只想先做一点点"],
    environments: ["身体状态不好，只能做最轻的动作"],
    energy: ["只能做超小的"],
    time: ["2 分钟"],
    blockers: ["我知道要做什么，但就是不想动", "我怕一做就停不下来"],
    title: "喝一口水，然后把窗帘拉开",
    description: "先让身体和光线重新回到场景里，不要求更多。",
    why: "这不是效率任务，只是先把你从停滞里轻轻接回来一点。"
  },
  {
    states: ["我拖着一件事", "我很烦"],
    environments: ["手机里拖着几件小事"],
    energy: ["还可以做一点", "可以认真做一件"],
    time: ["2 分钟", "5 分钟"],
    blockers: ["我知道要做什么，但就是不想动", "我不知道从哪里开始"],
    title: "只回最短的一条消息",
    description: "别清空消息，也别处理全部。只选最短、最轻的一条，回完就停。",
    why: "拖着的小事会持续占住心智。少一件，脑子就会空一点。"
  },
  {
    states: ["我很乱", "我很烦"],
    environments: ["水槽 / 厨房很乱"],
    energy: ["还可以做一点", "可以认真做一件"],
    time: ["5 分钟", "10 分钟"],
    blockers: ["我现在很烦，只想先让眼前好一点", "我不知道从哪里开始"],
    title: "只洗一个碗和一个杯子",
    description: "不要处理整池。就洗两个，让你看到一种已经发生的变化。",
    why: "当混乱开始被切开，情绪也更容易松一点。"
  },
  {
    states: ["我很乱", "我只想先做一点点"],
    environments: ["地面 / 角落有杂物"],
    energy: ["只能做超小的", "还可以做一点"],
    time: ["2 分钟", "5 分钟"],
    blockers: ["我不知道从哪里开始", "我现在很烦，只想先让眼前好一点"],
    title: "把地上的 5 件东西放回去",
    description: "就五件，不追加，不扩展。做完就允许自己停下。",
    why: "先让脚边变得更属于你，人的心会比想象中更快安静一点。"
  }
];

const feedbackLines = [
  {
    quote: "这个地方现在更属于你了。",
    body: "不用继续证明什么。一件也算，停在这里也可以。"
  },
  {
    quote: "你刚刚让现实往前动了一点。",
    body: "不是因为你突然变厉害了，而是因为你没有把这一刻完全交给混乱。"
  },
  {
    quote: "你不是没有能力，你只是刚刚没电。",
    body: "现在这点变化，就是你把自己接回来的一部分。"
  }
];

const selection = {
  state: null,
  environment: null,
  energy: null,
  time: null,
  blocker: null
};

const ids = {
  stateChips: document.getElementById("stateChips"),
  environmentChips: document.getElementById("environmentChips"),
  energyChips: document.getElementById("energyChips"),
  timeChips: document.getElementById("timeChips"),
  blockerChips: document.getElementById("blockerChips"),
  statePill: document.getElementById("statePill"),
  timePill: document.getElementById("timePill"),
  contextPill: document.getElementById("contextPill"),
  taskTitle: document.getElementById("taskTitle"),
  taskDescription: document.getElementById("taskDescription"),
  taskWhy: document.getElementById("taskWhy"),
  feedbackCard: document.getElementById("feedbackCard"),
  feedbackQuote: document.getElementById("feedbackQuote"),
  feedbackBody: document.getElementById("feedbackBody"),
  generateButton: document.getElementById("generateButton"),
  easierButton: document.getElementById("easierButton"),
  doneButton: document.getElementById("doneButton")
};

function renderChips(target, list, key, alt = false) {
  target.innerHTML = "";
  list.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip${alt ? " alt" : ""}${selection[key] === item ? " active" : ""}`;
    button.textContent = item;
    button.addEventListener("click", () => {
      selection[key] = item;
      renderAll();
    });
    target.appendChild(button);
  });
}

function renderAll() {
  renderChips(ids.stateChips, options.states, "state");
  renderChips(ids.environmentChips, options.environments, "environment", true);
  renderChips(ids.energyChips, options.energy, "energy");
  renderChips(ids.timeChips, options.time, "time", true);
  renderChips(ids.blockerChips, options.blockers, "blocker");
  ids.statePill.textContent = `状态：${selection.state ?? "未选择"}`;
  ids.timePill.textContent = `时长：${selection.time ?? "未选择"}`;
  ids.contextPill.textContent = `环境：${selection.environment ?? "未选择"}`;
}

function scoreTask(task) {
  let score = 0;
  if (selection.state && task.states.includes(selection.state)) score += 3;
  if (selection.environment && task.environments.includes(selection.environment)) score += 4;
  if (selection.energy && task.energy.includes(selection.energy)) score += 2;
  if (selection.time && task.time.includes(selection.time)) score += 2;
  if (selection.blocker && task.blockers.includes(selection.blocker)) score += 2;
  return score;
}

function pickTask(mode = "normal") {
  let ranked = taskLibrary
    .map((task) => ({ task, score: scoreTask(task) }))
    .sort((a, b) => b.score - a.score);

  if (mode === "easier") {
    ranked = ranked.filter(({ task }) =>
      task.time.includes("2 分钟") || task.energy.includes("只能做超小的"),
    );
  }

  return ranked[0]?.task ?? null;
}

function renderTask(task) {
  if (!task) {
    ids.taskTitle.textContent = "先选一下你的状态和环境，我才能不乱派任务。";
    ids.taskDescription.textContent = "至少先确定你这一刻在哪里、还有多少力气，再决定现在最合适的一件事。";
    ids.taskWhy.textContent = "这个产品不应该让用户像抽盲盒一样拿任务。";
    ids.feedbackCard.classList.remove("show");
    return;
  }

  ids.taskTitle.textContent = task.title;
  ids.taskDescription.textContent = task.description;
  ids.taskWhy.textContent = task.why;
  ids.feedbackCard.classList.remove("show");
}

function showTask(mode = "normal") {
  renderTask(pickTask(mode));
}

ids.generateButton.addEventListener("click", () => showTask("normal"));
ids.easierButton.addEventListener("click", () => showTask("easier"));
ids.doneButton.addEventListener("click", () => {
  const line = feedbackLines[Math.floor(Math.random() * feedbackLines.length)];
  ids.feedbackQuote.textContent = line.quote;
  ids.feedbackBody.textContent = line.body;
  ids.feedbackCard.classList.add("show");
});

renderAll();
