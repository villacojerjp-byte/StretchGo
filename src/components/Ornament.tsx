import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon, { BiName } from './Icon';
import { colors } from '../theme';

/**
 * A delicate centered motif — two hairlines flanking a small glyph.
 * Used sparingly for an elegant, feminine editorial touch.
 */
export default function Ornament({
  icon = 'asterisk',
  color = colors.inkTertiary,
  width = 64,
  size = 13,
}: {
  icon?: BiName;
  color?: string;
  width?: number;
  size?: number;
}) {
  return (
    <View style={styles.row}>
      <View style={[styles.line, { width, backgroundColor: color, opacity: 0.4 }]} />
      <Icon name={icon} size={size} color={color} />
      <View style={[styles.line, { width, backgroundColor: color, opacity: 0.4 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12 },
  line: { height: 1, borderRadius: 1 },
});
