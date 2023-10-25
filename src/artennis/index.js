import { init, render } from "./svg-render";
import { state, update } from "./game";
import { initControls, clearControls } from "./controls";

async function createImage(src, className) {
  const img = document.createElement("img");
  img.className = className;;
  img.src = src;
  return img;
}

async function createSvgImage() {
  const svg = document.createElement("svg");
  svg.className = "lcd-screen";
  svg.innerHTML = await fetch("artennis/artennis.svg")
    .then((res) => res.text())
    .then((text) => {
      return text;
    });
  return svg;
}


const FPS = 2;
export async function run(rootElement) {
  rootElement.appendChild(await createImage("artennis/artennis_front.jpg", "lcd-game"));
  rootElement.appendChild(await createImage("artennis/artennis_bg.jpg", "lcd-background"));
  rootElement.appendChild(await createSvgImage());
  init();
  initControls();
  setInterval(() => {
    update();
    render(state);
    clearControls();
  }, 1000 / FPS);
}

run();