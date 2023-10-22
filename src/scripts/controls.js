export const controlsState = {
  left: false,
  right: false,
  hands: 0,
};

function _update(e, v) {
  if (e.key === "ArrowLeft" || e.key === "A") {
    controlsState.left = v;
    controlsState.right = !v;
  }
  if (e.key === " ") {
    controlsState.hands += 2;
    controlsState.hands += constrain(controlsState.hands, 0, 2);
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
  controlsState.hands = constrain(controlsState.hands - 1, 0, 2);
}

function constrain(num, min, max) {
  if (num < min) return min;
  if (num > max) return max;

  return num;
}
