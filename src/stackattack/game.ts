import { type ControlsState, controlsState, initControls } from "./controls"

const PLAYER_WALK_SPEED = 2;
const GROUND_Y = 440;
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
    playerPosition: { x: 100, y: GROUND_Y },
    boxes: []
}

function createBox(x: number, y: number): void {
    state.boxes.push({id: boxCount++, x, y})
}

initControls();

createBox(300, GROUND_Y)
export function update(dt: number): GameState {
    if (state.controls.left) {
        state.playerPosition.x -= PLAYER_WALK_SPEED;
    }
    if (state.controls.right) {
        state.playerPosition.x += PLAYER_WALK_SPEED;
    }
    return {...state};
}