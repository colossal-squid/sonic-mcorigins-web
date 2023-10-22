import { controlsState } from "./controls";

export const state = {
  rougePos: 1, // 1 or 2
  amyPos: 2, // 1, 2, 3
  amyHandsUp: true, // bool
  ballPos: {
    x: 2, // 1,2,3
    y: 4, // 1-2-3-4
  },
  ballVelocity: 0, // if the ball goes up or down
  gameOver: false, // bool
  score: 0, // -3 ... 3
};

export function update() {
  // controls

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

  // move the ball
  let score = 0;
  let hit = false;
  state.amyHandsUp = constrain(controlsState.hands - 1, 0, 3);
  const { ballPos } = state;

  if (ballPos.y === 4) {
    // is with amy

    if (state.amyHandsUp && state.amyPos === ballPos.x) {
      hit = true;
    } else {
      score = -1;
      /// missed. score down
    }
  } else if (ballPos.y === 1) {
    if (state.rougePos === ballPos.x) {
      hit = true;
    } else {
      score = 1;
    }

    // is with Rouge
  }

  if (score !== 0 && state.ballVelocity !== 0) {
    state.score += score;
    state.ballPos = { x: 2, y: 4 };
    state.ballVelocity = 0;
  }
  if (hit) {
    state.ballVelocity = state.ballVelocity ? (state.ballVelocity *= -1) : -1;
  }
  state.ballPos.y = constrain(state.ballPos.y + state.ballVelocity, 1, 4);

  if (state.ballPos.y === 1 && state.ballPos.x === 2) {
    state.ballPos.x = Math.trunc(Math.random() * 2) === 1 ? 1 : 3;
  }
}
function constrain(num, min, max) {
  if (num < min) return min;
  if (num > max) return max;
  return num;
}
