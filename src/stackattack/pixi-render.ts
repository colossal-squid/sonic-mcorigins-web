import * as PIXI from 'pixi.js';
import type { GameState } from './game';

const WIDTH = 900, HEIGHT = 720;

let player: PIXI.Sprite | undefined = undefined;

function createSprite(path: string): PIXI.Sprite {
    const background = PIXI.Sprite.from(path);
    background.anchor.set(0.5)
    return background;
}

function createBackground(): PIXI.DisplayObject {
    const background = createSprite('../stackattack/background.png');
    background.width = WIDTH;
    background.height = HEIGHT;
    background.position.set(WIDTH / 2, HEIGHT / 2);
    return background as PIXI.DisplayObject;
}

export function createPixiApp(el: Element):PIXI.Application {
    const app = new PIXI.Application({ 
        background: '#1099bb',
        width: WIDTH,
        height: HEIGHT,
        // resizeTo: window 
    });
    
    player = createSprite('../stackattack/guy.png');
    player.position.set(WIDTH /2, HEIGHT * 0.6);
    player.scale.set(0.5)
    app.stage.addChild(createBackground())
    app.stage.addChild(player)
    el.appendChild(app.view as unknown as Element);
    return app;
}

export function paint(delta: number, state: GameState) {
    if (!player) {
        return;
    }
    player.position.x = state.playerPosition.x;
    player.position.y = state.playerPosition.y;

}