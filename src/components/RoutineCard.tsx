import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Icon from './Icon';
import PoseImage from './PoseImage';
import { colors, radius, shadow, spacing, type } from '../theme';
import { Routine } from '../data/routines';
import { ROUTINE_IMAGES } from '../data/poseImages';

function heroPose(routine: Routine) {
  return routine.exercises[1]?.pose ?? routine.exercises[0]?.pose ?? 'forwardFold';
}

/** Large featured card — full-bleed model photo with a soft gradient. */
export function FeaturedRoutineCard({ routine }: { routine: Routine }) {
  return (
    <Pressable
      onPress={() => router.push(`/routine/${routine.id}`)}
      style={({ pressed }) => [styles.featured, shadow.card, pressed && styles.pressed]}
    >
      <PoseImage pose={heroPose(routine)} source={ROUTINE_IMAGES[routine.id]} style={StyleSheet.absoluteFill} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.88)']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.featuredBody}>
        <Text style={styles.featuredOverline}>TODAY’S RITUAL</Text>
        <Text style={styles.featuredTitle}>{routine.title}</Text>
        <View style={styles.metaRow}>
          <Icon name="clock" size={13} color="rgba(255,255,255,0.85)" />
          <Text style={styles.featuredMeta}>{routine.durationMin} min</Text>
          <View style={styles.dot} />
          <Text style={styles.featuredMeta}>{routine.exercises.length} stretches</Text>
        </View>
        <View style={styles.startBtn}>
          <Text style={styles.startText}>Begin session</Text>
          <Icon name="arrow-right" size={15} color={colors.ink} />
        </View>
      </View>
    </Pressable>
  );
}

/** Compact horizontal list row with a rounded photo thumbnail. */
export function RoutineRow({ routine }: { routine: Routine }) {
  return (
    <Pressable
      onPress={() => router.push(`/routine/${routine.id}`)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <PoseImage pose={heroPose(routine)} source={ROUTINE_IMAGES[routine.id]} style={styles.rowArt} resizeMode="cover" />
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

/** Square tile for horizontal carousels. */
export function RoutineTile({ routine }: { routine: Routine }) {
  return (
    <Pressable
      onPress={() => router.push(`/routine/${routine.id}`)}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <PoseImage pose={heroPose(routine)} source={ROUTINE_IMAGES[routine.id]} style={styles.tileArt} resizeMode="cover" />
      <Text style={styles.tileCat}>{routine.category}</Text>
      <Text style={styles.tileTitle} numberOfLines={2}>
        {routine.title}
      </Text>
      <Text style={styles.tileMeta}>{routine.durationMin} min</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.95, transform: [{ scale: 0.99 }] },

  featured: {
    height: 300,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: colors.surfaceSunken,
    justifyContent: 'flex-end',
  },
  featuredBody: { padding: spacing.xl },
  featuredOverline: {
    ...type.overline,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 8,
  },
  featuredTitle: { ...type.title, fontFamily: 'Fraunces_700Bold', color: colors.white, fontSize: 30, lineHeight: 33 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  featuredMeta: { ...type.small, color: 'rgba(255,255,255,0.85)', marginLeft: 5 },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.5)', marginHorizontal: 8 },
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingVertical: 11,
    paddingHorizontal: 18,
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
    width: 66,
    height: 66,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
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
    height: 120,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    marginBottom: spacing.md,
  },
  tileCat: { ...type.overline, fontSize: 10, color: colors.inkTertiary, marginBottom: 4 },
  tileTitle: { ...type.h3, color: colors.ink, minHeight: 44 },
  tileMeta: { ...type.small, color: colors.inkTertiary, marginTop: 4 },
});
