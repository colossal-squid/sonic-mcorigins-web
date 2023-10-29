export type ControlsState = {
    left: boolean, right: boolean, up: boolean;
}
export const controlsState: ControlsState = {
  left: false,
  right: false,
  up: false
};

export function initControls() {
  addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "A") {
        controlsState.right = false;
        controlsState.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "D") {
        controlsState.left = false;
        controlsState.right = true;
      }
  });

  addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "A") {
        controlsState.left = false;
    }
    if (e.key === "ArrowRight" || e.key === "D") {
        controlsState.right = false;
    }
  })

}

