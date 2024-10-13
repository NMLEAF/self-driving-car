import { Controls } from "./controls.js";

export class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.accelareation = 0.2;
    this.maxSped = 3;
    this.friction = 0.05;
    this.angle = 0;

    this.controls = new Controls();
  }

  update() {
    // Movement
    if (this.controls.forward) {
      this.speed += this.accelareation;
    }
    if (this.controls.reverse) {
      this.speed -= this.accelareation;
    }
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;

      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    // Max speed
    if (this.speed > this.maxSped) {
      this.speed = this.maxSped;
    }
    if (this.speed < -this.maxSped / 2) {
      this.speed = -this.maxSped / 2;
    }

    // Friction
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
    // this.y -= this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);

    ctx.fill();

    ctx.restore();
  }
}
