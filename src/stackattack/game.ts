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
    boxesToRemove: Box[];
    frames: number
}

const state: GameState = {
    controls: controlsState,
    /** 
     * player width should be 8px, like any other tile
     * but with movement speed being a decimal number
     * I make him 7px wide so he can easier fall between boxes
     */
    playerPosition: { x: 50, y: GROUND_Y, w: 7, h: 16 },
    boxes: [],
    boxesToRemove: [],
    frames: 0
}

function createBox(x: number, y: number): void {
    state.boxes.push({ id: boxCount++, x, y, w: 8, h: 8 })
}

// https://www.jeffreythompson.org/collision-detection/rect-rect.php
function rectCollide(r1: Rectangle, r2: Rectangle) {
    if (r1.x + r1.w > r2.x &&     // r1 right edge past r2 left
        r1.x < r2.x + r2.w &&       // r1 left edge past r2 right
        r1.y + r1.h > r2.y &&       // r1 top edge past r2 bottom
        r1.y < r2.y + r2.h) {       // r1 bottom edge past r2 top
        return true;
    }
    return false;
}

function isStanding(obj: Rectangle): { standing: boolean, box?: Box } {
    // todo: implement standing on boxes
    if (obj.y === GROUND_Y) {
        return { standing: true, box: undefined };
    } else {
        const standingOnBox = state.boxes
            .filter(b => b !== obj && b.id !== obj['id'])
            .find(b =>
                rectCollide(b, obj) && obj.y < b.y
            )
        return { standing: !!standingOnBox, box: standingOnBox };
    }
}

initControls();

createBox(32, GROUND_Y)
createBox(80, GROUND_Y)
createBox(64, GROUND_Y)
// createBox(40, GROUND_Y - 32)
setInterval(() => {
    let x = BOUNDS_X.MIN + (Math.random() * BOUNDS_X.MAX - 8);
    if (x % 8 !== 0) {
        x -= x % 8
    }
    createBox(x, 7)
}, 2000)

export function update(dt: number): GameState {
    state.frames += dt;
    let playerVelocity = 0;
    // only lives 1 frame
    if (state.boxesToRemove.length) {
        state.boxesToRemove = [];
    }

    // walk
    if (state.controls.left) {
        playerVelocity = -PLAYER_WALK_SPEED;
    }
    if (state.controls.right) {
        playerVelocity = PLAYER_WALK_SPEED;
    }

    // jump
    const { standing, box } = isStanding(state.playerPosition);

    if (state.controls.jump) {
        if (standing) {
            state.playerPosition.y -= JUMP_SPEED;
        }
    }

    // apply gravity to player
    if (!standing) {
        state.playerPosition.y += GRAVITY;
        if (state.playerPosition.y > GROUND_Y) {
            state.playerPosition.y = GROUND_Y;
        }
    }

    if (standing && box && !state.controls.jump) {
        if (state.playerPosition.y !== box.y - 8) {
            state.playerPosition.y = box.y - 8
        }
    }

    // apply gravity to boxes
    const boxesWithCollisions = state.boxes.map(b => ({ ...b, isStanding: isStanding(b) }));
    const boxesInTheAir = boxesWithCollisions.filter(b => !b.isStanding.standing)

    boxesInTheAir.forEach(b => {
        b.y += GRAVITY;
        if (b.y > GROUND_Y) {
            b.y = GROUND_Y;
            if (b.x % 8 !== 0) {
                if (b.x % 8 < 4) {
                    b.x = Math.trunc(b.x / 8) * 8
                } else {
                    b.x = Math.round(b.x / 8) * 8
                }
            }

        }
    })
    const boxesOnBoxes = boxesWithCollisions.filter(b => !!b.isStanding.box)
    boxesOnBoxes.forEach(b => {
        // it's possible to push a box into a box
        // if we decided a box is "standing" on box - should have respective y
        if (b.isStanding.box && b.y !== (b.isStanding.box.y - 8)) {
            // this is too generous, gotta return to this
            b.y = b.isStanding.box.y - 8
        }
    })
    state.boxes = boxesWithCollisions

    // bounds
    if (state.playerPosition.x < BOUNDS_X.MIN) {
        state.playerPosition.x = BOUNDS_X.MIN
    }
    if (state.playerPosition.x > BOUNDS_X.MAX) {
        state.playerPosition.x = BOUNDS_X.MAX
    }

    state.playerPosition.x += playerVelocity;

    // player moves boxes
    state.boxes.forEach(box => {
        const r1 = box;
        const r2 = state.playerPosition;
        if (rectCollide(r1, r2)) {
            if (r1.y  === r2.y) { // if the height is equal
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
            } else if (!isStanding(r1).standing) {
                // box is in the air - stop player from moving inside of it
                // player defo aint moving now
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

    // check if player managed to assemble a line of boxes
    const line = state.boxes.filter(b => b.y === GROUND_Y);
    if (line.length === 12) {
        state.boxesToRemove = [...line]
        state.boxes = state.boxes.filter(b => !line.includes(b))
    }
    if (state.controls.jump) {
        state.controls.jump = false;
    }
    return { ...state };
}