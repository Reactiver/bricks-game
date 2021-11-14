import { detectCollision } from './collisionDetection.js';

const BRICK_IMAGE_ID = 'img_brick';
const BRICK_WIDTH = 80;
const BRICK_HEIGHT = 24;

export class Brick {
  width = BRICK_WIDTH;
  height = BRICK_HEIGHT;
  markedForDeletion = false;

  constructor(game, position) {
    this.game = game;
    this.position = position;

    this.image = document.getElementById(BRICK_IMAGE_ID);
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
