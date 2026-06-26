import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Icon from '../../src/components/Icon';
import Button from '../../src/components/Button';
import PoseArt from '../../src/components/PoseArt';
import { colors, layout, spacing, type } from '../../src/theme';

const HIGHLIGHTS = [
  { icon: 'person-arms-up', text: 'Guided routines for every level' },
  { icon: 'stopwatch', text: 'Follow-along timers, no thinking' },
  { icon: 'graph-up-arrow', text: 'Build flexibility you can feel' },
] as const;

export default function Welcome() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.hero}>
        <View style={styles.artRow}>
          <PoseArt pose="splitSlide" size={120} stroke={colors.ink} />
          <PoseArt pose="forwardFold" size={96} stroke={colors.inkFaint} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.brand}>STRETCH</Text>
        <Text style={styles.title}>Your daily ritual for a more flexible body.</Text>
        <Text style={styles.subtitle}>
          Calm, guided stretching built around your goals — five minutes at a time.
        </Text>

        <View style={styles.list}>
          {HIGHLIGHTS.map((h) => (
            <View key={h.text} style={styles.listItem}>
              <View style={styles.listIcon}>
                <Icon name={h.icon} size={18} color={colors.ink} />
              </View>
              <Text style={styles.listText}>{h.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button label="Get started" onPress={() => router.push('/onboarding/goal')} iconRight="arrow-right" />
        <Text style={styles.fine}>Takes about a minute · No account needed</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  artRow: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.lg },
  content: {
    paddingHorizontal: layout.screenPadding,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  brand: { ...type.overline, letterSpacing: 4, marginBottom: spacing.base },
  title: { ...type.display, fontSize: 34, lineHeight: 38 },
  subtitle: { ...type.body, marginTop: spacing.base, fontSize: 17, lineHeight: 25 },
  list: { marginTop: spacing.xl, gap: spacing.md },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  listIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listText: { ...type.bodyStrong, color: colors.ink },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  fine: { ...type.caption, textAlign: 'center', marginTop: spacing.base },
});
