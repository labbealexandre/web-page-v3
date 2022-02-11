/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import CanvasObject from './canvas-object';
import { CornerCircleParams } from './params';

class CornerCircle extends CanvasObject {
    x: number;

    y:number;

    color: string;

    backgroundColor: string;

    angle: number;

    params: CornerCircleParams

    constructor(x: number, y: number, color: string, backgroundColor: string, params: CornerCircleParams) {
      super();
      this.params = params;

      this.x = x;
      this.y = y;
      this.angle = Math.random() * 2 * Math.PI;

      this.color = color;
      this.backgroundColor = backgroundColor;
    }

    getStartAngle(index: number): number {
      return this.angle + (2 * index * Math.PI) / this.params.holesNumber;
    }

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.save();
      ctx.lineWidth = this.params.width;

      ctx.beginPath();

      ctx.fillStyle = this.backgroundColor;
      ctx.strokeStyle = this.backgroundColor;
      ctx.arc(this.x, this.y, this.params.radius + this.params.width, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = this.color;
      for (let i = 0; i < this.params.holesNumber; i++) {
        const startAngle = this.getStartAngle(i);
        const endAngle = this.getStartAngle(i + 1) - this.params.holeGap;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.params.radius, startAngle, endAngle);
        ctx.stroke();
      }

      ctx.restore();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    move() :void {
      this.angle = (this.angle + this.params.angleStep) % (2 * Math.PI);
    }
}

export default CornerCircle;
