// Event loop: draggable blocks → Call stack, Microtask queue, Task queue, Timer
// setTimeout: full label in Timer (registration), "fn" elsewhere (the callback) — like week 2.
// Sync and Promise blocks always keep their full label.

var codeBlocks = document.getElementById("code-blocks");
var callstackTasks = document.getElementById("callstack-tasks");
var microtaskTasks = document.getElementById("microtask-tasks");
var timerTasks = document.getElementById("timer-tasks");
var asyncTasks = document.getElementById("async-tasks");
var btnReset = document.getElementById("btn-reset");

// Same shape as week 2, plus two promise blocks for the microtask queue.
var INITIAL_BLOCKS = [
  { label: "sync 1", type: "sync" },
  { label: "sync 2", type: "sync" },
  { label: "setTimeout(fn, 2s)", type: "timeout-1" },
  { label: "sync 3", type: "sync" },
  { label: "setTimeout(fn, 0)", type: "timeout-0" },
  { label: "sync 4", type: "sync" },
  { label: "Promise .then(fn)", type: "promise-then" },
  { label: "setTimeout(fn, 4s)", type: "timeout-2" },
  { label: "sync 5", type: "sync" },
  { label: "Promise .catch(fn)", type: "promise-catch" },
];

function createBlock(label, type, isInCodeArea) {
  var el = document.createElement("div");
  el.draggable = true;
  el.dataset.type = type;
  el.dataset.originalLabel = label;
  el.textContent = label;
  el.className = isInCodeArea ? "code-block " + type : "task " + type;
  el.addEventListener("dragstart", onDragStart);
  return el;
}

function isTimeoutType(type) {
  return type === "timeout-0" || type === "timeout-1" || type === "timeout-2";
}

function onDragStart(ev) {
  ev.dataTransfer.effectAllowed = "move";
  ev.dataTransfer.setData("text/plain", "");
  ev.target.classList.add("dragging");
}

function onDragEnd(ev) {
  ev.target.classList.remove("dragging");
}

function makeDropZone(zoneEl, isCodeArea, zoneKind) {
  zoneEl.addEventListener("dragover", function (ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  });
  zoneEl.addEventListener("drop", function (ev) {
    ev.preventDefault();
    var dragEl = document.querySelector(".dragging");
    if (!dragEl || zoneEl.contains(dragEl)) return;
    zoneEl.appendChild(dragEl);
    if (isCodeArea) {
      dragEl.className = "code-block " + (dragEl.dataset.type || "sync");
      dragEl.textContent = dragEl.dataset.originalLabel || dragEl.textContent;
    } else {
      dragEl.className = "task " + (dragEl.dataset.type || "sync");
      if (zoneKind === "timer") {
        dragEl.textContent = dragEl.dataset.originalLabel || dragEl.textContent;
      } else if (isTimeoutType(dragEl.dataset.type || "")) {
        dragEl.textContent = "fn";
      }
    }
  });
}

function setupDropZones() {
  makeDropZone(codeBlocks, true, "code");
  makeDropZone(callstackTasks, false, "callstack");
  makeDropZone(microtaskTasks, false, "microtask");
  makeDropZone(asyncTasks, false, "async");
  makeDropZone(timerTasks, false, "timer");
}

function generateCodeBlocks() {
  codeBlocks.innerHTML = "";
  INITIAL_BLOCKS.forEach(function (item, i) {
    var block = createBlock(item.label, item.type, true);
    block.id = "block-" + i;
    block.addEventListener("dragend", onDragEnd);
    codeBlocks.appendChild(block);
  });
}

function reset() {
  callstackTasks.innerHTML = "";
  microtaskTasks.innerHTML = "";
  timerTasks.innerHTML = "";
  asyncTasks.innerHTML = "";
  generateCodeBlocks();
}

setupDropZones();
generateCodeBlocks();

btnReset.addEventListener("click", reset);
