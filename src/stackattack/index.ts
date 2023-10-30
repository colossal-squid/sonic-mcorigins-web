import { update } from "./game";
// import { createPixiApp, paint } from "./debug-render";
import { createPixiApp, paint } from "./pixi-render";

export async function run(el: Element) {
    const app = await createPixiApp(el);
    app.ticker.add((delta) => {
       const state = update(delta);
       paint(delta, state);
    })
}