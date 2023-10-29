import { update } from "./game";
import { createPixiApp, paint } from "./pixi-render";

export function run(el: Element) {
    const app = createPixiApp(el);
    app.ticker.add((delta) => {
       const state = update(delta);
       paint(delta, state);
    })
}