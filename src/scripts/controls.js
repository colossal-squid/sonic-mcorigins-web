export const controlsState = {
  left: false,
  right: false,
  hands: false,
};

function _update(e, v) {
  console.log(e.key);
  if (e.key === "ArrowLeft" || e.key === "A") {
    controlsState.left = v;
    controlsState.right = !v;
  }
  if (e.key === " ") {
    controlsState.hands = v;
  }
  if (e.key === "ArrowRight" || e.key === "D") {
    controlsState.right = v;
    controlsState.left = !v;
  }
}

export function initControls() {
  addEventListener("keydown", (e) => _update(e, true));
}
export function clearControls() {
  controlsState.left = false;
  controlsState.right = false;
  // controlsState.hands = false;
}
