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
  mobileFactor: 2,
  cornerCircle: {
    radius: 1 / 8,
    width: 10,
    holesNumber: 6,
    holeGap: Math.PI / 12,
    angleStep: Math.PI / 600,
  },
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

function getLife(index: number, width: number, isMobile: boolean): number {
  const t = ((index % 2) ^ (Math.floor(index / 2) % 2));

  const lifeMin = PARAMS.lifeMin + ((PARAMS.lifeMax - PARAMS.lifeMin) / 2) * t;
  const lifeMax = PARAMS.lifeMin + ((PARAMS.lifeMax - PARAMS.lifeMin) / 2) * (1 + t);

  let life = getRandomInt(width * lifeMin, width * lifeMax);
  if (isMobile) {
    life *= PARAMS.mobileFactor;
  }
  return life;
}

function getHalfLife(width: number, isMobile: boolean): number {
  let halfLife = width * PARAMS.halfLife;
  if (isMobile) {
    halfLife *= PARAMS.mobileFactor;
  }
  return halfLife;
}

class CanvasObject {
  state: State;

  constructor() {
    this.state = State.GROW;
  }

  move() {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  draw(ctx: CanvasRenderingContext2D): void {
    throw new Error('Not implemented');
  }
}

class Point extends CanvasObject {
  x: number;

  y: number;

  radius: number;

  color: string;

  life: number;

  halfLife: number;

  theta: number;

  alpha: number;

  type: number;

  hasTurned: boolean;

  constructor(x: number, y:number, theta: number, alpha: number, color: string, type: Type, life: number, halfLife: number) {
    super();
    this.x = x;
    this.y = y;
    this.theta = theta;
    this.alpha = alpha;
    this.radius = PARAMS.radius;
    this.color = color;
    this.life = life;
    this.halfLife = halfLife;
    this.type = type;
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
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

class CornerCircle extends CanvasObject {
  x: number;

  y:number;

  radius: number;

  width: number;

  color: string;

  backgroundColor: string;

  angle: number;

  holesNumber: number;

  holeGap: number

  constructor(x: number, y: number, radius: number, width: number, color: string, backgroundColor: string, holesNumber: number, holeGap: number) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.width = width;
    this.color = color;
    this.backgroundColor = backgroundColor;
    this.holesNumber = holesNumber;
    this.holeGap = holeGap;
    this.angle = Math.random() * 2 * Math.PI;
  }

  getStartAngle(index: number): number {
    return this.angle + (2 * index * Math.PI) / this.holesNumber;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.lineWidth = this.width;

    ctx.beginPath();

    ctx.fillStyle = this.backgroundColor;
    ctx.strokeStyle = this.backgroundColor;
    ctx.arc(this.x, this.y, this.radius + this.width, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = this.color;
    for (let i = 0; i < this.holesNumber; i++) {
      const startAngle = this.getStartAngle(i);
      const endAngle = this.getStartAngle(i + 1) - this.holeGap;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, startAngle, endAngle);
      ctx.stroke();
    }

    ctx.restore();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  move() :void {
    this.angle = (this.angle + PARAMS.cornerCircle.angleStep) % (2 * Math.PI);
  }
}

class Runner {
  width = 0;

  height = 0;

  canvas: HTMLCanvasElement;

  context: CanvasRenderingContext2D;

  objects: CanvasObject[] = [];

  color: string;

  backgroundColor: string;

  isMobile: boolean;

  constructor(color: string, backgroundColor: string, canvas: HTMLCanvasElement, isMobile: boolean) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.color = color;
    this.backgroundColor = backgroundColor;
    this.isMobile = isMobile;
  }

  restart(): void {
    [this.width, this.height] = [this.canvas.width, this.canvas.height];

    this.objects = [];
    for (let i = 0; i < PARAMS.nLines; i++) {
      const firstHalf = i < PARAMS.nLines / 2;

      const offset = firstHalf ? PARAMS.offsetY : 1 - PARAMS.offsetY;
      const theta = Math.PI * (firstHalf ? 0 : -1);
      const x = firstHalf ? 0 : this.width;
      const y = (offset + (i % (PARAMS.nLines / 2)) * PARAMS.deltaY * (firstHalf ? 1 : -1)) * this.height;
      const type = getRandomInt(0, 2);
      const alpha = getAngle(i);
      const life = getLife(i, this.width, this.isMobile);
      const halfLife = getHalfLife(this.width, this.isMobile);

      this.objects.push(new Point(x, y, theta, alpha, this.color, type, life, halfLife));
    }

    this.objects.push(new CornerCircle(this.width, 0, this.width * PARAMS.cornerCircle.radius, PARAMS.cornerCircle.width, this.color, this.backgroundColor, PARAMS.cornerCircle.holesNumber, PARAMS.cornerCircle.holeGap));
  }

  draw(): void {
    // Move each point
    this.objects.forEach((object) => {
      object.move();
    });

    // Remove dead objects
    this.objects = this.objects.filter((object) => object.state !== State.DEAD);

    // Draw each point
    this.objects.forEach((object) => {
      object.draw(this.context);
    });
  }
}

export default Runner;
