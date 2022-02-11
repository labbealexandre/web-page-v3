/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-bitwise */
import CanvasObject from './canvas-object';
import { PointParams } from './params';
import { State } from './types';
import { getRandomInt } from './utils';

enum Type {
    ROWND,
    SQUARE
}

function isFirstHalf(index: number, params: PointParams) {
  const firstHalf = index < params.nLines / 2;

  return firstHalf;
}

function getPointX(width: number, firstHalf: boolean): number {
  const x = firstHalf ? 0 : width;

  return x;
}

function getPointY(index: number, height: number, firstHalf: boolean, params: PointParams): number {
  const offset = firstHalf ? params.offsetY : height - params.offsetY;
  const y = offset + (index % (params.nLines / 2)) * params.deltaY * (firstHalf ? 1 : -1);

  return y;
}

function getTheta(firstHalf: boolean): number {
  const theta = Math.PI * (firstHalf ? 0 : -1);

  return theta;
}

function getAlpha(index: number, params: PointParams): number {
  const t = (Math.floor(index / 2) % 2) * 2 - 1;
  const alpha = (Math.PI * t * params.angle) / 180;

  return alpha;
}

function getLife(index: number, isMobile: boolean, params: PointParams): number {
  const t = ((index % 2) ^ (Math.floor(index / 2) % 2));

  const lifeMin = params.lifeMin + ((params.lifeMax - params.lifeMin) / 2) * t;
  const lifeMax = params.lifeMin + ((params.lifeMax - params.lifeMin) / 2) * (1 + t);

  let life = getRandomInt(lifeMin, lifeMax);
  if (isMobile) {
    life *= params.mobileFactor;
  }
  return life;
}

function getHalfLife(isMobile: boolean, params: PointParams): number {
  let { halfLife } = params;
  if (isMobile) {
    halfLife *= params.mobileFactor;
  }
  return halfLife;
}

function getType(): Type {
  return getRandomInt(0, 2);
}

class Point extends CanvasObject {
    x: number;

    y: number;

    color: string;

    life: number;

    halfLife: number;

    theta: number;

    alpha: number;

    type: number;

    radius: number;

    hasTurned: boolean;

    params: PointParams;

    constructor(color: string, index: number, width :number, height: number, params: PointParams, isMobile: boolean) {
      super();
      this.params = params;

      const firstHalf = isFirstHalf(index, params);

      this.x = getPointX(width, firstHalf);
      this.y = getPointY(index, height, firstHalf, params);
      this.theta = getTheta(firstHalf);
      this.alpha = getAlpha(index, params);
      this.life = getLife(index, isMobile, params);
      this.halfLife = getHalfLife(isMobile, params);
      this.type = getType();
      this.radius = this.params.radius;
      this.hasTurned = false;

      this.color = color;
    }

    move(): void {
      if (this.state === State.DEAD) {
        return;
      }

      this.life -= 1;
      switch (this.state) {
        case State.GROW:
          if (!this.hasTurned && this.life <= this.halfLife) {
            this.theta += this.alpha;
            this.hasTurned = true;
          }
          this.x += Math.cos(this.theta);
          this.y += Math.sin(this.theta);
          if (this.life <= 0) {
            this.state = State.EXTEND;
          }
          break;
        case State.EXTEND:
          this.radius += 1;
          if (this.life <= -10) {
            this.state = State.DEAD;
          }
          break;
        default:
      }
    }

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.theta);
      ctx.beginPath();
      if (this.type === 1 && this.state === State.EXTEND) {
        ctx.rect(0 - this.radius, 0 - this.radius, this.radius * 2, this.radius * 2);
      } else {
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
      }
      ctx.strokeStyle = this.color;
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
}

export default Point;
