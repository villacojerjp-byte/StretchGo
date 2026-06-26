/**
 * Daily "promises" — a small, non-punishing checklist (Her 75 inspired).
 * Five gentle commitments to build a consistent stretching habit.
 */
import { BiName } from '../components/Icon';

export type Promise = {
  id: string;
  title: string;
  detail: string;
  icon: BiName; // Bootstrap Icon name (monochrome)
};

export const DAILY_PROMISES: Promise[] = [
  { id: 'p_stretch', title: 'Complete a stretch session', detail: 'Any routine counts', icon: 'person-arms-up' },
  { id: 'p_water', title: 'Reach your water goal', detail: '8 cups through the day', icon: 'droplet' },
  { id: 'p_breathe', title: 'Two minutes of breathing', detail: 'Slow, deliberate breaths', icon: 'wind' },
  { id: 'p_move', title: 'Stand and move every hour', detail: 'Break up long sitting', icon: 'person-walking' },
  { id: 'p_reflect', title: 'Note how your body feels', detail: 'A moment of awareness', icon: 'stars' },
];
