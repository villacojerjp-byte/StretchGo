import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import Icon, { BiName } from './Icon';
import { colors, radius, spacing, type } from '../theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'lg' | 'md';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  icon?: BiName;
  iconRight?: BiName;
  style?: ViewStyle;
  haptic?: boolean;
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled,
  loading,
  icon,
  iconRight,
  style,
  haptic = true,
}: Props) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';

  const fg =
    isPrimary ? colors.white : isSecondary ? colors.ink : colors.ink;

  const handle = () => {
    if (disabled || loading) return;
    if (haptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    onPress?.();
  };

  return (
    <Pressable
      onPress={handle}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        size === 'lg' ? styles.lg : styles.md,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        isOutline && styles.outline,
        variant === 'ghost' && styles.ghost,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View style={styles.row}>
          {icon ? <Icon name={icon} size={18} color={fg} style={{ marginRight: 8 }} /> : null}
          <Text style={[type.button, { color: fg }]} numberOfLines={1}>
            {label}
          </Text>
          {iconRight ? <Icon name={iconRight} size={18} color={fg} style={{ marginLeft: 8 }} /> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  lg: { height: 58, paddingHorizontal: spacing.xl },
  md: { height: 46, paddingHorizontal: spacing.lg },
  primary: { backgroundColor: colors.ink },
  secondary: { backgroundColor: colors.surface },
  outline: { backgroundColor: colors.bg, borderWidth: 1.5, borderColor: colors.ink },
  ghost: { backgroundColor: 'transparent' },
  disabled: { opacity: 0.35 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.985 }] },
});
