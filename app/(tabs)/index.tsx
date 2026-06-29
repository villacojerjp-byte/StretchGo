import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Icon from '../../src/components/Icon';
import Ornament from '../../src/components/Ornament';
import { Screen, SectionHeader, Card } from '../../src/components/primitives';
import { FeaturedRoutineCard } from '../../src/components/RoutineCard';
import { useStore, WATER_GOAL } from '../../src/store/store';
import { ROUTINES, getRoutine, Routine } from '../../src/data/routines';
import { DAILY_PROMISES } from '../../src/data/promises';
import { greeting, prettyToday } from '../../src/utils/date';
import { colors, radius, spacing, type, PASTELS, fonts } from '../../src/theme';

const GOAL_TO_ROUTINE: Record<string, string> = {
  splits: 'r_front_splits',
  flexibility: 'r_full_flex',
  pain: 'r_lower_back',
  relax: 'r_evening_unwind',
  posture: 'r_posture_reset',
};

export default function TodayScreen() {
  const { state, today, streak, toggleTask, setWater } = useStore();
  const now = new Date();
  const hour = now.getHours();

  const dailyRoutine: Routine = useMemo(() => {
    const id = state.profile ? GOAL_TO_ROUTINE[state.profile.goal] : undefined;
    return (id && getRoutine(id)) || ROUTINES[2];
  }, [state.profile]);

  const sessionDone = today.routineIds.length > 0;
  const waterDone = today.water >= WATER_GOAL;

  const isPromiseDone = (id: string) => {
    if (id === 'p_stretch') return sessionDone;
    if (id === 'p_water') return waterDone;
    return today.tasks.includes(id);
  };
  const doneCount = DAILY_PROMISES.filter((p) => isPromiseDone(p.id)).length;

  const onPromise = (id: string) => {
    if (id === 'p_stretch') {
      router.push(`/routine/${dailyRoutine.id}`);
      return;
    }
    if (id === 'p_water') {
      setWater(waterDone ? 0 : WATER_GOAL);
      Haptics.selectionAsync().catch(() => {});
      return;
    }
    Haptics.selectionAsync().catch(() => {});
    toggleTask(id);
  };

  const quickPicks = ROUTINES.filter((r) => r.id !== dailyRoutine.id).slice(0, 4);

  return (
    <Screen edges={['top']} contentStyle={{ paddingBottom: spacing.huge }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>{greeting(hour)}</Text>
          <Text style={styles.date}>{prettyToday(now)}</Text>
        </View>
        <Pressable style={styles.streakChip} onPress={() => router.push('/(tabs)/progress')}>
          <Icon name="fire" size={15} color={colors.white} />
          <Text style={styles.streakText}>{streak}</Text>
        </Pressable>
      </View>

      {/* Featured today routine */}
      <FeaturedRoutineCard routine={dailyRoutine} />

      {/* Daily promises (Her 75 style) */}
      <View style={styles.block}>
        <SectionHeader title="Today’s promises" />
        <Card style={{ padding: spacing.xs }}>
          <View style={styles.promiseHeader}>
            <Text style={styles.promiseCount}>
              {doneCount}<Text style={styles.promiseCountTotal}> / {DAILY_PROMISES.length}</Text>
            </Text>
            <Text style={styles.promiseHint}>
              {doneCount === DAILY_PROMISES.length ? 'All done — beautiful work.' : 'Small steps, every day.'}
            </Text>
          </View>
          {DAILY_PROMISES.map((p, i) => {
            const done = isPromiseDone(p.id);
            const pastel = PASTELS[i % PASTELS.length];
            return (
              <Pressable
                key={p.id}
                onPress={() => onPromise(p.id)}
                style={[styles.promiseRow, i === DAILY_PROMISES.length - 1 && { borderBottomWidth: 0 }]}
              >
                <View style={[styles.numTile, { backgroundColor: pastel.bg }]}>
                  <Text style={[styles.numText, { color: pastel.ink }]}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.promiseTitle, done && styles.promiseTitleDone]}>{p.title}</Text>
                  <Text style={styles.promiseDetail}>{p.detail}</Text>
                </View>
                <View style={[styles.checkCircle, done && styles.checkCircleOn]}>
                  {done ? <Icon name="check-lg" size={15} color={colors.white} /> : null}
                </View>
              </Pressable>
            );
          })}
        </Card>
      </View>

      {/* Water tracker */}
      <View style={styles.block}>
        <SectionHeader title="Hydration" action={`${today.water}/${WATER_GOAL} cups`} />
        <Card>
          <View style={styles.waterRow}>
            {Array.from({ length: WATER_GOAL }).map((_, i) => {
              const filled = i < today.water;
              return (
                <Pressable
                  key={i}
                  onPress={() => {
                    Haptics.selectionAsync().catch(() => {});
                    setWater(i + 1 === today.water ? i : i + 1);
                  }}
                  style={[styles.cup, filled && styles.cupFilled]}
                >
                  <Icon
                    name="droplet-fill"
                    size={17}
                    color={filled ? colors.white : colors.inkFaint}
                  />
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.waterHint}>Tap a cup to log your water through the day.</Text>
        </Card>
      </View>

      {/* Quick picks */}
      <View style={styles.block}>
        <SectionHeader title="Quick stretches" action="See all" onAction={() => router.push('/(tabs)/routines')} />
        {quickPicks.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => router.push(`/routine/${r.id}`)}
            style={styles.quickRow}
          >
            <View style={styles.quickBadge}>
              <Text style={styles.quickMin}>{r.durationMin}</Text>
              <Text style={styles.quickMinLabel}>min</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.quickTitle} numberOfLines={1}>{r.title}</Text>
              <Text style={styles.quickSub}>{r.category} · {r.level}</Text>
            </View>
            <Icon name="chevron-right" size={18} color={colors.inkFaint} />
          </Pressable>
        ))}
      </View>

      <View style={styles.closing}>
        <Ornament icon="flower1" color={colors.rose} />
        <Text style={styles.closingText}>
          Move gently. Breathe <Text style={styles.closingItalic}>deeply.</Text>
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.base,
    paddingBottom: spacing.lg,
  },
  greeting: { ...type.title, fontSize: 26 },
  date: { ...type.small, color: colors.inkTertiary, marginTop: 2 },
  streakChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.rose,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    height: 38,
  },
  streakText: { ...type.smallStrong, color: colors.white, fontSize: 15 },

  block: { marginTop: spacing.xl },

  promiseHeader: { paddingHorizontal: spacing.base, paddingTop: spacing.md, paddingBottom: spacing.sm },
  promiseCount: { ...type.title, fontSize: 30 },
  promiseCountTotal: { ...type.h3, color: colors.inkFaint },
  promiseHint: { ...type.small, color: colors.inkTertiary, marginTop: 2 },
  promiseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  numTile: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: { fontFamily: fonts.displayBold, fontSize: 21, lineHeight: 23 },
  checkCircle: {
    width: 27,
    height: 27,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.lineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleOn: { backgroundColor: colors.ink, borderColor: colors.ink },
  promiseTitle: { ...type.bodyStrong, color: colors.ink },
  promiseTitleDone: { color: colors.inkTertiary, textDecorationLine: 'line-through' },
  promiseDetail: { ...type.caption, color: colors.inkTertiary, marginTop: 1 },

  waterRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 6 },
  cup: {
    flex: 1,
    aspectRatio: 0.8,
    borderRadius: 10,
    backgroundColor: colors.bg,
    borderWidth: 1.5,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cupFilled: { backgroundColor: '#B9A3DE', borderColor: '#B9A3DE' },
  waterHint: { ...type.caption, color: colors.inkTertiary, marginTop: spacing.md },

  quickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  quickBadge: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickMin: { ...type.h2, color: colors.ink, fontSize: 22 },
  quickMinLabel: { ...type.caption, color: colors.inkTertiary, marginTop: -2 },
  quickTitle: { ...type.h3, color: colors.ink },
  quickSub: { ...type.small, color: colors.inkTertiary, marginTop: 2 },

  closing: { alignItems: 'center', marginTop: spacing.xxl, gap: spacing.md },
  closingText: { ...type.serif, color: colors.inkSecondary, fontSize: 18, textAlign: 'center' },
  closingItalic: { fontFamily: fonts.displaySemiItalic, color: colors.rose },
});
