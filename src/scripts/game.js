import { controlsState } from "./controls";

export const state = {
  rougePos: 1, // 1 or 2
  amyPos: 2, // 1, 2, 3
  amyHandsUp: true, // bool
  ballPos: {
    x: 2, // 1,2,3
    y: 4, // 1-2-3-4
  },
  ballVelocity: -1, // if the ball goes up or down
  gameOver: false, // bool
  score: 0, // -3 ... 3
};

export function update() {
  // controls
  console.log({ score: state.score });
  if (state.score <= -3 || state.score >= 3) {
    // state.gameOver = true;
    state.score = 0;
    return;
  }
  if (controlsState.left && state.amyPos >= 2) {
    state.amyPos--;
  }
  if (controlsState.right && state.amyPos <= 3) {
    state.amyPos++;
  }
  state.amyHandsUp = controlsState.hands;
  // move the ball
  let hit = false;
  const { ballPos } = state;

  if (ballPos.y === 4) {
    // is with amy
    if (state.amyHandsUp && amyPos === ballPos.x) {
      hit = true;
    } else {
      /// missed. score down
      state.score += 1;
      // reset ball
      state.ballPos = { x: 2, y: 4 };
      state.ballVelocity = -1;
    }
  } else if (ballPos.y === 1) {
    if (state.rougePos.x === ballPos.x) {
      hit = true;
    } else {
      /// missed. score down
      state.score -= 1;
      // reset ball
      state.ballPos = { x: 2, y: 4 };
    }
    // is with Rouge
  }

  if (hit) {
    state.ballVelocity *= -1;
    console.log("HIRT", state.ballVelocity);
  }
  state.ballPos.y += state.ballVelocity;

  if (state.ballPos.y === 1 && state.ballPos.x === 2) {
    state.ballPos.x = Math.trunc(Math.random() * 2) === 1 ? 1 : 3;
  }
}
