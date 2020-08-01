import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import PathBuilder from './pathbuilder';

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
    const tl = borderTopLeftRadius || borderRadius;
    const tr = borderTopRightRadius || borderRadius;
    const br = borderBottomRightRadius || borderRadius;
    const bl = borderBottomLeftRadius || borderRadius;

    let path = new PathBuilder();

    path.move(0, tl);

    if (tl > 0) {
      path.arc(tl, tl, tl, 0);
    }
    path.line(width - (tr + tl), 0);

    if (tr > 0) {
      path.arc(width - tr, tr, tr, 1);
    }
    path.line(0, height - (tr + br));

    if (br > 0) {
      path.arc(width - br, height - br, br, 2);
    }
    path.line(-width + (br + bl), 0);

    if (bl > 0) {
      path.arc(bl, height - bl, bl, 3);
    }
    path.line(0, bl).line(width, 0).line(0, -height).line(-width, 0);

    return (
      <Svg
        width={width}
        height={height}
        style={{ backgroundColor: 'transparent' }}
      >
        <Path d={path.path} fill={color} />
      </Svg>
    );
  }
}

export default ClipRect;
