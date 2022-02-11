/* eslint-disable no-bitwise */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */

import CanvasObject from './canvas/canvas-object';
import CornerCircle from './canvas/corner-circle';
import Link from './canvas/links';
import { CornerCircleParams, Params, PointParams } from './canvas/params';
import Point from './canvas/point';
import { State } from './canvas/types';

function getPointParams(width: number, height: number, isMobile: boolean) : PointParams {
  const sizeFactor = (isMobile ? 1.5 : 1);

  return {
    radius: isMobile ? 3 : 6,
    lifeMin: (width / 12) * sizeFactor,
    lifeMax: (width / 3) * sizeFactor,
    halfLife: (width / 16) * sizeFactor,
    offsetY: height / 12,
    deltaY: height / 16,
    nLines: 8,
    angle: 30,
  };
}

function getCornerCircleParams(width: number, height: number, isMobile: boolean): CornerCircleParams {
  return {
    radius: width / (isMobile ? 4 : 8),
    width: isMobile ? 8 : 16,
    holesNumber: 6,
    holeGap: Math.PI / 16,
    angleStep: Math.PI / 600,
  };
}

function getLinkParams(width: number, height: number, isMobile: boolean) {
  return {
    nLinks: 3,
    radius: 70,
    width: isMobile ? 6 : 12,
    distance: width / 5,
  };
}

function getParams(width: number, height: number, isMobile: boolean): Params {
  return {
    point: getPointParams(width, height, isMobile),
    cornerCircle: getCornerCircleParams(width, height, isMobile),
    link: getLinkParams(width, height, isMobile),
  };
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

  iconsPositions: [number, number][];

  constructor(color: string, backgroundColor: string, canvas: HTMLCanvasElement, isMobile: boolean) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.color = color;
    this.backgroundColor = backgroundColor;
    this.isMobile = isMobile;
    this.iconsPositions = [];
  }

  restart(): void {
    [this.width, this.height] = [this.canvas.width, this.canvas.height];

    const params = getParams(this.width, this.height, this.isMobile);

    this.objects = [];
    this.iconsPositions = [];

    for (let i = 0; i < params.point.nLines; i++) {
      this.objects.push(new Point(this.color, i, this.width, this.height, params.point));
    }

    if (this.width > 1300) {
      for (let i = 0; i < params.link.nLinks; i++) {
        const link = new Link(this.color, i, this.width, 0, params.link);
        this.iconsPositions.push([link.x2, link.y2]);

        this.objects.push(link);
      }
    }

    this.objects.push(new CornerCircle(this.width, 0, this.color, this.backgroundColor, params.cornerCircle));
    this.objects.push(new CornerCircle(0, this.height, this.color, this.backgroundColor, params.cornerCircle));
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
