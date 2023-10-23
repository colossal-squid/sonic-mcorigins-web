import { controlsState } from "./controls";
import { sounds } from "./sound";
import { randomFrom, constrain } from "./util";

export const state = {
  rougePos: 1, // 1 or 2
  amyPos: 2, // 1, 2, 3
  amyHandsUp: 0, // 3,2,1,0
  ballPos: {
    x: 2, // 1,2,3
    y: 4, // 1-2-3-4
  },
  ballVelocity: { y: 0, x: 0 }, // if the ball goes up or down
  gameOver: false, // bool
  score: 0, // -3 ... 3
};

export function update() {
  if (state.score <= -3 || state.score >= 3) {
    state.gameOver = true;
    state.score = 0;
    sounds.gameOver.play();
    return;
  }

  // move the ball
  let changeScoreBy = 0;
  let hit = false;

  // hands stay up for up to 3 frames
  state.amyHandsUp = constrain(controlsState.hands - 1, 0, 3);
  const { ballPos } = state;

  if (ballPos.y === 4) {
    // is with amy

    if (state.amyHandsUp && state.amyPos === ballPos.x) {
      hit = true;
      state.ballVelocity.x = randomFrom([-1, 0, 1]);
      state.amyHandsUp = 1;
    } else {
      changeScoreBy = -1;
      // sounds.miss.play();
      /// missed. score down
    }
  } else if (ballPos.y === 1) {
    // is with Rouge
    if (state.rougePos === ballPos.x) {
      hit = true;
      if (state.rougePos === 1) {
        state.ballVelocity.x = randomFrom([0, 1]);
      } else {
        state.ballVelocity.x = randomFrom([0, -1]);
      }
    } else {
      changeScoreBy = 1;
    }
  }

  if (hit) {
    sounds.hit.play();
    state.ballVelocity.y = state.ballVelocity.y
      ? (state.ballVelocity.y *= -1)
      : -1;
  }

  const ballIsRolling = state.ballVelocity.y !== 0;

  if (ballIsRolling) {
    // only move after the game started
    if (controlsState.left && state.amyPos >= 2) {
      state.amyPos--;
    }
    if (controlsState.right && state.amyPos <= 3) {
      state.amyPos++;
    }
    const ballCrossingTheNetInTheMiddle = ballPos.x === 2 && ballPos.y === 2;
    const ballIsComingFromRouge = state.ballVelocity.y === 1;

    if (ballIsComingFromRouge && ballCrossingTheNetInTheMiddle) {
      // in this case we have a 50% chance of changing the ball direction
      state.ballVelocity.x = randomFrom([0, state.ballVelocity.x]);
    }

    if (changeScoreBy !== 0) {
      state.score += changeScoreBy;
      state.ballPos = { x: 2, y: 4 };
      state.amyPos = 2;
      state.ballVelocity.x = 0;
      state.ballVelocity.y = 0;
      if (changeScoreBy > 0 ) {
         sounds.score.play();
      } else {
        sounds.miss.play();
      }
    }

    state.ballPos.y = constrain(state.ballPos.y + state.ballVelocity.y, 1, 4);
    state.ballPos.x = constrain(state.ballPos.x + state.ballVelocity.x, 1, 3);
  }

  if (state.ballPos.x === 2 && state.ballPos.y === 1) {
    state.ballPos.x += randomFrom([-1, 1]);
  }
}

