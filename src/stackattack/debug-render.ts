import * as PIXI from 'pixi.js';
import type { GameState } from './game';
import { GROUND_Y, HEIGHT, WIDTH } from './constants';

let app!: PIXI.Application;
let graphics!: PIXI.Graphics;

export async function createPixiApp(el: Element): Promise<PIXI.Application> {
    app = new PIXI.Application({
        background: '#000',
        width: WIDTH,
        height: HEIGHT,
        antialias: false,
        // resizeTo: window 
    });

    graphics = new PIXI.Graphics();
    app.stage.addChild(graphics)
    el.appendChild(app.view as unknown as Element);
    return app;
}

export function paint(delta: number, state: GameState) {
    graphics.clear();
    graphics.beginFill(0xFFFFFF);
    // draw ground 
    graphics.drawRect(0, GROUND_Y, WIDTH, 2);
    graphics.endFill();

    graphics.beginFill(0x00FF00);
    // draw player
    const { x, y, w, h } = state.playerPosition
    graphics.drawRect(x - w, y - h, w, h)
    graphics.endFill();

    // draw boxes 
    graphics.beginFill(0x000080);
    state.boxes.forEach(({ x, y, w, h }) => {
        graphics.drawRect(x - w, y - h, w, h)
    })
    graphics.endFill();
}