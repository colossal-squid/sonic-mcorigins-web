import { GROUND_Y, PLAYER_WALK_SPEED } from "./constants";
import { type ControlsState, controlsState, initControls } from "./controls"

const BOUNDS_X = { MIN: 8, MAX: 92 }
type Rectangle = { x: number, y: number, w: number, h: number }
let boxCount = 0;
type Box = {
    x: number;
    y: number;
    id: number;
}

export type GameState = {
    controls: ControlsState;
    playerPosition: {
        x: number;
        y: number;
    }
    boxes: Box[];
}

const state: GameState = {
    controls: controlsState,
    playerPosition: { x: 50, y: GROUND_Y },
    boxes: []
}

function createBox(x: number, y: number): void {
    state.boxes.push({ id: boxCount++, x, y })
}

// https://www.jeffreythompson.org/collision-detection/rect-rect.php
function rectCollide(r1: Rectangle, r2: Rectangle) {
    if (r1.x + r1.w >= r2.x &&     // r1 right edge past r2 left
        r1.x <= r2.x + r2.w &&       // r1 left edge past r2 right
        r1.y + r1.h >= r2.y &&       // r1 top edge past r2 bottom
        r1.y <= r2.y + r2.h) {       // r1 bottom edge past r2 top
        return true;
    }
    return false;
}

initControls();

createBox(30, GROUND_Y)
createBox(80, GROUND_Y)

export function update(dt: number): GameState {
    let playerVelocity = 0;
    // walk
    if (state.controls.left) {
        playerVelocity = -PLAYER_WALK_SPEED;
    }
    if (state.controls.right) {
        playerVelocity = PLAYER_WALK_SPEED;
    }

    // bounds
    if (state.playerPosition.x < BOUNDS_X.MIN) {
        state.playerPosition.x = BOUNDS_X.MIN
    }
    if (state.playerPosition.x > BOUNDS_X.MAX) {
        state.playerPosition.x = BOUNDS_X.MAX
    }
    state.playerPosition.x += playerVelocity;

    // check for collisions
    state.boxes.forEach(box => {
        const r1 = {...box, w: 8, h: 8};
        const r2 = { x: state.playerPosition.x, y: state.playerPosition.y, w: 8, h: 16}
        if (rectCollide(r1, r2)) {
            if (r1.y === r2.y) { // if on the same height
                box.x += playerVelocity;
                state.playerPosition.x -= playerVelocity;
            }
        }
        // box bounds
        if (box.x < BOUNDS_X.MIN) {
            box.x = BOUNDS_X.MIN
        } else if (box.x > BOUNDS_X.MAX) {
            box.x = BOUNDS_X.MAX
        }
    })
    return { ...state };
}