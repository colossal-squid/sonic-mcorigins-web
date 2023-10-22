import '../styles/index.scss';
import * as PIXI from 'pixi.js';

// Create a PixiJS application of type cavas with specify background color and make it resizes to the iframe window
const app = new PIXI.Application({ background: '#1099bb', width: 800, height: 600 });

let sprite = PIXI.Sprite.from('assets/arvolleyball/arvolleyball_front.jpg');
sprite.width = 830;
sprite.height = 600;
app.stage.addChild(sprite);

// Adding the application's view to the DOM
document.body.appendChild(app.view);
