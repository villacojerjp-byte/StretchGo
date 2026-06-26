import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Icon, { BiName } from '../../src/components/Icon';
import Button from '../../src/components/Button';
import PoseArt from '../../src/components/PoseArt';
import { Pill } from '../../src/components/primitives';
import { getRoutine } from '../../src/data/routines';
import { colors, layout, radius, spacing, type } from '../../src/theme';

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : `${s}s`;
}

export default function RoutineDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const routine = getRoutine(id);

  if (!routine) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={[type.body, { padding: spacing.xl }]}>Routine not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.iconBtn}>
          <Icon name="chevron-down" size={22} color={colors.ink} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <PoseArt pose={routine.exercises[1]?.pose ?? 'forwardFold'} size={150} stroke={colors.ink} />
        </View>

        <Text style={styles.category}>{routine.category.toUpperCase()}</Text>
        <Text style={styles.title}>{routine.title}</Text>
        <Text style={styles.subtitle}>{routine.subtitle}</Text>

        <View style={styles.statsRow}>
          <Stat icon="clock" value={`${routine.durationMin} min`} label="Duration" />
          <View style={styles.statDivider} />
          <Stat icon="stack" value={`${routine.exercises.length}`} label="Stretches" />
          <View style={styles.statDivider} />
          <Stat icon="speedometer2" value={routine.level} label="Level" />
        </View>

        <Text style={styles.description}>{routine.description}</Text>

        <View style={styles.focusRow}>
          {routine.focus.map((f) => (
            <Pill key={f} label={f} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>The sequence</Text>
        <View style={styles.sequence}>
          {routine.exercises.map((e, i) => (
            <View key={e.id} style={[styles.exRow, i === routine.exercises.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.exArt}>
                <PoseArt pose={e.pose} size={40} stroke={colors.ink} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.exName}>
                  {e.name}
                  {e.side && e.side !== 'both' ? <Text style={styles.exSide}>  {e.side}</Text> : null}
                </Text>
                <Text style={styles.exTarget}>{e.target}</Text>
              </View>
              <Text style={styles.exTime}>{fmt(e.duration)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label="Begin session"
          icon="play-fill"
          onPress={() => router.replace(`/session/${routine.id}`)}
        />
      </View>
    </SafeAreaView>
  );
}

function Stat({ icon, value, label }: { icon: BiName; value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Icon name={icon} size={18} color={colors.inkSecondary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  topBar: { paddingHorizontal: layout.screenPadding, paddingTop: spacing.xs, height: 44, justifyContent: 'center' },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.xl,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  hero: {
    height: 200,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  category: { ...type.overline },
  title: { ...type.display, fontSize: 32, lineHeight: 36, marginTop: spacing.sm },
  subtitle: { ...type.body, marginTop: spacing.xs },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.base,
    marginTop: spacing.lg,
  },
  stat: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: { ...type.h3, color: colors.ink },
  statLabel: { ...type.caption, color: colors.inkTertiary },
  statDivider: { width: 1, height: 36, backgroundColor: colors.line },
  description: { ...type.body, marginTop: spacing.lg, fontSize: 16, lineHeight: 24 },
  focusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  sectionTitle: { ...type.h2, marginTop: spacing.xxl, marginBottom: spacing.sm },
  sequence: {},
  exRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  exArt: {
    width: 52, height: 52, borderRadius: radius.sm, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  exName: { ...type.bodyStrong, color: colors.ink },
  exSide: { ...type.caption, color: colors.inkTertiary, textTransform: 'capitalize' },
  exTarget: { ...type.small, color: colors.inkTertiary, marginTop: 1 },
  exTime: { ...type.smallStrong, color: colors.inkSecondary },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
});
