import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Icon from './Icon';
import { colors, radius, shadow, spacing, type } from '../theme';
import { Routine } from '../data/routines';
import PoseArt from './PoseArt';

/** Large featured card — used for the hero "today" routine. */
export function FeaturedRoutineCard({ routine }: { routine: Routine }) {
  return (
    <Pressable
      onPress={() => router.push(`/routine/${routine.id}`)}
      style={({ pressed }) => [styles.featured, shadow.card, pressed && styles.pressed]}
    >
      <View style={styles.featuredArt}>
        <PoseArt pose={routine.exercises[1]?.pose ?? 'forwardFold'} size={132} stroke={colors.white} />
      </View>
      <View style={styles.featuredBody}>
        <Text style={styles.featuredOverline}>TODAY’S ROUTINE</Text>
        <Text style={styles.featuredTitle}>{routine.title}</Text>
        <View style={styles.metaRow}>
          <Icon name="clock" size={14} color="rgba(255,255,255,0.7)" />
          <Text style={styles.featuredMeta}>{routine.durationMin} min</Text>
          <View style={styles.dot} />
          <Text style={styles.featuredMeta}>{routine.exercises.length} stretches</Text>
        </View>
        <View style={styles.startBtn}>
          <Text style={styles.startText}>Begin session</Text>
          <Icon name="arrow-right" size={16} color={colors.ink} />
        </View>
      </View>
    </Pressable>
  );
}

/** Compact horizontal list row. */
export function RoutineRow({ routine }: { routine: Routine }) {
  return (
    <Pressable
      onPress={() => router.push(`/routine/${routine.id}`)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.rowArt}>
        <PoseArt pose={routine.exercises[1]?.pose ?? 'forwardFold'} size={56} stroke={colors.ink} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle} numberOfLines={1}>
          {routine.title}
        </Text>
        <Text style={styles.rowSub} numberOfLines={1}>
          {routine.level} · {routine.durationMin} min
        </Text>
      </View>
      <Icon name="chevron-right" size={18} color={colors.inkFaint} />
    </Pressable>
  );
}

/** Square tile for grid/horizontal carousels. */
export function RoutineTile({ routine }: { routine: Routine }) {
  return (
    <Pressable
      onPress={() => router.push(`/routine/${routine.id}`)}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View style={styles.tileArt}>
        <PoseArt pose={routine.exercises[1]?.pose ?? 'forwardFold'} size={88} stroke={colors.ink} />
      </View>
      <Text style={styles.tileCat}>{routine.category}</Text>
      <Text style={styles.tileTitle} numberOfLines={2}>
        {routine.title}
      </Text>
      <Text style={styles.tileMeta}>{routine.durationMin} min</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },

  featured: {
    backgroundColor: colors.ink,
    borderRadius: radius.xl,
    overflow: 'hidden',
    flexDirection: 'row',
    minHeight: 188,
  },
  featuredArt: {
    width: 132,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161616',
  },
  featuredBody: { flex: 1, padding: spacing.lg, justifyContent: 'center' },
  featuredOverline: {
    ...type.overline,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 6,
  },
  featuredTitle: { ...type.title, color: colors.white, fontSize: 24, lineHeight: 28 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  featuredMeta: { ...type.small, color: 'rgba(255,255,255,0.7)', marginLeft: 5 },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: 8 },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: spacing.base,
    gap: 6,
  },
  startText: { ...type.button, color: colors.ink, fontSize: 14 },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  rowArt: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.base,
  },
  rowTitle: { ...type.h3, color: colors.ink },
  rowSub: { ...type.small, color: colors.inkTertiary, marginTop: 2 },

  tile: {
    width: 168,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginRight: spacing.md,
  },
  tileArt: {
    height: 96,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  tileCat: { ...type.overline, fontSize: 10, color: colors.inkTertiary, marginBottom: 4 },
  tileTitle: { ...type.h3, color: colors.ink, minHeight: 44 },
  tileMeta: { ...type.small, color: colors.inkTertiary, marginTop: 4 },
});
