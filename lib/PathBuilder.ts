export default class PathBuilder {
  path: Readonly<string>;

  constructor() {
    this.path = '';
  }

  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  arc(x, y, radius, startAngle) {
    startAngle *= 90;

    let endAngle = startAngle + 90;

    while (endAngle > 360) {
      endAngle -= 360;
    }

    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle < 180 ? '0' : '1';

    var d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ');

    this.path = `${this.path} ${d}`;
    return this;
  }

  move(x: number, y: number) {
    this.path = `${this.path} m${x},${y}`;
    return this;
  }

  lineTo(x: number, y: number) {
    this.path = `${this.path} L${x} ${y}`;
    return this;
  }

  lineHorizontal(h: number) {
    this.path = `${this.path} h${h}`;
    return this;
  }

  lineVertical(v: number) {
    this.path = `${this.path} v${v}`;
    return this;
  }

  close() {
    this.path = `${this.path} z`;

    return this;
  }
}
