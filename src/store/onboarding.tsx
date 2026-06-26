import React, { createContext, useContext, useMemo, useState } from 'react';

export type OnboardingAnswers = {
  goal: string;
  level: string;
  areas: string[];
  frequency: number;
  reminderHour: number;
};

const DEFAULTS: OnboardingAnswers = {
  goal: '',
  level: '',
  areas: [],
  frequency: 4,
  reminderHour: 8,
};

type Ctx = {
  answers: OnboardingAnswers;
  set: <K extends keyof OnboardingAnswers>(key: K, value: OnboardingAnswers[K]) => void;
  toggleArea: (area: string) => void;
};

const OnboardingContext = createContext<Ctx | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<OnboardingAnswers>(DEFAULTS);

  const value = useMemo<Ctx>(
    () => ({
      answers,
      set: (key, value) => setAnswers((a) => ({ ...a, [key]: value })),
      toggleArea: (area) =>
        setAnswers((a) => ({
          ...a,
          areas: a.areas.includes(area)
            ? a.areas.filter((x) => x !== area)
            : [...a.areas, area],
        })),
    }),
    [answers],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): Ctx {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}
