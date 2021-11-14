import { Game } from './game.js';

const CANVAS_ID = 'gameScreen';
const CANVAS_CONTEXT = '2d';

let canvas = document.getElementById(CANVAS_ID);
let ctx = canvas.getContext(CANVAS_CONTEXT);

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

function gameLoop() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update();
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
