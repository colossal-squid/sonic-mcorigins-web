const SIZE = 128;
const meta = {
    app: "pico-8-to-spritesheet-json",
    version: "0.0.1",
    image: "../sonic-mcorigins-web/stackattack/tiles.png",
    format: "RGBA8888",
    size: {
        w: SIZE,
        h: SIZE
    },
    scale: "1"
}

const frames = [];

for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 16; y++) {
        frames.push({
            filename: `x=${x}y=${y}`,
            frame: {
                x: x * 8, y: y * 8, w: 8, h: 8
            },
            rotated: false,
            trimmed: false,
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: 8,
                h: 8
            },
            sourceSize: {
                w: 8,
                h: 8
            }
        },)
    }
}

console.log(JSON.stringify({
    meta, frames
}, null, 2))