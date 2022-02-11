import { State } from './types';

/* eslint-disable class-methods-use-this */
class CanvasObject {
    state: State;

    constructor() {
      this.state = State.GROW;
    }

    move(): void {
      throw new Error('Not implemented');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    draw(ctx: CanvasRenderingContext2D): void {
      throw new Error('Not implemented');
    }
}

export default CanvasObject;
