import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path, Defs, ClipPath, Rect } from 'react-native-svg';
import PathBuilder from './lib/PathBuilder';

interface IClipRectProps {
  style: any;
}

class ClipRect extends PureComponent<IClipRectProps> {
  render() {
    const style = StyleSheet.flatten(this.props.style);
    let {
      width,
      height,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
      color,
    } = style;
    borderRadius = borderRadius || 0;

    if (borderRadius > Math.min(width, height) / 2) {
      borderRadius = Math.min(width, height) / 2;
    }

    const tl = borderTopLeftRadius || borderRadius;
    const tr = borderTopRightRadius || borderRadius;
    const br = borderBottomRightRadius || borderRadius;
    const bl = borderBottomLeftRadius || borderRadius;

    const path = new PathBuilder();

    path.move(tl, 0);

    path.lineTo(width - tr, 0);

    if (tr) {
      path.arc(width - tr, tr, tr, 0);
    }

    path.move(tr, tr);

    path.lineTo(width, height - br);

    if (br) {
      path.arc(width - br, height - br, br, 1);
    }
    path.move(-br, br);

    path.lineTo(bl, height);

    if (bl) {
      path.arc(bl, height - bl, bl, 2);
    }
    path.move(-bl, -bl);

    path.lineTo(0, tr);

    if (tl) {
      path.arc(tr, tr, tr, 3);
    }

    path.move(tr, -tr);

    path
      .lineTo(width - tr, 0)
      .lineTo(width, tr)
      .lineTo(width, height - br)
      .lineTo(width - br, height)
      .lineTo(bl, height)
      .lineTo(0, height - bl)
      .lineTo(0, bl);

    path.close();

    return (
      <Svg
        width={width}
        height={height}
        style={{ backgroundColor: 'transparent' }}
        clipPath='url(#clip)'
      >
        <Defs>
          <ClipPath id='clip' clipRule='evenodd'>
            <Rect width='100%' height='100%' />
            <Path fill='black' d={path.path} />
          </ClipPath>
        </Defs>
        <Rect
          fill={color}
          clipRule='evenodd'
          clipPath='url(#clip)'
          width='100%'
          height='100%'
          x='0'
          y='0'
        />
      </Svg>
    );
  }
}

export default ClipRect;
