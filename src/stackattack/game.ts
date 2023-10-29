import { type ControlsState, controlsState, initControls } from "./controls"

const PLAYER_WALK_SPEED = 2;
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
    playerPosition: { x: 100, y: 440 },
    boxes: []
}

initControls();

export function update(dt: number): GameState {
    if (state.controls.left) {
        state.playerPosition.x -= PLAYER_WALK_SPEED;
    }
    if (state.controls.right) {
        state.playerPosition.x += PLAYER_WALK_SPEED;
    }
    return {...state};
}