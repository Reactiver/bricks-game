import { detectCollision } from './collisionDetection.js';

const BALL_IMAGE_ID = 'img_ball';
const BALL_SIZE = 16;
const START_POSITION = {
  x: 10,
  y: 400,
};
const BALL_SPEED = {
  x: 4,
  y: -2,
};

export class Ball {
  size = BALL_SIZE;

  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;

    this.image = document.getElementById(BALL_IMAGE_ID);

    this.reset();
  }

  reset() {
    this.position = { ...START_POSITION };
    this.speed = { ...BALL_SPEED };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // wall on left or right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // wall on top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // bottom of game
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }

    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
