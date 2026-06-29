import React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Icon from '../../src/components/Icon';
import Ornament from '../../src/components/Ornament';
import Button from '../../src/components/Button';
import { HERO_IMAGE } from '../../src/data/poseImages';
import { colors, layout, spacing, type, fonts } from '../../src/theme';

const HIGHLIGHTS = [
  { icon: 'flower1', text: 'Guided routines for every level' },
  { icon: 'stopwatch', text: 'Follow-along timers, no thinking' },
  { icon: 'graph-up-arrow', text: 'Build flexibility you can feel' },
] as const;

export default function Welcome() {
  const { height } = useWindowDimensions();
  // Fixed pixel height resolves reliably on web (percentage heights don't).
  const heroH = Math.round(Math.max(240, Math.min(height * 0.42, 440)));

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={[styles.hero, { height: heroH }]}>
        <Image source={HERO_IMAGE} style={styles.heroImg} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(0,0,0,0.12)', 'rgba(255,255,255,0)', colors.bg]}
          locations={[0, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.brand}>STRETCH</Text>
        <Ornament icon="flower1" color={colors.rose} />
        <Text style={styles.title}>
          Your daily <Text style={styles.titleItalic}>ritual</Text> for a softer, more flexible body.
        </Text>
        <Text style={styles.subtitle}>
          Calm, guided stretching shaped around you — five mindful minutes at a time.
        </Text>

        <View style={styles.list}>
          {HIGHLIGHTS.map((h) => (
            <View key={h.text} style={styles.listItem}>
              <View style={styles.listIcon}>
                <Icon name={h.icon} size={16} color={colors.ink} />
              </View>
              <Text style={styles.listText}>{h.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button label="Begin your ritual" onPress={() => router.push('/onboarding/goal')} iconRight="arrow-right" />
        <Text style={styles.fine}>Takes about a minute · No account needed</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  hero: { width: '100%', backgroundColor: colors.surfaceSunken, overflow: 'hidden' },
  heroImg: { width: '100%', height: '100%' },
  content: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: layout.screenPadding,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingTop: spacing.lg,
  },
  brand: { ...type.overline, letterSpacing: 5, textAlign: 'center', marginBottom: spacing.md },
  title: {
    ...type.display,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    marginTop: spacing.base,
  },
  titleItalic: { fontFamily: fonts.displayItalic, color: colors.rose },
  subtitle: { ...type.body, marginTop: spacing.md, fontSize: 15, lineHeight: 22, textAlign: 'center' },
  list: { marginTop: spacing.lg, gap: spacing.md, alignSelf: 'center' },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  listIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listText: { ...type.bodyStrong, color: colors.ink },
  footer: {
    backgroundColor: colors.bg,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.base,
    paddingBottom: spacing.sm,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  fine: { ...type.caption, textAlign: 'center', marginTop: spacing.base },
});
