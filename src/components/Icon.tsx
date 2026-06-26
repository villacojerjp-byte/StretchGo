import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { BI_DATA, BiName } from './bootstrapIconData';
import { colors } from '../theme';

export type { BiName };

type Props = {
  name: BiName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Renders a Bootstrap Icon (vendored, MIT licensed) via react-native-svg.
 * Inner paths inherit fill from the root <svg>, which we tint with `color`.
 */
export default function Icon({ name, size = 22, color = colors.ink, style }: Props) {
  const xml = useMemo(
    () =>
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="${size}" height="${size}" fill="${color}">${BI_DATA[name]}</svg>`,
    [name, size, color],
  );
  return <SvgXml xml={xml} width={size} height={size} style={style} />;
}
