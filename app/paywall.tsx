import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../src/components/Icon';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import Button from '../src/components/Button';
import PoseImage from '../src/components/PoseImage';
import { useStore } from '../src/store/store';
import { colors, layout, radius, spacing, type, fonts } from '../src/theme';

const FEATURES = [
  'Unlimited guided routines',
  'Personalised splits & flexibility plans',
  'Follow-along timers & form cues',
  'Progress tracking and streaks',
  'New routines added every month',
];

type Plan = 'yearly' | 'weekly';

export default function Paywall() {
  const { setPremium } = useStore();
  const [plan, setPlan] = useState<Plan>('yearly');

  const start = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setPremium(true);
    router.replace('/(tabs)');
  };

  const maybeLater = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.closeRow}>
        <Pressable onPress={maybeLater} hitSlop={12} style={styles.close}>
          <Icon name="x-lg" size={18} color={colors.inkTertiary} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.art}>
          <PoseImage pose="splitSlide" style={styles.artImg as any} resizeMode="cover" />
        </View>

        <Text style={styles.kicker}>STRETCH PREMIUM</Text>
        <Text style={styles.title}>
          Unlock your full{'\n'}<Text style={styles.titleItalic}>flexibility journey</Text>
        </Text>

        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f} style={styles.featureRow}>
              <View style={styles.tick}>
                <Icon name="check-lg" size={14} color={colors.white} />
              </View>
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        <PlanOption
          selected={plan === 'yearly'}
          onPress={() => setPlan('yearly')}
          title="Yearly"
          price="$39.99 / year"
          subtitle="Just $3.33 a month"
          badge="Best value · Save 60%"
        />
        <PlanOption
          selected={plan === 'weekly'}
          onPress={() => setPlan('weekly')}
          title="Weekly"
          price="$6.99 / week"
          subtitle="3-day free trial, then billed weekly"
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={plan === 'weekly' ? 'Start 3-day free trial' : 'Continue'}
          onPress={start}
          iconRight="arrow-right"
        />
        <View style={styles.legalRow}>
          <Text style={styles.legal}>Restore</Text>
          <Text style={styles.legalDot}>·</Text>
          <Text style={styles.legal}>Terms</Text>
          <Text style={styles.legalDot}>·</Text>
          <Text style={styles.legal}>Privacy</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function PlanOption({
  selected,
  onPress,
  title,
  price,
  subtitle,
  badge,
}: {
  selected: boolean;
  onPress: () => void;
  title: string;
  price: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress();
      }}
      style={[styles.plan, selected && styles.planSelected]}
    >
      <View style={[styles.planRadio, selected && styles.planRadioOn]}>
        {selected ? <Icon name="check-lg" size={14} color={colors.white} /> : null}
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.planTitleRow}>
          <Text style={[styles.planTitle, selected && { color: colors.white }]}>{title}</Text>
          {badge ? (
            <View style={[styles.badge, selected && { backgroundColor: colors.white }]}>
              <Text style={[styles.badgeText, selected && { color: colors.ink }]}>{badge}</Text>
            </View>
          ) : null}
        </View>
        <Text style={[styles.planPrice, selected && { color: colors.white }]}>{price}</Text>
        <Text style={[styles.planSub, selected && { color: 'rgba(255,255,255,0.7)' }]}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  closeRow: { paddingHorizontal: layout.screenPadding, paddingTop: spacing.sm, alignItems: 'flex-end' },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.xl,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  art: { marginTop: spacing.sm, marginBottom: spacing.lg },
  artImg: { width: '100%', height: 200, borderRadius: radius.lg, backgroundColor: colors.surfaceSunken },
  kicker: { ...type.overline, letterSpacing: 3, textAlign: 'center' },
  title: { ...type.title, fontSize: 30, lineHeight: 34, textAlign: 'center', marginTop: spacing.sm },
  titleItalic: { fontFamily: fonts.displayItalic, color: colors.rose },
  features: { marginTop: spacing.xl, marginBottom: spacing.xl, gap: spacing.md },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  tick: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: { ...type.bodyStrong, color: colors.ink, flex: 1 },
  plan: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.line,
    borderRadius: radius.lg,
    padding: spacing.base,
    marginBottom: spacing.md,
    backgroundColor: colors.bg,
  },
  planSelected: { backgroundColor: colors.ink, borderColor: colors.ink },
  planRadio: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: colors.lineStrong,
    marginRight: spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planRadioOn: { backgroundColor: colors.inkSecondary, borderColor: colors.white },
  planTitleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  planTitle: { ...type.h3, color: colors.ink },
  planPrice: { ...type.bodyStrong, color: colors.ink, marginTop: 2 },
  planSub: { ...type.small, color: colors.inkTertiary, marginTop: 1 },
  badge: {
    backgroundColor: colors.ink,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { ...type.caption, color: colors.white, fontSize: 10, letterSpacing: 0.3 },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  legalRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  legal: { ...type.caption, color: colors.inkTertiary },
  legalDot: { ...type.caption, color: colors.inkFaint },
});
