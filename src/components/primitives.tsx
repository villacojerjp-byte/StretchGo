import React from 'react';
import {
  Pressable,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Icon, { BiName } from './Icon';
import { colors, layout, radius, shadow, spacing, type } from '../theme';

/* ---------- Screen ---------- */

export function Screen({
  children,
  scroll = true,
  edges = ['top'],
  contentStyle,
  ...rest
}: {
  children: React.ReactNode;
  scroll?: boolean;
  edges?: ('top' | 'bottom')[];
  contentStyle?: ViewStyle;
} & ScrollViewProps) {
  const inner = (
    <View style={[styles.screenInner, contentStyle]}>{children}</View>
  );
  return (
    <SafeAreaView style={styles.screen} edges={edges}>
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          {...rest}
        >
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}

/* ---------- Card ---------- */

export function Card({
  children,
  style,
  elevated,
  dark,
  ...rest
}: { children: React.ReactNode; elevated?: boolean; dark?: boolean } & ViewProps) {
  return (
    <View
      style={[
        styles.card,
        dark && styles.cardDark,
        elevated && shadow.card,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

/* ---------- Pill / Tag ---------- */

export function Pill({ label, dark }: { label: string; dark?: boolean }) {
  return (
    <View style={[styles.pill, dark && { backgroundColor: colors.ink }]}>
      <Text style={[styles.pillText, dark && { color: colors.white }]}>{label}</Text>
    </View>
  );
}

/* ---------- Divider ---------- */

export function Divider({ style }: { style?: ViewStyle }) {
  return <View style={[styles.divider, style]} />;
}

/* ---------- Section header ---------- */

export function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={type.overline}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/* ---------- Icon button (circular) ---------- */

export function IconButton({
  icon,
  onPress,
  variant = 'surface',
  size = 44,
}: {
  icon: BiName;
  onPress?: () => void;
  variant?: 'surface' | 'dark' | 'ghost';
  size?: number;
}) {
  const bg =
    variant === 'dark' ? colors.ink : variant === 'ghost' ? 'transparent' : colors.surface;
  const fg = variant === 'dark' ? colors.white : colors.ink;
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress?.();
      }}
      style={({ pressed }) => [
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
        },
        pressed && { opacity: 0.7 },
      ]}
    >
      <Icon name={icon} size={size * 0.46} color={fg} />
    </Pressable>
  );
}

/* ---------- Selectable option row (onboarding) ---------- */

export function OptionRow({
  label,
  description,
  selected,
  onPress,
  icon,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
  icon?: BiName;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      style={({ pressed }) => [
        styles.option,
        selected && styles.optionSelected,
        pressed && { opacity: 0.9 },
      ]}
    >
      {icon ? (
        <View style={[styles.optionIcon, selected && { backgroundColor: colors.white }]}>
          <Icon name={icon} size={20} color={colors.ink} />
        </View>
      ) : null}
      <View style={{ flex: 1 }}>
        <Text style={[styles.optionLabel, selected && { color: colors.white }]}>{label}</Text>
        {description ? (
          <Text style={[styles.optionDesc, selected && { color: 'rgba(255,255,255,0.7)' }]}>
            {description}
          </Text>
        ) : null}
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected ? <Icon name="check-lg" size={15} color={colors.ink} /> : null}
      </View>
    </Pressable>
  );
}

/* ---------- Progress bar ---------- */

export function ProgressBar({ progress, height = 6 }: { progress: number; height?: number }) {
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <View style={[styles.barTrack, { height, borderRadius: height }]}>
      <View
        style={[
          styles.barFill,
          { width: `${clamped * 100}%`, borderRadius: height },
        ]}
      />
    </View>
  );
}

export { useSafeAreaInsets };

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { flexGrow: 1 },
  screenInner: {
    paddingHorizontal: layout.screenPadding,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  cardDark: { backgroundColor: colors.ink },
  pill: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  pillText: { ...type.caption, color: colors.inkSecondary },
  divider: { height: 1, backgroundColor: colors.line, width: '100%' },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionAction: { ...type.smallStrong, color: colors.ink },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.base,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionSelected: { backgroundColor: colors.ink, borderColor: colors.ink },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.base,
  },
  optionLabel: { ...type.h3, color: colors.ink },
  optionDesc: { ...type.small, color: colors.inkTertiary, marginTop: 2 },
  radio: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: colors.lineStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  radioSelected: { backgroundColor: colors.white, borderColor: colors.white },
  barTrack: { backgroundColor: colors.surfaceSunken, width: '100%', overflow: 'hidden' },
  barFill: { backgroundColor: colors.ink, height: '100%' },
});
