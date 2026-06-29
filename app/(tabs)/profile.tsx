import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Icon, { BiName } from '../../src/components/Icon';
import { Screen, SectionHeader, Card, Divider } from '../../src/components/primitives';
import { useStore } from '../../src/store/store';
import { colors, radius, spacing, type, shadow } from '../../src/theme';

const GOAL_LABELS: Record<string, string> = {
  splits: 'Do the splits',
  flexibility: 'Get more flexible',
  pain: 'Ease stiffness & pain',
  relax: 'Relax & de-stress',
  posture: 'Improve posture',
};

function timeLabel(hour: number) {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${h}:00 ${ampm}`;
}

export default function ProfileScreen() {
  const { state, resetAll } = useStore();
  const profile = state.profile;
  const [reminders, setReminders] = useState(true);
  const [haptics, setHaptics] = useState(true);

  const confirmReset = () => {
    Alert.alert(
      'Reset everything?',
      'This clears your progress, streak, and onboarding answers. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetAll();
            router.replace('/onboarding');
          },
        },
      ],
    );
  };

  return (
    <Screen edges={['top']} contentStyle={{ paddingBottom: spacing.huge }}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Identity */}
      <Card style={styles.identity}>
        <View style={styles.avatar}>
          <Icon name="person-fill" size={26} color={colors.white} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Your practice</Text>
          <Text style={styles.goalText}>
            {profile?.goal ? GOAL_LABELS[profile.goal] : 'Flexibility journey'}
          </Text>
        </View>
      </Card>

      {/* Premium */}
      <Pressable onPress={() => router.push('/paywall')} style={[styles.premium, shadow.card]}>
        <LinearGradient
          colors={[colors.rose, colors.roseDeep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.premiumKicker}>
            {state.isPremium ? 'STRETCH PREMIUM' : 'UPGRADE'}
          </Text>
          <Text style={styles.premiumTitle}>
            {state.isPremium ? 'You’re all unlocked' : 'Go Premium'}
          </Text>
          <Text style={styles.premiumSub}>
            {state.isPremium
              ? 'Enjoy every routine and feature.'
              : 'Unlock all routines and plans.'}
          </Text>
        </View>
        <View style={styles.premiumIcon}>
          <Icon name={state.isPremium ? 'check-lg' : 'arrow-right'} size={20} color={colors.roseDeep} />
        </View>
      </Pressable>

      {/* Your plan */}
      <View style={styles.block}>
        <SectionHeader title="Your plan" />
        <Card style={{ paddingVertical: spacing.xs }}>
          <InfoRow icon="flag" label="Goal" value={profile?.goal ? GOAL_LABELS[profile.goal] : '—'} />
          <Divider />
          <InfoRow icon="speedometer2" label="Level" value={profile?.level ?? '—'} />
          <Divider />
          <InfoRow
            icon="arrow-repeat"
            label="Frequency"
            value={profile ? `${profile.frequency}× per week` : '—'}
          />
          <Divider />
          <InfoRow
            icon="alarm"
            label="Reminder"
            value={profile ? timeLabel(profile.reminderHour) : '—'}
          />
        </Card>
        {profile?.areas?.length ? (
          <View style={styles.areasRow}>
            {profile.areas.map((a) => (
              <View key={a} style={styles.areaPill}>
                <Text style={styles.areaText}>{a}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {/* Settings */}
      <View style={styles.block}>
        <SectionHeader title="Settings" />
        <Card style={{ paddingVertical: spacing.xs }}>
          <ToggleRow icon="bell" label="Daily reminders" value={reminders} onValueChange={setReminders} />
          <Divider />
          <ToggleRow icon="phone" label="Haptic feedback" value={haptics} onValueChange={setHaptics} />
        </Card>
      </View>

      {/* About / reset */}
      <View style={styles.block}>
        <SectionHeader title="About" />
        <Card style={{ paddingVertical: spacing.xs }}>
          <LinkRow icon="file-text" label="Terms of Service" />
          <Divider />
          <LinkRow icon="lock" label="Privacy Policy" />
          <Divider />
          <LinkRow icon="star" label="Rate Stretch" />
        </Card>

        <Pressable onPress={confirmReset} style={styles.resetBtn}>
          <Icon name="arrow-clockwise" size={17} color={colors.inkSecondary} />
          <Text style={styles.resetText}>Reset all progress</Text>
        </Pressable>
        <Text style={styles.version}>Stretch · v1.0.0</Text>
      </View>
    </Screen>
  );
}

function InfoRow({ icon, label, value }: { icon: BiName; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.rowIcon}>
        <Icon name={icon} size={18} color={colors.ink} />
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function ToggleRow({
  icon, label, value, onValueChange,
}: { icon: BiName; label: string; value: boolean; onValueChange: (v: boolean) => void }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.rowIcon}>
        <Icon name={icon} size={18} color={colors.ink} />
      </View>
      <Text style={[styles.rowLabel, { flex: 1 }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.surfaceSunken, true: colors.ink }}
        thumbColor={colors.white}
        ios_backgroundColor={colors.surfaceSunken}
      />
    </View>
  );
}

function LinkRow({ icon, label }: { icon: BiName; label: string }) {
  return (
    <Pressable style={styles.infoRow}>
      <View style={styles.rowIcon}>
        <Icon name={icon} size={18} color={colors.ink} />
      </View>
      <Text style={[styles.rowLabel, { flex: 1 }]}>{label}</Text>
      <Icon name="chevron-right" size={16} color={colors.inkFaint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing.base, paddingBottom: spacing.lg },
  title: { ...type.display, fontSize: 36 },

  identity: { flexDirection: 'row', alignItems: 'center', gap: spacing.base },
  avatar: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: colors.rose,
    alignItems: 'center', justifyContent: 'center',
  },
  name: { ...type.h2 },
  goalText: { ...type.small, color: colors.inkTertiary, marginTop: 2 },

  premium: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    borderRadius: radius.lg,
    padding: spacing.lg,
    overflow: 'hidden',
  },
  premiumKicker: { ...type.overline, color: 'rgba(255,255,255,0.6)' },
  premiumTitle: { ...type.h2, color: colors.white, marginTop: 4 },
  premiumSub: { ...type.small, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
  premiumIcon: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },

  block: { marginTop: spacing.xl },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, paddingHorizontal: spacing.sm },
  rowIcon: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surfaceAlt,
    alignItems: 'center', justifyContent: 'center',
  },
  rowLabel: { ...type.bodyStrong, color: colors.ink },
  rowValue: { ...type.body, color: colors.inkTertiary, marginLeft: 'auto', textTransform: 'capitalize' },

  areasRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  areaPill: {
    backgroundColor: colors.surface, borderRadius: radius.pill,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  areaText: { ...type.smallStrong, color: colors.inkSecondary },

  resetBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    marginTop: spacing.lg, paddingVertical: spacing.base,
  },
  resetText: { ...type.smallStrong, color: colors.inkSecondary },
  version: { ...type.caption, color: colors.inkFaint, textAlign: 'center', marginTop: spacing.sm },
});
