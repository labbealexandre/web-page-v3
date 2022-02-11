/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
import CanvasObject from './canvas-object';
import { LinkParams } from './params';

class Link extends CanvasObject {
    x0: number;

    y0: number;

    color: string;

    x1: number;

    y1: number;

    x2: number;

    y2: number;

    params: LinkParams;

    theta: number;

    constructor(color: string, index: number, x0: number, y0: number, params: LinkParams) {
      super();
      this.params = params;

      this.theta = (2 * index + 1) * ((Math.PI / 2) / (2 * this.params.nLinks));
      this.x0 = x0;
      this.y0 = y0;
      this.x1 = x0 - params.distance * Math.cos(this.theta);
      this.y1 = y0 + params.distance * Math.sin(this.theta);
      this.x2 = this.x1 - params.radius * Math.cos(this.theta);
      this.y2 = this.y1 + params.radius * Math.sin(this.theta);

      this.color = color;
    }

    move(): void {}

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.save();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.params.width;

      ctx.beginPath();
      ctx.moveTo(this.x0, this.y0);
      ctx.lineTo(this.x1, this.y1);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(this.x2, this.y2, this.params.radius, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.restore();
    }
}

export default Link;
