/* eslint-disable import/prefer-default-export */
export function getRandomInt(xMin: number, xMax: number): number {
  return Math.floor(xMin + Math.random() * (xMax - xMin));
}
