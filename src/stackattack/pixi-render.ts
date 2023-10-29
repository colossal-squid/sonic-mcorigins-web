import * as PIXI from 'pixi.js';
import type { GameState } from './game';

const WIDTH = 128, HEIGHT = 64;

let player: PIXI.Sprite | undefined = undefined;

async function loadSpritesheet(): Promise<PIXI.Spritesheet> {
    const { data } = await PIXI.Assets.load('/stackattack/spritesheet.json');
    const baseTexture = await PIXI.BaseTexture.from('/stackattack/tiles.png');
    const spritesheet = new PIXI.Spritesheet(baseTexture, data);
    // Generate all the Textures asynchronously
    await spritesheet.parse();
    return spritesheet;
}

function createBackground(spritesheet: PIXI.Spritesheet): PIXI.DisplayObject {
    const container = new PIXI.Sprite();
    // wall on the left
    for (let y = 0; y < 8; y++) {
        const tile = PIXI.Sprite.from(spritesheet.textures[1]);
        tile.anchor.set(0)
        tile.position.set(0, y * 8)
        container.addChild(tile);
    }
    // top
    for (let x=0; x < 16; x++) {
        const tile = PIXI.Sprite.from(spritesheet.textures[18]);
        tile.anchor.set(0)
        tile.position.set(x * 8, 0)
        container.addChild(tile);
    }
    // top
    for (let x=0; x < 16; x++) {
        const tile = PIXI.Sprite.from(spritesheet.textures[33]);
        tile.anchor.set(0)
        tile.position.set(x * 8, HEIGHT - 8)
        container.addChild(tile);
    }
    return container;
}

export async function createPixiApp(el: Element): Promise<PIXI.Application> {
    const app = new PIXI.Application({
        background: '#000',
        width: WIDTH,
        height: HEIGHT,
        // resizeTo: window 
    });
    const spritesheet = await loadSpritesheet();
    const bg = createBackground(spritesheet);
    app.stage.addChild(bg)
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