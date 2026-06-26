import React from 'react';
import { router } from 'expo-router';
import StepScaffold from '../../src/components/StepScaffold';
import { OptionRow } from '../../src/components/primitives';
import { useOnboarding } from '../../src/store/onboarding';

const GOALS = [
  { id: 'splits', label: 'Do the splits', description: 'Front and middle split progress', icon: 'arrows-angle-expand' },
  { id: 'flexibility', label: 'Get more flexible', description: 'Full-body range of motion', icon: 'person-arms-up' },
  { id: 'pain', label: 'Ease stiffness & pain', description: 'Loosen tight, achy muscles', icon: 'heart-pulse' },
  { id: 'relax', label: 'Relax & de-stress', description: 'Calm the body and mind', icon: 'wind' },
  { id: 'posture', label: 'Improve posture', description: 'Undo the effects of sitting', icon: 'person-standing' },
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
