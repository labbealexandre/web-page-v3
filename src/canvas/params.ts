export type PointParams = {
  radius: number,
  lifeMin: number;
  lifeMax: number,
  halfLife: number,
  offsetY: number,
  deltaY: number,
  nLines: number,
  angle: number,
  mobileFactor: number
}

export type CornerCircleParams = {
  radius: number,
  width: number,
  holesNumber: number,
  holeGap: number,
  angleStep: number
}

export type Params = {
  point: PointParams,
  cornerCircle: CornerCircleParams
}
