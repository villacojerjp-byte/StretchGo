/**
 * Stretch content library. All routine copy and cues are original.
 * Durations are in seconds for exercises, minutes for routine summaries.
 */

export type PoseKey =
  | 'forwardFold'
  | 'lunge'
  | 'butterfly'
  | 'seatedTwist'
  | 'cobra'
  | 'childPose'
  | 'hamstring'
  | 'pigeon'
  | 'sideBend'
  | 'catCow'
  | 'shoulderRoll'
  | 'neckRelease'
  | 'splitSlide'
  | 'quadStretch'
  | 'calf'
  | 'breathing';

export type Exercise = {
  id: string;
  name: string;
  duration: number; // seconds
  pose: PoseKey;
  side?: 'left' | 'right' | 'both';
  cue: string;
  target: string;
};

export type Category = 'Splits' | 'Flexibility' | 'Morning' | 'Recovery' | 'Posture';
export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export type Routine = {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  level: Level;
  durationMin: number;
  focus: string[];
  description: string;
  exercises: Exercise[];
};

let _eid = 0;
const ex = (
  name: string,
  duration: number,
  pose: PoseKey,
  target: string,
  cue: string,
  side?: Exercise['side'],
): Exercise => ({ id: `ex_${_eid++}`, name, duration, pose, target, cue, side });

export const ROUTINES: Routine[] = [
  {
    id: 'r_front_splits',
    title: 'Front Splits Foundations',
    subtitle: 'Open hips and hamstrings, step by step',
    category: 'Splits',
    level: 'Beginner',
    durationMin: 12,
    focus: ['Hamstrings', 'Hip Flexors', 'Glutes'],
    description:
      'A patient, progressive sequence that builds the length you need for a clean front split. Stay just inside your edge and breathe.',
    exercises: [
      ex('Centering Breath', 40, 'breathing', 'Whole body', 'Sit tall. Inhale for four counts, exhale for six. Soften your jaw.'),
      ex('Low Lunge', 45, 'lunge', 'Hip Flexors', 'Sink the hips forward and down. Keep the front knee stacked over the ankle.', 'left'),
      ex('Low Lunge', 45, 'lunge', 'Hip Flexors', 'Sink the hips forward and down. Keep the front knee stacked over the ankle.', 'right'),
      ex('Half Split', 50, 'hamstring', 'Hamstrings', 'Hips back over the rear knee, front leg long. Hinge from the waist.', 'left'),
      ex('Half Split', 50, 'hamstring', 'Hamstrings', 'Hips back over the rear knee, front leg long. Hinge from the waist.', 'right'),
      ex('Seated Forward Fold', 55, 'forwardFold', 'Hamstrings', 'Lengthen the spine first, then fold. Lead with the chest, not the head.'),
      ex('Sliding Split', 60, 'splitSlide', 'Hamstrings', 'Walk the hands forward and ease into your deepest comfortable range.', 'left'),
      ex('Sliding Split', 60, 'splitSlide', 'Hamstrings', 'Walk the hands forward and ease into your deepest comfortable range.', 'right'),
      ex('Reclined Rest', 45, 'childPose', 'Whole body', 'Release everything. Let the floor hold your weight.'),
    ],
  },
  {
    id: 'r_middle_splits',
    title: 'Middle Splits Opener',
    subtitle: 'Inner thighs and deep hip mobility',
    category: 'Splits',
    level: 'Intermediate',
    durationMin: 15,
    focus: ['Adductors', 'Hips', 'Groin'],
    description:
      'Targeted adductor work to widen your straddle. Move slowly and keep your toes pointing up to protect the knees.',
    exercises: [
      ex('Centering Breath', 40, 'breathing', 'Whole body', 'Settle in. Lengthen each exhale to calm the nervous system.'),
      ex('Butterfly', 55, 'butterfly', 'Groin', 'Soles together, let the knees drop. Sit up out of the hips.'),
      ex('Wide Forward Fold', 55, 'forwardFold', 'Adductors', 'Legs wide, walk the hands forward with a long spine.'),
      ex('Deep Side Lunge', 50, 'lunge', 'Adductors', 'Shift weight into one bent leg, the other extended long and straight.', 'left'),
      ex('Deep Side Lunge', 50, 'lunge', 'Adductors', 'Shift weight into one bent leg, the other extended long and straight.', 'right'),
      ex('Frog Hold', 60, 'butterfly', 'Inner Thighs', 'Knees wide, shins parallel. Gently rock to find new space.'),
      ex('Straddle Slide', 65, 'splitSlide', 'Inner Thighs', 'Ease the hips down between wide legs. Breathe into the stretch.'),
      ex('Reclined Twist', 45, 'seatedTwist', 'Lower Back', 'Let the knees fall to one side and decompress the spine.', 'both'),
    ],
  },
  {
    id: 'r_morning_wake',
    title: 'Morning Wake-Up',
    subtitle: 'Gentle full-body start to the day',
    category: 'Morning',
    level: 'Beginner',
    durationMin: 8,
    focus: ['Spine', 'Shoulders', 'Hamstrings'],
    description:
      'A soft, flowing sequence to shake off sleep and bring blood back to stiff joints. Perfect before coffee.',
    exercises: [
      ex('Wake-Up Breath', 35, 'breathing', 'Whole body', 'Reach the arms overhead on the inhale, melt down on the exhale.'),
      ex('Cat-Cow', 45, 'catCow', 'Spine', 'Flow between rounding and arching with your breath.'),
      ex('Neck Release', 40, 'neckRelease', 'Neck', 'Ear toward shoulder, slow and gentle. Let the weight of the head do the work.', 'both'),
      ex('Standing Forward Fold', 45, 'forwardFold', 'Hamstrings', 'Soft knees. Let the head and arms hang heavy.'),
      ex('Cobra', 40, 'cobra', 'Spine', 'Press the chest forward and up, shoulders sliding down the back.'),
      ex('Child’s Pose', 45, 'childPose', 'Lower Back', 'Hips to heels, arms long. Take three deep belly breaths.'),
    ],
  },
  {
    id: 'r_evening_unwind',
    title: 'Evening Unwind',
    subtitle: 'Slow stretches to release the day',
    category: 'Recovery',
    level: 'Beginner',
    durationMin: 10,
    focus: ['Hips', 'Back', 'Neck'],
    description:
      'Calming, longer holds that downshift your body toward sleep. Dim the lights and move with intention.',
    exercises: [
      ex('Settling Breath', 50, 'breathing', 'Whole body', 'Hand on belly. Make the exhale longer than the inhale.'),
      ex('Seated Twist', 45, 'seatedTwist', 'Spine', 'Twist gently from the base of the spine, gaze over the shoulder.', 'left'),
      ex('Seated Twist', 45, 'seatedTwist', 'Spine', 'Twist gently from the base of the spine, gaze over the shoulder.', 'right'),
      ex('Pigeon', 60, 'pigeon', 'Glutes', 'Front shin forward, fold over with a soft spine. Breathe into the hip.', 'left'),
      ex('Pigeon', 60, 'pigeon', 'Glutes', 'Front shin forward, fold over with a soft spine. Breathe into the hip.', 'right'),
      ex('Reclined Butterfly', 55, 'butterfly', 'Hips', 'Lie back, soles together, palms up. Completely let go.'),
      ex('Child’s Pose', 60, 'childPose', 'Lower Back', 'Stay here. Soften the brow and slow your breath.'),
    ],
  },
  {
    id: 'r_posture_reset',
    title: 'Desk Posture Reset',
    subtitle: 'Undo the slouch in ten minutes',
    category: 'Posture',
    level: 'Beginner',
    durationMin: 9,
    focus: ['Chest', 'Shoulders', 'Neck'],
    description:
      'Counter hours of sitting by opening the chest and mobilising the upper back. Great for a midday break.',
    exercises: [
      ex('Shoulder Rolls', 35, 'shoulderRoll', 'Shoulders', 'Slow circles, big and deliberate. Reverse halfway through.'),
      ex('Neck Release', 40, 'neckRelease', 'Neck', 'Lengthen the side of the neck. No pulling — just gravity.', 'both'),
      ex('Cat-Cow', 45, 'catCow', 'Upper Back', 'Mobilise each vertebra. Widen across the shoulder blades.'),
      ex('Cobra', 40, 'cobra', 'Chest', 'Open the front of the chest. Draw the shoulders back and down.'),
      ex('Seated Side Bend', 40, 'sideBend', 'Side Body', 'Reach up and over, creating length along the ribs.', 'left'),
      ex('Seated Side Bend', 40, 'sideBend', 'Side Body', 'Reach up and over, creating length along the ribs.', 'right'),
      ex('Seated Twist', 45, 'seatedTwist', 'Spine', 'Rotate to wring out tension along the spine.', 'both'),
    ],
  },
  {
    id: 'r_full_flex',
    title: 'Full-Body Flexibility',
    subtitle: 'Head-to-toe mobility flow',
    category: 'Flexibility',
    level: 'Intermediate',
    durationMin: 18,
    focus: ['Full Body', 'Hamstrings', 'Hips', 'Shoulders'],
    description:
      'A complete tune-up that touches every major group. Use it two or three times a week to build lasting range.',
    exercises: [
      ex('Centering Breath', 40, 'breathing', 'Whole body', 'Arrive on your mat. Set one calm intention for the next 18 minutes.'),
      ex('Cat-Cow', 45, 'catCow', 'Spine', 'Warm the spine in both directions.'),
      ex('Low Lunge', 45, 'lunge', 'Hip Flexors', 'Open the front of the hip. Lift through the chest.', 'left'),
      ex('Low Lunge', 45, 'lunge', 'Hip Flexors', 'Open the front of the hip. Lift through the chest.', 'right'),
      ex('Hamstring Stretch', 50, 'hamstring', 'Hamstrings', 'Front leg long, fold from the hips with a flat back.', 'left'),
      ex('Hamstring Stretch', 50, 'hamstring', 'Hamstrings', 'Front leg long, fold from the hips with a flat back.', 'right'),
      ex('Quad Stretch', 45, 'quadStretch', 'Quads', 'Draw the heel toward the glute. Keep the knees together.', 'left'),
      ex('Quad Stretch', 45, 'quadStretch', 'Quads', 'Draw the heel toward the glute. Keep the knees together.', 'right'),
      ex('Pigeon', 55, 'pigeon', 'Glutes', 'Settle into the outer hip. Soften with every exhale.', 'left'),
      ex('Pigeon', 55, 'pigeon', 'Glutes', 'Settle into the outer hip. Soften with every exhale.', 'right'),
      ex('Calf Stretch', 40, 'calf', 'Calves', 'Press the heel down, straighten the back leg.', 'both'),
      ex('Standing Forward Fold', 50, 'forwardFold', 'Hamstrings', 'Final fold. Let everything decompress toward the floor.'),
    ],
  },
  {
    id: 'r_lower_back',
    title: 'Lower Back Relief',
    subtitle: 'Ease tension and decompress',
    category: 'Recovery',
    level: 'Beginner',
    durationMin: 7,
    focus: ['Lower Back', 'Glutes', 'Hips'],
    description:
      'Gentle movements to release a tight, achy lower back. Move slowly and never push into sharp sensation.',
    exercises: [
      ex('Belly Breathing', 45, 'breathing', 'Core', 'Breathe wide into the low back. Feel it expand against the floor.'),
      ex('Knees to Chest', 45, 'childPose', 'Lower Back', 'Hug the knees in and rock gently side to side.'),
      ex('Reclined Twist', 50, 'seatedTwist', 'Lower Back', 'Knees fall to one side, gaze the other. Decompress.', 'left'),
      ex('Reclined Twist', 50, 'seatedTwist', 'Lower Back', 'Knees fall to one side, gaze the other. Decompress.', 'right'),
      ex('Cat-Cow', 45, 'catCow', 'Spine', 'Find slow, fluid movement through the whole spine.'),
      ex('Child’s Pose', 55, 'childPose', 'Lower Back', 'Rest and breathe into the back body.'),
    ],
  },
  {
    id: 'r_advanced_splits',
    title: 'Advanced Split Mastery',
    subtitle: 'Deep work for the dedicated',
    category: 'Splits',
    level: 'Advanced',
    durationMin: 20,
    focus: ['Hamstrings', 'Hip Flexors', 'Adductors'],
    description:
      'Longer, deeper holds for those already near their splits. Warm up first — this sequence asks a lot of your range.',
    exercises: [
      ex('Activation Breath', 40, 'breathing', 'Whole body', 'Engage gently. Prepare the body for deeper ranges.'),
      ex('Deep Lunge', 55, 'lunge', 'Hip Flexors', 'Drop the back knee, drive the hips forward and down.', 'left'),
      ex('Deep Lunge', 55, 'lunge', 'Hip Flexors', 'Drop the back knee, drive the hips forward and down.', 'right'),
      ex('Half Split Pulse', 60, 'hamstring', 'Hamstrings', 'Find your edge, then breathe and ease a little deeper.', 'left'),
      ex('Half Split Pulse', 60, 'hamstring', 'Hamstrings', 'Find your edge, then breathe and ease a little deeper.', 'right'),
      ex('Full Front Split', 75, 'splitSlide', 'Hamstrings', 'Lower with control. Support with blocks or hands as needed.', 'left'),
      ex('Full Front Split', 75, 'splitSlide', 'Hamstrings', 'Lower with control. Support with blocks or hands as needed.', 'right'),
      ex('Middle Split Hold', 75, 'splitSlide', 'Adductors', 'Widen the straddle and sink. Keep the pelvis neutral.'),
      ex('Pigeon', 60, 'pigeon', 'Glutes', 'Release the deep hip rotators after intense work.', 'both'),
      ex('Final Rest', 50, 'childPose', 'Whole body', 'Lie back and let the body absorb the work.'),
    ],
  },
  {
    id: 'r_morning_energise',
    title: 'Energising Morning Flow',
    subtitle: 'Wake the whole body and move',
    category: 'Morning',
    level: 'Intermediate',
    durationMin: 11,
    focus: ['Spine', 'Hips', 'Side Body'],
    description:
      'A livelier morning sequence that flows through the spine, hips, and side body to leave you alert and loose.',
    exercises: [
      ex('Wake-Up Breath', 35, 'breathing', 'Whole body', 'Big reach up on the inhale, long exhale down.'),
      ex('Cat-Cow', 45, 'catCow', 'Spine', 'Move with breath, warming each segment of the spine.'),
      ex('Cobra', 40, 'cobra', 'Chest', 'Lift and open the front body. Roll the shoulders back.'),
      ex('Low Lunge', 45, 'lunge', 'Hip Flexors', 'Sink the hips and lengthen the back leg.', 'left'),
      ex('Low Lunge', 45, 'lunge', 'Hip Flexors', 'Sink the hips and lengthen the back leg.', 'right'),
      ex('Seated Side Bend', 40, 'sideBend', 'Side Body', 'Reach up and over to open the ribs.', 'left'),
      ex('Seated Side Bend', 40, 'sideBend', 'Side Body', 'Reach up and over to open the ribs.', 'right'),
      ex('Standing Forward Fold', 45, 'forwardFold', 'Hamstrings', 'Hang heavy and let the spine decompress.'),
      ex('Calf Stretch', 40, 'calf', 'Calves', 'Press the heels down and wake the lower legs.', 'both'),
      ex('Shoulder Rolls', 35, 'shoulderRoll', 'Shoulders', 'Loosen the shoulders to finish, then stand tall.'),
    ],
  },
  {
    id: 'r_tech_neck',
    title: 'Tech Neck & Shoulders',
    subtitle: 'Release screen-time tension',
    category: 'Posture',
    level: 'Beginner',
    durationMin: 8,
    focus: ['Neck', 'Shoulders', 'Upper Back'],
    description:
      'Targeted relief for the neck and shoulders after long hours on a phone or laptop. Slow, careful, and soothing.',
    exercises: [
      ex('Neck Release', 45, 'neckRelease', 'Neck', 'Drop the ear toward the shoulder. Let gravity do the work.', 'both'),
      ex('Shoulder Rolls', 40, 'shoulderRoll', 'Shoulders', 'Slow, full circles. Reverse direction halfway.'),
      ex('Cat-Cow', 45, 'catCow', 'Upper Back', 'Spread the shoulder blades wide on the round.'),
      ex('Cobra', 40, 'cobra', 'Chest', 'Open the chest to counter the forward hunch.'),
      ex('Seated Side Bend', 40, 'sideBend', 'Side Body', 'Lengthen one side of the neck and ribs.', 'left'),
      ex('Seated Side Bend', 40, 'sideBend', 'Side Body', 'Lengthen one side of the neck and ribs.', 'right'),
      ex('Seated Twist', 45, 'seatedTwist', 'Spine', 'Gently rotate to release the upper back.', 'both'),
    ],
  },
  {
    id: 'r_hip_opener',
    title: 'Hip Opening Flow',
    subtitle: 'Free up tight, stiff hips',
    category: 'Flexibility',
    level: 'Beginner',
    durationMin: 11,
    focus: ['Hips', 'Glutes', 'Groin'],
    description:
      'A focused hip sequence to release the deep rotators and open the groin — ideal after sitting all day.',
    exercises: [
      ex('Centering Breath', 40, 'breathing', 'Whole body', 'Arrive and soften. Let the breath slow.'),
      ex('Butterfly', 55, 'butterfly', 'Groin', 'Soles together, sit tall, let the knees ease down.'),
      ex('Low Lunge', 45, 'lunge', 'Hip Flexors', 'Open the front of the hip with a steady sink.', 'left'),
      ex('Low Lunge', 45, 'lunge', 'Hip Flexors', 'Open the front of the hip with a steady sink.', 'right'),
      ex('Pigeon', 60, 'pigeon', 'Glutes', 'Fold over the front shin and breathe into the outer hip.', 'left'),
      ex('Pigeon', 60, 'pigeon', 'Glutes', 'Fold over the front shin and breathe into the outer hip.', 'right'),
      ex('Reclined Twist', 45, 'seatedTwist', 'Lower Back', 'Let the knees fall and decompress the spine.', 'both'),
      ex('Child’s Pose', 45, 'childPose', 'Hips', 'Sink back and let the hips release completely.'),
    ],
  },
  {
    id: 'r_deep_sleep',
    title: 'Deep Sleep Wind-Down',
    subtitle: 'Long holds to prepare for rest',
    category: 'Recovery',
    level: 'Beginner',
    durationMin: 12,
    focus: ['Neck', 'Hips', 'Back'],
    description:
      'Slow, restorative holds designed to quiet the nervous system before bed. Keep the lights low and the breath soft.',
    exercises: [
      ex('Settling Breath', 55, 'breathing', 'Whole body', 'Lengthen every exhale. Let the body grow heavy.'),
      ex('Neck Release', 45, 'neckRelease', 'Neck', 'Release the day from the neck and jaw.', 'both'),
      ex('Reclined Twist', 55, 'seatedTwist', 'Spine', 'Knees to one side, gaze the other. Melt into the floor.', 'left'),
      ex('Reclined Twist', 55, 'seatedTwist', 'Spine', 'Knees to one side, gaze the other. Melt into the floor.', 'right'),
      ex('Reclined Butterfly', 60, 'butterfly', 'Hips', 'Lie back, soles together, palms open. Fully let go.'),
      ex('Pigeon', 60, 'pigeon', 'Glutes', 'A soft, supported hold. Breathe slow and low.', 'both'),
      ex('Child’s Pose', 60, 'childPose', 'Lower Back', 'Rest here as long as you like. Drift toward sleep.'),
    ],
  },
  {
    id: 'r_straddle_pancake',
    title: 'Straddle & Pancake',
    subtitle: 'Widen the straddle, fold forward',
    category: 'Splits',
    level: 'Intermediate',
    durationMin: 14,
    focus: ['Adductors', 'Hamstrings', 'Hips'],
    description:
      'Progress your middle split and pancake fold with patient adductor and hamstring work. Keep the spine long.',
    exercises: [
      ex('Centering Breath', 40, 'breathing', 'Whole body', 'Settle in and set an intention to stay patient.'),
      ex('Butterfly', 55, 'butterfly', 'Groin', 'Open the inner thighs gently to begin.'),
      ex('Deep Side Lunge', 55, 'lunge', 'Adductors', 'One leg long and straight, the other deeply bent.', 'left'),
      ex('Deep Side Lunge', 55, 'lunge', 'Adductors', 'One leg long and straight, the other deeply bent.', 'right'),
      ex('Wide Forward Fold', 60, 'forwardFold', 'Adductors', 'Legs wide, walk the hands forward with a flat back.'),
      ex('Hamstring Stretch', 50, 'hamstring', 'Hamstrings', 'Fold over one straight leg at a time.', 'left'),
      ex('Hamstring Stretch', 50, 'hamstring', 'Hamstrings', 'Fold over one straight leg at a time.', 'right'),
      ex('Pancake Fold', 65, 'splitSlide', 'Adductors', 'Walk the chest forward between wide legs. Lead with the heart.'),
      ex('Pigeon', 55, 'pigeon', 'Glutes', 'Release the hips after deep straddle work.', 'both'),
    ],
  },
];

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'Splits', label: 'Splits' },
  { key: 'Flexibility', label: 'Flexibility' },
  { key: 'Morning', label: 'Morning' },
  { key: 'Recovery', label: 'Recovery' },
  { key: 'Posture', label: 'Posture' },
];

export function getRoutine(id: string): Routine | undefined {
  return ROUTINES.find((r) => r.id === id);
}

export function routineSeconds(r: Routine): number {
  return r.exercises.reduce((s, e) => s + e.duration, 0);
}

/** A sensible default "daily" routine. */
export const DAILY_ROUTINE_ID = 'r_morning_wake';
