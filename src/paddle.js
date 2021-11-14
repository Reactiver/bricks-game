export class Paddle {
  maxSpeed = 10;
  speed = 0;
  width = 150;
  height = 30;

  constructor(game) {
    this.gameWidth = game.gameWidth;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10,
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = '#0ff';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.speed;

    if (this.position.x < 0) {
      this.position.x = 0;
    }

    if (this.position.x > this.gameWidth - this.width) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}
