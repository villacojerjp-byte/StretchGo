import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon, { BiName } from '../../src/components/Icon';
import { Screen, SectionHeader, Card } from '../../src/components/primitives';
import { useStore } from '../../src/store/store';
import { lastSevenDays, toKey, addDays } from '../../src/utils/date';
import { colors, radius, spacing, type, shadow } from '../../src/theme';

export default function ProgressScreen() {
  const { state, streak } = useStore();

  const week = useMemo(() => {
    return lastSevenDays().map((d) => {
      const log = state.logs[d.key];
      return { ...d, active: !!log && (log.routineIds.length > 0 || log.tasks.length > 0) };
    });
  }, [state.logs]);

  // 28-day consistency grid (4 weeks).
  const grid = useMemo(() => {
    const out: { key: string; active: boolean }[] = [];
    for (let i = 27; i >= 0; i--) {
      const key = toKey(addDays(new Date(), -i));
      const log = state.logs[key];
      out.push({ key, active: !!log && (log.routineIds.length > 0 || log.tasks.length > 0) });
    }
    return out;
  }, [state.logs]);

  const activeDays = Object.values(state.logs).filter(
    (l) => l.routineIds.length > 0 || l.tasks.length > 0,
  ).length;
  const totalWater = Object.values(state.logs).reduce((s, l) => s + l.water, 0);

  return (
    <Screen edges={['top']} contentStyle={{ paddingBottom: spacing.huge }}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>Consistency beats intensity.</Text>
      </View>

      {/* Streak hero */}
      <View style={[styles.streakCard, shadow.card]}>
        <LinearGradient
          colors={[colors.rose, colors.roseDeep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.streakFlame}>
          <Icon name="fire" size={24} color={colors.roseDeep} />
        </View>
        <Text style={styles.streakNum}>{streak}</Text>
        <Text style={styles.streakLabel}>day streak</Text>
        <View style={styles.weekStrip}>
          {week.map((d, i) => (
            <View key={i} style={styles.weekDay}>
              <View style={[styles.weekDot, d.active && styles.weekDotOn]}>
                {d.active ? <Icon name="check-lg" size={13} color={colors.roseDeep} /> : null}
              </View>
              <Text style={styles.weekLabel}>{d.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stats grid */}
      <View style={styles.statsGrid}>
        <StatCard icon="clock" value={`${state.totalMinutes}`} label="Total minutes" />
        <StatCard icon="check2-all" value={`${state.sessions}`} label="Sessions" />
        <StatCard icon="calendar3" value={`${activeDays}`} label="Active days" />
        <StatCard icon="droplet" value={`${totalWater}`} label="Cups of water" />
      </View>

      {/* Consistency grid */}
      <View style={styles.block}>
        <SectionHeader title="Last 28 days" />
        <Card>
          <View style={styles.grid}>
            {grid.map((g) => (
              <View key={g.key} style={[styles.cell, g.active && styles.cellOn]} />
            ))}
          </View>
          <View style={styles.legend}>
            <Text style={styles.legendText}>Less</Text>
            <View style={[styles.cell, styles.legendCell]} />
            <View style={[styles.cell, styles.legendCell, styles.cellOn]} />
            <Text style={styles.legendText}>More</Text>
          </View>
        </Card>
      </View>
    </Screen>
  );
}

function StatCard({ icon, value, label }: { icon: BiName; value: string; label: string }) {
  return (
    <Card style={styles.statCard}>
      <Icon name={icon} size={20} color={colors.rose} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing.base, paddingBottom: spacing.lg },
  title: { ...type.display, fontSize: 36 },
  subtitle: { ...type.small, color: colors.inkTertiary, marginTop: spacing.xs },

  streakCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  streakFlame: {
    width: 52, height: 52, borderRadius: 26, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
  },
  streakNum: { ...type.hero, color: colors.white, fontSize: 64, lineHeight: 64 },
  streakLabel: { ...type.overline, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  weekStrip: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xl },
  weekDay: { alignItems: 'center', gap: 6 },
  weekDot: {
    width: 34, height: 34, borderRadius: 17, borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  weekDotOn: { backgroundColor: colors.white, borderColor: colors.white },
  weekLabel: { ...type.caption, color: 'rgba(255,255,255,0.5)' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.lg },
  statCard: { width: '47.5%', flexGrow: 1, gap: 4 },
  statValue: { ...type.title, fontSize: 30, marginTop: spacing.sm },
  statLabel: { ...type.small, color: colors.inkTertiary },

  block: { marginTop: spacing.xl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  cell: {
    width: `${100 / 7 - 2.5}%`,
    aspectRatio: 1,
    borderRadius: 6,
    backgroundColor: colors.surfaceSunken,
  },
  cellOn: { backgroundColor: colors.rose },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.base, justifyContent: 'flex-end' },
  legendCell: { width: 16, aspectRatio: 1 },
  legendText: { ...type.caption, color: colors.inkTertiary },
});
