/* eslint-disable no-bitwise */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

const PARAMS = {
  radius: 5,
  lifeMin: 1 / 12,
  lifeMax: 1 / 3,
  halfLife: 1 / 16,
  offsetY: 1 / 12,
  deltaY: 1 / 16,
  nLines: 8,
  angle: 30,
};

enum State {
  EXTEND,
  GROW,
  DEAD
}

enum Type {
  ROWND,
  SQUARE
}

function getRandomInt(xMin: number, xMax: number): number {
  return Math.floor(xMin + Math.random() * (xMax - xMin));
}

function getAngle(index: number): number {
  const t = (Math.floor(index / 2) % 2) * 2 - 1;
  return (Math.PI * t * PARAMS.angle) / 180;
}

function getLife(index: number, width: number): number {
  const t = ((index % 2) ^ (Math.floor(index / 2) % 2));

  const lifeMin = PARAMS.lifeMin + ((PARAMS.lifeMax - PARAMS.lifeMin) / 2) * t;
  const lifeMax = PARAMS.lifeMin + ((PARAMS.lifeMax - PARAMS.lifeMin) / 2) * (1 + t);

  return getRandomInt(width * lifeMin, width * lifeMax);
}

class Point {
  x: number;

  y: number;

  radius: number;

  color: string;

  life: number;

  halfLife: number;

  theta: number;

  alpha: number;

  state: State;

  type: number;

  hasTurned: boolean;

  constructor(x: number, y:number, theta: number, alpha: number, color: string, type: Type, life: number, halfLife: number) {
    this.x = x;
    this.y = y;
    this.theta = theta;
    this.alpha = alpha;
    this.radius = PARAMS.radius;
    this.color = color;
    this.life = life;
    this.halfLife = halfLife;
    this.type = type;
    this.state = State.GROW;
    this.hasTurned = false;
  }

  move() {
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
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

class Runner {
  width = 0;

  height = 0;

  canvas: HTMLCanvasElement;

  context: CanvasRenderingContext2D;

  points: Point[] = [];

  color: string;

  constructor(color: string, canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.color = color;
  }

  restart(): void {
    [this.width, this.height] = [this.canvas.width, this.canvas.height];

    this.points = [];
    for (let i = 0; i < PARAMS.nLines; i++) {
      const firstHalf = i < PARAMS.nLines / 2;

      const offset = firstHalf ? PARAMS.offsetY : 1 - PARAMS.offsetY;
      const theta = Math.PI * (firstHalf ? 0 : -1);
      const x = firstHalf ? 0 : this.width;
      const y = (offset + (i % (PARAMS.nLines / 2)) * PARAMS.deltaY * (firstHalf ? 1 : -1)) * this.height;
      const type = getRandomInt(0, 2);
      const life = getLife(i, this.width);
      const alpha = getAngle(i);
      const halfLife = this.width * PARAMS.halfLife;

      this.points.push(new Point(x, y, theta, alpha, this.color, type, life, halfLife));
    }
  }

  draw(): void {
    // Move each point
    this.points.forEach((point) => {
      point.move();
    });

    // Remove dead points
    this.points = this.points.filter((point) => point.state !== State.DEAD);

    // Draw each point
    this.points.forEach((point) => {
      point.draw(this.context);
    });
  }
}

export default Runner;
