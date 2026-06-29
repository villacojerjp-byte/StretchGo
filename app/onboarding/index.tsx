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
  { icon: 'arrows-angle-expand', text: 'Splits, oversplits & straddles' },
  { icon: 'flower2', text: 'Backbends, bridges & shoulders' },
  { icon: 'stopwatch', text: 'Follow-along timers & form cues' },
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
        <Text style={styles.brand}>FLEXA · GYMNASTICS FLEXIBILITY</Text>
        <Ornament icon="flower1" color={colors.rose} />
        <Text style={styles.title}>
          Master your <Text style={styles.titleItalic}>splits</Text> &amp; backbends.
        </Text>
        <Text style={styles.subtitle}>
          Guided flexibility training for gymnasts, dancers &amp; cheerleaders — progress your
          splits and backbends, step by step.
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
        <Button label="Start training" onPress={() => router.push('/onboarding/goal')} iconRight="arrow-right" />
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
  brand: { ...type.overline, letterSpacing: 2, textAlign: 'center', marginBottom: spacing.md, color: colors.rose },
  title: {
    ...type.display,
    fontSize: 29,
    lineHeight: 34,
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
