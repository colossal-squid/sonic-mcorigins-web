import '../styles/index.scss';
import * as PIXI from 'pixi.js';

// Create a PixiJS application of type cavas with specify background color and make it resizes to the iframe window
const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });

// Adding the application's view to the DOM
document.body.appendChild(app.view);
