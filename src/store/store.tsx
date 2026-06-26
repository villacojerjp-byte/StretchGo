import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { todayKey, keyMinus } from '../utils/date';

const STORAGE_KEY = 'stretch.state.v1';
export const WATER_GOAL = 8;

export type Profile = {
  goal: string;
  level: string;
  areas: string[];
  frequency: number; // sessions per week
  reminderHour: number;
  name?: string;
};

export type DayLog = {
  date: string;
  routineIds: string[]; // completed routines that day
  minutes: number;
  water: number; // cups
  tasks: string[]; // ids of daily promises checked
};

export type PersistShape = {
  onboarded: boolean;
  isPremium: boolean;
  profile: Profile | null;
  logs: Record<string, DayLog>;
  totalMinutes: number;
  sessions: number;
};

const EMPTY: PersistShape = {
  onboarded: false,
  isPremium: false,
  profile: null,
  logs: {},
  totalMinutes: 0,
  sessions: 0,
};

function emptyDay(date: string): DayLog {
  return { date, routineIds: [], minutes: 0, water: 0, tasks: [] };
}

type StoreValue = {
  hydrated: boolean;
  state: PersistShape;
  today: DayLog;
  streak: number;
  // actions
  completeOnboarding: (p: Profile) => void;
  setPremium: (v: boolean) => void;
  logSession: (routineId: string, minutes: number) => void;
  toggleTask: (taskId: string) => void;
  setWater: (cups: number) => void;
  resetAll: () => void;
  setName: (name: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

/** Consecutive days (ending today or yesterday) with any completed activity. */
function computeStreak(logs: Record<string, DayLog>): number {
  const active = (k: string) => {
    const l = logs[k];
    return !!l && (l.routineIds.length > 0 || l.tasks.length > 0);
  };
  // Allow today to be empty so far without breaking yesterday's streak.
  let start = 0;
  if (!active(todayKey())) {
    if (!active(keyMinus(1))) return 0;
    start = 1;
  }
  let count = 0;
  for (let i = start; i < 400; i++) {
    if (active(keyMinus(i))) count++;
    else break;
  }
  return count;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<PersistShape>(EMPTY);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from disk on mount.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as PersistShape;
          setState({ ...EMPTY, ...parsed, logs: parsed.logs ?? {} });
        }
      } catch {
        // ignore corrupt storage — start fresh
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // Debounced persistence whenever state changes (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
    }, 250);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [state, hydrated]);

  const mutateToday = (fn: (d: DayLog) => DayLog) => {
    setState((s) => {
      const key = todayKey();
      const current = s.logs[key] ?? emptyDay(key);
      return { ...s, logs: { ...s.logs, [key]: fn({ ...current }) } };
    });
  };

  const value = useMemo<StoreValue>(() => {
    const today = state.logs[todayKey()] ?? emptyDay(todayKey());
    return {
      hydrated,
      state,
      today,
      streak: computeStreak(state.logs),
      completeOnboarding: (p) => setState((s) => ({ ...s, onboarded: true, profile: p })),
      setPremium: (v) => setState((s) => ({ ...s, isPremium: v })),
      setName: (name) =>
        setState((s) => ({ ...s, profile: s.profile ? { ...s.profile, name } : s.profile })),
      logSession: (routineId, minutes) => {
        mutateToday((d) => ({
          ...d,
          routineIds: d.routineIds.includes(routineId) ? d.routineIds : [...d.routineIds, routineId],
          minutes: d.minutes + minutes,
        }));
        setState((s) => ({ ...s, totalMinutes: s.totalMinutes + minutes, sessions: s.sessions + 1 }));
      },
      toggleTask: (taskId) =>
        mutateToday((d) => ({
          ...d,
          tasks: d.tasks.includes(taskId) ? d.tasks.filter((t) => t !== taskId) : [...d.tasks, taskId],
        })),
      setWater: (cups) => mutateToday((d) => ({ ...d, water: Math.max(0, Math.min(WATER_GOAL, cups)) })),
      resetAll: () => setState(EMPTY),
    };
  }, [state, hydrated]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
