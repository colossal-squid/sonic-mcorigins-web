const Sprite = (id) => {
  const sprite = document.getElementById(id);
  return {
    show: () => (sprite.style = `opacity: 1`),
    hide: () => (sprite.style = `opacity: 0.1`),
  };
};

let SPRITE_TABLE = {};

export function init() {
  SPRITE_TABLE = {
    BALLS: {
      "ball-11": Sprite("ball-11"),
      "ball-13": Sprite("ball-12"),

      "ball-21": Sprite("ball-21"),
      "ball-22": Sprite("ball-22"),
      "ball-23": Sprite("ball-23"),

      "ball-32": Sprite("ball-32"),
      "ball-31": Sprite("ball-31"),
      "ball-33": Sprite("ball-33"),

      "ball-41": Sprite("ball-41"),
      "ball-42": Sprite("ball-42"),
      "ball-43": Sprite("ball-43"),
    },
    AMY: {
      "tennis-1": Sprite("tennis-1"),
      "tennis-2": Sprite("tennis-2"),
      "tennis-3": Sprite("tennis-3"),
      "amy-1": Sprite("amy-1"),
      "amy-3": Sprite("amy-3"),
      "amy-2": Sprite("amy-2"),
    },
    ROUGE: {
      "rouge-2": Sprite("rouge-2"),
      "rouge-1": Sprite("rouge-1"),
    },
    HUD: {
      miss: Sprite("miss"),
      "score-a1": Sprite("score-a1"),
      "score-a2": Sprite("score-a2"),
      "score-a3": Sprite("score-a3"),
      "score-center": Sprite("score-center"),
      "score-r1": Sprite("score-r1"),
      "score-r2": Sprite("score-r2"),
      "score-r3": Sprite("score-r3"),
    },
  };
}

function updateHud(score) {
  const { HUD } = SPRITE_TABLE;
  // score can go from -3 to 3 where Amy 3 is -3, and Rouge 3 is 3
  if (score < -3 || score > 3) {
    throw new Error("Score can only be in [-3 ... 3]");
  }
  HUD["score-center"].show();
  if (score < 0) {
    for (let i = 1; i <= Math.abs(score); i++) {
      HUD[`score-a${i}`].show();
    }
  } else if (score > 0) {
    for (let i = 1; i <= Math.abs(score); i++) {
      HUD[`score-r${i}`].show();
    }
  }
}

function drawBall({ x, y }) {
  hideAllBalls();
  const ball = SPRITE_TABLE.BALLS[`ball-${y}${x}`];
  if (!ball) {
    throw new Error(`Ball: ${x},${y} does not exist`);
  }
  ball.show();
}

function hideAmy() {
  Object.keys(SPRITE_TABLE.AMY).forEach((s) => SPRITE_TABLE.AMY[s].hide());
}

function hideRouge() {
  Object.keys(SPRITE_TABLE.ROUGE).forEach((s) => SPRITE_TABLE.ROUGE[s].hide());
}

function hideAllBalls() {
  Object.keys(SPRITE_TABLE.BALLS).forEach((k) => SPRITE_TABLE.BALLS[k].hide());
}

function clearScreen() {
  hideAllBalls();
  hideAmy();
  hideRouge();
  Object.keys(SPRITE_TABLE.HUD).forEach((k) => SPRITE_TABLE.HUD[k].hide());
}

function drawAmy(pos, hands) {
  hideAmy();
  SPRITE_TABLE.AMY[`amy-${pos}`].show();
  hands && SPRITE_TABLE.AMY[`tennis-${pos}`].show();
}

function drawRouge(pos) {
  hideRouge();
  SPRITE_TABLE.ROUGE[`rouge-${pos}`].show();
}

export function render(state) {
  clearScreen();
  drawBall(state.ballPos);
  drawAmy(state.amyPos, state.amyHandsUp);
  drawRouge(state.rougePos);
  updateHud(state.score);
}
