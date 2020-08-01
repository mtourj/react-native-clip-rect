const TIMES = 30;

const _X = (r, d) => Math.cos((Math.PI / 180) * d) * r;
const _Y = (r, d) => Math.sin((Math.PI / 180) * d) * r;

export default class PathBuilder {
  path: Readonly<string>;

  constructor() {
    this.path = '';
  }

  arc = (x, y, r, t) => {
    const offset = 90 / TIMES;
    for (let i = 0; i <= TIMES; i++) {
      this.line(x - _X(r, 90 * t + offset * i), y - _Y(r, 90 * t + offset * i));
    }
    return this;
  };

  move(x: number, y: number) {
    this.path = `${this.path} M ${x},${y}`;
    return this;
  }

  line(x: number, y: number) {
    this.path = `${this.path} L ${x},${y}`;
    return this;
  }
}
