import React from 'react';
import { router } from 'expo-router';
import StepScaffold from '../../src/components/StepScaffold';
import { OptionRow } from '../../src/components/primitives';
import { useOnboarding } from '../../src/store/onboarding';

const AREAS = [
  { id: 'Hamstrings', label: 'Hamstrings', icon: 'activity' },
  { id: 'Hips', label: 'Hips & glutes', icon: 'circle' },
  { id: 'Back', label: 'Lower back', icon: 'list' },
  { id: 'Shoulders', label: 'Shoulders & neck', icon: 'person-standing' },
  { id: 'Splits', label: 'Splits & inner thighs', icon: 'arrows-angle-expand' },
] as const;

export default function AreasStep() {
  const { answers, toggleArea } = useOnboarding();
  return (
    <StepScaffold
      step={3}
      total={5}
      title="Where do you feel tightest?"
      subtitle="Pick all that apply. We’ll prioritise these areas in your routines."
      onContinue={() => router.push('/onboarding/frequency')}
      continueDisabled={answers.areas.length === 0}
    >
      {AREAS.map((a) => (
        <OptionRow
          key={a.id}
          label={a.label}
          icon={a.icon as any}
          selected={answers.areas.includes(a.id)}
          onPress={() => toggleArea(a.id)}
        />
      ))}
    </StepScaffold>
  );
}
