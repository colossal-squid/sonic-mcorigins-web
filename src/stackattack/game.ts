import { GROUND_Y, PLAYER_WALK_SPEED, GRAVITY, JUMP_SPEED } from "./constants";
import { type ControlsState, controlsState, initControls } from "./controls"

const BOUNDS_X = { MIN: 8, MAX: 88 }
type Rectangle = { x: number, y: number, w: number, h: number, id?: number }
let boxCount = 0;
type Box = Rectangle & {
    id: number;
}

export type GameState = {
    controls: ControlsState;
    playerPosition: {
        x: number;
        y: number;
        w: number;
        h: number;
    }
    boxes: Box[];
    frames: number
}

const state: GameState = {
    controls: controlsState,
    playerPosition: { x: 50, y: GROUND_Y, w: 8, h: 16 },
    boxes: [],
    frames: 0
}

function createBox(x: number, y: number): void {
    state.boxes.push({ id: boxCount++, x, y, w: 8, h: 8 })
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

function isStanding(obj: Rectangle): boolean {
    // todo: implement standing on boxes
    if (obj.y === GROUND_Y) {
        return true;
    } else {
        const standingOnBox = state.boxes.filter(b => b !== obj && b.id !== obj['id'])
            .find(b =>
                rectCollide(b, obj) && obj.y < b.y
            )
        return !!standingOnBox;
    }
}

initControls();

createBox(30, GROUND_Y)
setInterval(() => {
    createBox(BOUNDS_X.MIN + (Math.random() * BOUNDS_X.MAX - 8), 7)
}, 3000)

export function update(dt: number): GameState {
    state.frames += dt;
    let playerVelocity = 0;
    // walk
    if (state.controls.left) {
        playerVelocity = -PLAYER_WALK_SPEED;
    }
    if (state.controls.right) {
        playerVelocity = PLAYER_WALK_SPEED;
    }

    // jump
    const isPlayerOnAGround = isStanding(state.playerPosition);
    if (state.controls.jump) {
        state.controls.jump = false;
        if (isPlayerOnAGround) {
            state.playerPosition.y -= JUMP_SPEED;
        }
    }
    // apply gravity to player
    if (!isPlayerOnAGround) {
        state.playerPosition.y += GRAVITY;
        if (state.playerPosition.y > GROUND_Y) {
            state.playerPosition.y = GROUND_Y;
        }
    }
    // apply gravity to boxes
    const boxesInTheAir = state.boxes.filter(b => !isStanding(b));
    boxesInTheAir.forEach(b => {
        b.y += GRAVITY;
        if (b.y > GROUND_Y) {
            b.y = GROUND_Y;
            if (b.x % 8 < 4) {
                b.x = Math.trunc(b.x / 8) * 8
            } else {
                b.x = Math.round(b.x / 8) * 8
            }
        }
    })

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
        const r1 = box;
        const r2 = state.playerPosition;
        if (rectCollide(r1, r2)) {
            if (Math.abs(r1.y - r2.y) < 8) { // if the height is approx equal
                // player defo aint moving now
                state.playerPosition.x -= playerVelocity;
                // find if the box collides with any other box on the same height
                const otherBoxes = state.boxes
                    .filter(b => b.id !== box.id)
                    .filter(b => b.y === r1.y)
                    .filter(b => rectCollide(r1, b))
                if (otherBoxes.length === 0) {
                    box.x += playerVelocity;
                }
            }
        }
        // box bounds
        if (box.x < BOUNDS_X.MIN) {
            box.x = BOUNDS_X.MIN
        } else if (box.x > BOUNDS_X.MAX) {
            box.x = BOUNDS_X.MAX
        }
    })

    // check if player managed to assemble a line of boxes
    // state.boxes.find()
    return { ...state };
}