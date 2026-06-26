import React from 'react';
import { router } from 'expo-router';
import StepScaffold from '../../src/components/StepScaffold';
import { OptionRow } from '../../src/components/primitives';
import { useOnboarding } from '../../src/store/onboarding';

const FREQUENCIES = [
  { days: 3, label: '3 days a week', description: 'Easygoing — build the habit gently' },
  { days: 4, label: '4 days a week', description: 'Balanced — steady, visible progress' },
  { days: 5, label: '5 days a week', description: 'Committed — faster results' },
  { days: 7, label: 'Every day', description: 'All in — a daily stretching ritual' },
] as const;

export default function FrequencyStep() {
  const { answers, set } = useOnboarding();
  return (
    <StepScaffold
      step={4}
      total={5}
      title="How often will you stretch?"
      subtitle="Choose a rhythm you can keep. You can change this anytime."
      onContinue={() => router.push('/onboarding/reminder')}
    >
      {FREQUENCIES.map((f) => (
        <OptionRow
          key={f.days}
          label={f.label}
          description={f.description}
          selected={answers.frequency === f.days}
          onPress={() => set('frequency', f.days)}
        />
      ))}
    </StepScaffold>
  );
}
