import React from 'react';
import { router } from 'expo-router';
import StepScaffold from '../../src/components/StepScaffold';
import { OptionRow } from '../../src/components/primitives';
import { useOnboarding } from '../../src/store/onboarding';

const TIMES = [
  { hour: 7, label: 'Morning', description: 'Around 7:00 AM — start the day open', icon: 'sun' },
  { hour: 12, label: 'Midday', description: 'Around 12:00 PM — a lunchtime reset', icon: 'cloud-sun' },
  { hour: 18, label: 'Evening', description: 'Around 6:00 PM — unwind after work', icon: 'moon' },
  { hour: 21, label: 'Night', description: 'Around 9:00 PM — stretch before bed', icon: 'moon-stars' },
] as const;

export default function ReminderStep() {
  const { answers, set } = useOnboarding();
  return (
    <StepScaffold
      step={5}
      total={5}
      title="When should we remind you?"
      subtitle="A gentle nudge makes all the difference. We’ll keep it to one a day."
      ctaLabel="Build my plan"
      onContinue={() => router.push('/onboarding/plan')}
    >
      {TIMES.map((t) => (
        <OptionRow
          key={t.hour}
          label={t.label}
          description={t.description}
          icon={t.icon as any}
          selected={answers.reminderHour === t.hour}
          onPress={() => set('reminderHour', t.hour)}
        />
      ))}
    </StepScaffold>
  );
}
