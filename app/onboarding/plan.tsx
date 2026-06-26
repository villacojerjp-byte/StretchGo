import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../src/components/Icon';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import ProgressRing from '../../src/components/ProgressRing';
import { useOnboarding } from '../../src/store/onboarding';
import { useStore } from '../../src/store/store';
import { colors, layout, spacing, type } from '../../src/theme';

const STEPS = [
  'Reading your answers',
  'Matching your flexibility level',
  'Selecting your focus areas',
  'Shaping your weekly rhythm',
  'Finalising your plan',
];

export default function PlanStep() {
  const { answers } = useOnboarding();
  const { completeOnboarding } = useStore();
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;
  const done = useRef(false);

  useEffect(() => {
    const id = anim.addListener(({ value }) => setProgress(value));
    Animated.timing(anim, {
      toValue: 1,
      duration: 3600,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !done.current) {
        done.current = true;
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
        completeOnboarding({
          goal: answers.goal,
          level: answers.level || 'Beginner',
          areas: answers.areas,
          frequency: answers.frequency,
          reminderHour: answers.reminderHour,
        });
        router.replace('/paywall');
      }
    });

    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    }, 720);

    return () => {
      anim.removeListener(id);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = Math.round(progress * 100);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.center}>
        <ProgressRing progress={progress} size={188} stroke={14}>
          <Text style={styles.pct}>{pct}</Text>
          <Text style={styles.pctSign}>percent</Text>
        </ProgressRing>

        <Text style={styles.title}>Building your plan</Text>
        <Text style={styles.subtitle}>Personalised to your goal and body</Text>

        <View style={styles.steps}>
          {STEPS.map((s, i) => {
            const active = i <= stepIndex;
            return (
              <View key={s} style={styles.stepRow}>
                <View style={[styles.check, active && styles.checkOn]}>
                  {active ? <Icon name="check-lg" size={13} color={colors.white} /> : null}
                </View>
                <Text style={[styles.stepText, active && styles.stepTextOn]}>{s}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.screenPadding,
  },
  pct: { ...type.hero, fontSize: 56, lineHeight: 56 },
  pctSign: { ...type.overline, marginTop: 2 },
  title: { ...type.title, marginTop: spacing.xxl },
  subtitle: { ...type.body, marginTop: spacing.sm, textAlign: 'center' },
  steps: { marginTop: spacing.xxl, alignSelf: 'stretch', gap: spacing.base, paddingHorizontal: spacing.lg },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.lineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  stepText: { ...type.bodyStrong, color: colors.inkFaint },
  stepTextOn: { color: colors.ink },
});
