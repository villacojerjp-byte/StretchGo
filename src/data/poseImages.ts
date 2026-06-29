import { ImageSourcePropType } from 'react-native';
import { PoseKey } from './routines';

/**
 * Bundled colour photos of gymnasts & dancers in real flexibility positions
 * (splits, oversplits, backbends, bridges, lunges). Free-licensed (Pexels),
 * bundled so the app stays offline and self-contained.
 */
const seated = require('../../assets/poses/pose_seated.jpg');
const frontsplit = require('../../assets/poses/g_frontsplit.jpg');
const frontsplit2 = require('../../assets/poses/g_frontsplit2.jpg');
const middlesplit = require('../../assets/poses/g_middlesplit.jpg');
const oversplit = require('../../assets/poses/g_oversplit.jpg');
const lunge = require('../../assets/poses/g_lunge.jpg');
const pancake = require('../../assets/poses/g_pancake.jpg');
const backbend = require('../../assets/poses/g_backbend.jpg');
const bridge = require('../../assets/poses/g_bridge.jpg');
const standsplit = require('../../assets/poses/g_standsplit.jpg');
const leap = require('../../assets/poses/g_leap.jpg');

/** Each stretch pose → the gymnastics/dance photo that best shows it. */
export const POSE_IMAGES: Record<PoseKey, ImageSourcePropType> = {
  breathing: seated,
  forwardFold: pancake,
  lunge: lunge,
  butterfly: seated,
  seatedTwist: bridge,
  cobra: backbend,
  childPose: pancake,
  hamstring: middlesplit,
  pigeon: backbend,
  sideBend: middlesplit,
  catCow: bridge,
  shoulderRoll: standsplit,
  neckRelease: seated,
  splitSlide: frontsplit,
  quadStretch: standsplit,
  calf: lunge,
};

/**
 * A distinct hero photo per routine so the list never looks repetitive.
 * Ordered so the same image never lands on adjacent rows.
 */
export const ROUTINE_IMAGES: Record<string, ImageSourcePropType> = {
  r_front_splits: frontsplit,
  r_middle_splits: middlesplit,
  r_morning_wake: lunge,
  r_evening_unwind: pancake,
  r_posture_reset: standsplit,
  r_full_flex: backbend,
  r_lower_back: bridge,
  r_advanced_splits: oversplit,
  r_morning_energise: leap,
  r_tech_neck: seated,
  r_hip_opener: lunge,
  r_deep_sleep: pancake,
  r_straddle_pancake: frontsplit2,
};

/** Striking hero for the welcome / marketing surfaces. */
export const HERO_IMAGE: ImageSourcePropType = middlesplit;
export const CALM_IMAGE: ImageSourcePropType = seated;
