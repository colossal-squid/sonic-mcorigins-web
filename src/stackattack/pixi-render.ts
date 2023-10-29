import * as PIXI from 'pixi.js';
import type { GameState } from './game';
import { GROUND_Y, HEIGHT, WIDTH } from './constants';

let app!: PIXI.Application;
let player!: PIXI.Sprite;
let boxSprites: PIXI.Sprite[] = [];
let spritesheet!: PIXI.Spritesheet;


async function loadSpritesheet(): Promise<PIXI.Spritesheet> {
    const { data } = await PIXI.Assets.load('/stackattack/spritesheet.json');
    const baseTexture = await PIXI.BaseTexture.from('/stackattack/tiles.png');
    spritesheet = new PIXI.Spritesheet(baseTexture, data);
    // Generate all the Textures asynchronously
    await spritesheet.parse();
    return spritesheet;
}

function createBackground(): PIXI.DisplayObject {
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

function createPlayer(): PIXI.DisplayObject {
    const player = new PIXI.Container();
    player.width = 8;
    player.height = 16;
    const tile1 = PIXI.Sprite.from(spritesheet.textures[7 * 16]);
    const tile2 = PIXI.Sprite.from(spritesheet.textures[7 * 16 + 1]);
    tile1.position.set(0, -8)
    tile2.position.set(0, 0)
    player.addChild(tile1)
    player.addChild(tile2);
    player.position.set(WIDTH / 2, GROUND_Y)
    return player;
}

export async function createPixiApp(el: Element): Promise<PIXI.Application> {
    app = new PIXI.Application({
        background: '#000',
        width: WIDTH,
        height: HEIGHT,
        antialias: false,
        // resizeTo: window 
    });
    spritesheet = await loadSpritesheet();
    const bg = createBackground();
    player = createPlayer()
    app.stage.addChild(bg)
    app.stage.addChild(player)
    el.appendChild(app.view as unknown as Element);
    return app;
}

export function paint(delta: number, state: GameState) {
    player.position.x = state.playerPosition.x;
    player.position.y = state.playerPosition.y;
    state.boxes.forEach(box => {
        let boxSprite = boxSprites.find(sprite => sprite.name === box.id.toString());
        if (!boxSprite) {
            boxSprite = PIXI.Sprite.from(spritesheet.textures[16]);
            boxSprite.name = box.id.toString()
            boxSprites.push(boxSprite);
            app.stage.addChild(boxSprite)
        }
        boxSprite.position.set(box.x, box.y)
    })

}