import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from './Icon';
import { router } from 'expo-router';
import { colors, layout, spacing, type } from '../theme';
import Button from './Button';

/** Shared chrome for every onboarding step: progress dots, back, title, CTA. */
export default function StepScaffold({
  step,
  total,
  title,
  subtitle,
  children,
  ctaLabel = 'Continue',
  onContinue,
  continueDisabled,
  canGoBack = true,
  footer,
}: {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  ctaLabel?: string;
  onContinue: () => void;
  continueDisabled?: boolean;
  canGoBack?: boolean;
  footer?: React.ReactNode;
}) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        {canGoBack && router.canGoBack() ? (
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
            <Icon name="chevron-left" size={22} color={colors.ink} />
          </Pressable>
        ) : (
          <View style={styles.back} />
        )}
        <View style={styles.progressTrack}>
          {Array.from({ length: total }).map((_, i) => (
            <View
              key={i}
              style={[styles.segment, i < step ? styles.segmentOn : styles.segmentOff]}
            />
          ))}
        </View>
        <View style={styles.back} />
      </View>

      <View style={styles.body}>
        <Text style={styles.stepLabel}>STEP {step} OF {total}</Text>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <View style={{ height: spacing.xl }} />
        {children}
      </View>

      <View style={styles.footer}>
        {footer}
        <Button label={ctaLabel} onPress={onContinue} disabled={continueDisabled} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  back: { width: 28, alignItems: 'flex-start' },
  progressTrack: { flex: 1, flexDirection: 'row', gap: 6, alignItems: 'center' },
  segment: { flex: 1, height: 4, borderRadius: 2 },
  segmentOn: { backgroundColor: colors.ink },
  segmentOff: { backgroundColor: colors.surfaceSunken },
  body: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.xxl,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  stepLabel: { ...type.overline, marginBottom: spacing.md },
  title: { ...type.title },
  subtitle: { ...type.body, marginTop: spacing.md },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
});
