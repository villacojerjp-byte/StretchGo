import React from 'react';
import { router } from 'expo-router';
import StepScaffold from '../../src/components/StepScaffold';
import { OptionRow } from '../../src/components/primitives';
import { useOnboarding } from '../../src/store/onboarding';

const GOALS = [
  { id: 'frontsplits', label: 'Front splits', description: 'Left, right & full front splits', icon: 'arrows-angle-expand' },
  { id: 'middlesplits', label: 'Middle splits & oversplits', description: 'Straddle and beyond 180°', icon: 'activity' },
  { id: 'backbend', label: 'Backbends & bridges', description: 'Bridges, walkovers, scorpions', icon: 'flower2' },
  { id: 'flexibility', label: 'Overall flexibility', description: 'Head-to-toe range of motion', icon: 'person-arms-up' },
  { id: 'shoulders', label: 'Shoulders & back', description: 'Open shoulders and a bendy spine', icon: 'person-standing' },
] as const;

export default function GoalStep() {
  const { answers, set } = useOnboarding();
  return (
    <StepScaffold
      step={1}
      total={5}
      title="What brings you here?"
      subtitle="We’ll shape your plan around this goal."
      onContinue={() => router.push('/onboarding/level')}
      continueDisabled={!answers.goal}
    >
      {GOALS.map((g) => (
        <OptionRow
          key={g.id}
          label={g.label}
          description={g.description}
          icon={g.icon as any}
          selected={answers.goal === g.id}
          onPress={() => set('goal', g.id)}
        />
      ))}
    </StepScaffold>
  );
}
