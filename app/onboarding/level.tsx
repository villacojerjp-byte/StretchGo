import React from 'react';
import { router } from 'expo-router';
import StepScaffold from '../../src/components/StepScaffold';
import { OptionRow } from '../../src/components/primitives';
import { useOnboarding } from '../../src/store/onboarding';

const LEVELS = [
  { id: 'Beginner', label: 'Just starting out', description: 'New to stretching, or coming back' },
  { id: 'Intermediate', label: 'Somewhat flexible', description: 'I stretch now and then' },
  { id: 'Advanced', label: 'Quite flexible', description: 'I stretch regularly and want more' },
] as const;

export default function LevelStep() {
  const { answers, set } = useOnboarding();
  return (
    <StepScaffold
      step={2}
      total={5}
      title="How flexible are you today?"
      subtitle="Be honest — there’s no wrong answer. We’ll meet you where you are."
      onContinue={() => router.push('/onboarding/areas')}
      continueDisabled={!answers.level}
    >
      {LEVELS.map((l) => (
        <OptionRow
          key={l.id}
          label={l.label}
          description={l.description}
          selected={answers.level === l.id}
          onPress={() => set('level', l.id)}
        />
      ))}
    </StepScaffold>
  );
}
