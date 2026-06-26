import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../src/components/Icon';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import ProgressRing from '../../src/components/ProgressRing';
import PoseArt from '../../src/components/PoseArt';
import Button from '../../src/components/Button';
import { ProgressBar } from '../../src/components/primitives';
import { getRoutine } from '../../src/data/routines';
import { useStore } from '../../src/store/store';
import { colors, layout, radius, spacing, type } from '../../src/theme';

const PREP_SECONDS = 3;

export default function SessionPlayer() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const routine = getRoutine(id);
  const { logSession } = useStore();

  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(routine?.exercises[0]?.duration ?? 0);
  const [running, setRunning] = useState(true);
  const [prepLeft, setPrepLeft] = useState(PREP_SECONDS);
  const [finished, setFinished] = useState(false);
  const logged = useRef(false);

  const total = routine?.exercises.length ?? 0;
  const current = routine?.exercises[index];

  // Prep countdown (3..2..1) before the very first exercise.
  useEffect(() => {
    if (!routine || prepLeft <= 0) return;
    const t = setTimeout(() => {
      setPrepLeft((p) => p - 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }, 1000);
    return () => clearTimeout(t);
  }, [prepLeft, routine]);

  const advance = useCallback(() => {
    if (!routine) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
    if (index + 1 < total) {
      const next = index + 1;
      setIndex(next);
      setSecondsLeft(routine.exercises[next].duration);
    } else {
      setFinished(true);
    }
  }, [index, routine, total]);

  // Main per-second timer.
  useEffect(() => {
    if (!routine || finished || prepLeft > 0 || !running) return;
    if (secondsLeft <= 0) {
      advance();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, running, finished, prepLeft, routine, advance]);

  // Log once on completion.
  useEffect(() => {
    if (finished && routine && !logged.current) {
      logged.current = true;
      logSession(routine.id, routine.durationMin);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
  }, [finished, routine, logSession]);

  if (!routine || !current) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={[type.body, { padding: spacing.xl }]}>Session not found.</Text>
      </SafeAreaView>
    );
  }

  if (finished) {
    return <Completion routineTitle={routine.title} minutes={routine.durationMin} count={total} />;
  }

  const prepping = prepLeft > 0;
  const ringProgress = prepping ? 1 - prepLeft / PREP_SECONDS : secondsLeft / current.duration;
  const overall = (index + (prepping ? 0 : 1 - secondsLeft / current.duration)) / total;

  const goPrev = () => {
    if (index === 0) {
      setSecondsLeft(current.duration);
      return;
    }
    const prev = index - 1;
    setIndex(prev);
    setSecondsLeft(routine.exercises[prev].duration);
    Haptics.selectionAsync().catch(() => {});
  };

  const goNext = () => {
    setSecondsLeft(0);
    advance();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.iconBtn}>
          <Icon name="x-lg" size={18} color={colors.ink} />
        </Pressable>
        <Text style={styles.counter}>
          {index + 1} <Text style={styles.counterTotal}>/ {total}</Text>
        </Text>
        <View style={styles.iconBtn} />
      </View>
      <View style={styles.progressWrap}>
        <ProgressBar progress={overall} />
      </View>

      {/* Pose stage */}
      <View style={styles.stage}>
        <View style={styles.poseBox}>
          <PoseArt pose={current.pose} size={210} stroke={colors.ink} />
        </View>
      </View>

      {/* Timer + info */}
      <View style={styles.info}>
        <Text style={styles.target}>{current.target.toUpperCase()}</Text>
        <Text style={styles.poseName}>
          {current.name}
          {current.side && current.side !== 'both' ? (
            <Text style={styles.side}>  ·  {current.side}</Text>
          ) : null}
        </Text>

        <View style={styles.ringWrap}>
          <ProgressRing progress={ringProgress} size={170} stroke={12}>
            {prepping ? (
              <>
                <Text style={styles.getReady}>GET READY</Text>
                <Text style={styles.prepNum}>{prepLeft}</Text>
              </>
            ) : (
              <>
                <Text style={styles.timer}>{secondsLeft}</Text>
                <Text style={styles.timerUnit}>seconds</Text>
              </>
            )}
          </ProgressRing>
        </View>

        <Text style={styles.cue}>{current.cue}</Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Pressable onPress={goPrev} style={styles.ctrlSmall}>
          <Icon name="skip-start-fill" size={22} color={colors.ink} />
        </Pressable>
        <Pressable
          onPress={() => {
            setRunning((r) => !r);
            Haptics.selectionAsync().catch(() => {});
          }}
          style={styles.ctrlMain}
        >
          <Icon name={running ? 'pause-fill' : 'play-fill'} size={28} color={colors.white} />
        </Pressable>
        <Pressable onPress={goNext} style={styles.ctrlSmall}>
          <Icon name="skip-end-fill" size={22} color={colors.ink} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function Completion({ routineTitle, minutes, count }: { routineTitle: string; minutes: number; count: number }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.doneWrap}>
        <View style={styles.doneArt}>
          <PoseArt pose="childPose" size={150} stroke={colors.ink} />
        </View>
        <Text style={styles.doneKicker}>SESSION COMPLETE</Text>
        <Text style={styles.doneTitle}>Beautifully done.</Text>
        <Text style={styles.doneSub}>
          You finished {routineTitle}. Take a breath and notice how your body feels.
        </Text>

        <View style={styles.doneStats}>
          <View style={styles.doneStat}>
            <Text style={styles.doneStatValue}>{minutes}</Text>
            <Text style={styles.doneStatLabel}>minutes</Text>
          </View>
          <View style={styles.doneDivider} />
          <View style={styles.doneStat}>
            <Text style={styles.doneStatValue}>{count}</Text>
            <Text style={styles.doneStatLabel}>stretches</Text>
          </View>
          <View style={styles.doneDivider} />
          <View style={styles.doneStat}>
            <Text style={styles.doneStatValue}>+1</Text>
            <Text style={styles.doneStatLabel}>session</Text>
          </View>
        </View>
      </View>
      <View style={styles.doneFooter}>
        <Button label="Done" onPress={() => router.replace('/(tabs)')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.xs,
  },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  counter: { ...type.h3, color: colors.ink },
  counterTotal: { ...type.h3, color: colors.inkFaint },
  progressWrap: { paddingHorizontal: layout.screenPadding, marginTop: spacing.md },

  stage: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: layout.screenPadding },
  poseBox: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    aspectRatio: 1.25,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: { alignItems: 'center', paddingHorizontal: layout.screenPadding },
  target: { ...type.overline, marginBottom: 4 },
  poseName: { ...type.title, fontSize: 26, textAlign: 'center' },
  side: { ...type.h3, color: colors.inkTertiary, textTransform: 'capitalize' },
  ringWrap: { marginTop: spacing.lg, marginBottom: spacing.base },
  timer: { ...type.hero, fontSize: 58, lineHeight: 58 },
  timerUnit: { ...type.overline, marginTop: 2 },
  getReady: { ...type.overline, marginBottom: 2 },
  prepNum: { ...type.hero, fontSize: 52, lineHeight: 54 },
  cue: { ...type.body, textAlign: 'center', minHeight: 48, paddingHorizontal: spacing.sm },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
    paddingVertical: spacing.lg,
  },
  ctrlSmall: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  ctrlMain: {
    width: 76, height: 76, borderRadius: 38, backgroundColor: colors.ink,
    alignItems: 'center', justifyContent: 'center',
  },

  doneWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: layout.screenPadding },
  doneArt: {
    width: 200, height: 200, borderRadius: 100, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl,
  },
  doneKicker: { ...type.overline, letterSpacing: 3 },
  doneTitle: { ...type.display, fontSize: 36, marginTop: spacing.sm },
  doneSub: { ...type.body, textAlign: 'center', marginTop: spacing.md, paddingHorizontal: spacing.md },
  doneStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.xxl,
    alignSelf: 'stretch',
  },
  doneStat: { flex: 1, alignItems: 'center', gap: 2 },
  doneStatValue: { ...type.title, fontSize: 28 },
  doneStatLabel: { ...type.caption, color: colors.inkTertiary },
  doneDivider: { width: 1, height: 40, backgroundColor: colors.line },
  doneFooter: {
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.sm,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
});
