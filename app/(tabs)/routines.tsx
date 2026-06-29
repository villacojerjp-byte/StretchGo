import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Screen } from '../../src/components/primitives';
import { RoutineRow } from '../../src/components/RoutineCard';
import { ROUTINES, CATEGORIES, Category, routineSeconds } from '../../src/data/routines';
import { colors, radius, spacing, type } from '../../src/theme';

type Filter = 'All' | Category;

export default function RoutinesScreen() {
  const [filter, setFilter] = useState<Filter>('All');
  const filters: Filter[] = ['All', ...CATEGORIES.map((c) => c.key)];
  const list = filter === 'All' ? ROUTINES : ROUTINES.filter((r) => r.category === filter);

  const totalMin = Math.round(ROUTINES.reduce((s, r) => s + routineSeconds(r), 0) / 60);

  return (
    <Screen edges={['top']} contentStyle={{ paddingBottom: spacing.huge }}>
      <View style={styles.header}>
        <Text style={styles.title}>Routines</Text>
        <Text style={styles.subtitle}>
          {ROUTINES.length} guided sessions · {totalMin} minutes of stretching
        </Text>
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        style={styles.chipScroll}
      >
        {filters.map((f) => {
          const active = filter === f;
          return (
            <Pressable
              key={f}
              onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                setFilter(f);
              }}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{f}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* List */}
      <View style={styles.list}>
        {list.map((r, i) => (
          <View key={r.id}>
            <RoutineRow routine={r} />
            {i < list.length - 1 ? <View style={styles.sep} /> : null}
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing.base, paddingBottom: spacing.base },
  title: { ...type.display, fontSize: 36 },
  subtitle: { ...type.small, color: colors.inkTertiary, marginTop: spacing.xs },
  chipScroll: { marginHorizontal: -22 },
  chips: { paddingHorizontal: 22, gap: spacing.sm, paddingVertical: spacing.sm },
  chip: {
    paddingHorizontal: 18,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: { backgroundColor: colors.rose },
  chipText: { ...type.smallStrong, color: colors.inkSecondary },
  chipTextActive: { color: colors.white },
  list: { marginTop: spacing.sm },
  sep: { height: 1, backgroundColor: colors.line },
});
