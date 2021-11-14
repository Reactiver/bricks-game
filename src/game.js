import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { InputHandler } from './input.js';
import { buildLevel, level1, level2 } from './levels.js';

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
};

export class Game {
  gameObjects = [];
  bricks = [];
  levels = [level1, level2];
  currentLevel = 0;
  lives = 1;

  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gameState = GAMESTATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gameState !== GAMESTATE.MENU &&
      this.gameState !== GAMESTATE.NEWLEVEL
    ) {
      return;
    }

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);

    this.ball.reset();

    this.gameObjects = [this.paddle, this.ball];

    this.gameState = GAMESTATE.RUNNING;
  }

  update() {
    if (this.lives === 0) {
      this.gameState = GAMESTATE.GAMEOVER;
    }

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER
    ) {
      return;
    }

    [...this.gameObjects, ...this.bricks].forEach((object) => object.update());

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);

    if (this.bricks.length === 0) {
      this.gameState = GAMESTATE.NEWLEVEL;
      this.currentLevel++;
      this.start();
    }
  }

  togglePause() {
    if (this.gameState === GAMESTATE.RUNNING) {
      this.gameState = GAMESTATE.PAUSED;
    } else {
      this.gameState = GAMESTATE.RUNNING;
    }
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

    if (this.gameState === GAMESTATE.PAUSED) {
      this.drawPaused(ctx);
    }

    if (this.gameState === GAMESTATE.MENU) {
      this.drawMenu(ctx);
    }

    if (this.gameState === GAMESTATE.GAMEOVER) {
      this.drawGameOver(ctx);
    }
  }

  drawGameOver(ctx) {
    ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = 'rgba(0,0,0,1)';
    this.updateFontStyle(ctx);
    ctx.fillText('GAME OVER ', this.gameWidth / 2, this.gameHeight / 2);
  }

  drawMenu(ctx) {
    ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = 'rgba(0,0,0,1)';
    this.updateFontStyle(ctx);
    ctx.fillText(
      'Press SPACEBAR to Start',
      this.gameWidth / 2,
      this.gameHeight / 2
    );
  }

  drawPaused(ctx) {
    ctx.rect(0, 0, this.gameWidth, this.gameHeight);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this.updateFontStyle(ctx);
    ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2);
  }

  updateFontStyle(ctx) {
    ctx.fill();
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
  }
}
