import { ImageSourcePropType } from 'react-native';
import { PoseKey } from './routines';

/**
 * Bundled black & white model photos (free-licensed Unsplash stock, desaturated).
 * Each stretch pose maps to the closest matching photograph. Bundling keeps the
 * app fully offline and self-contained.
 */
const meditation = require('../../assets/poses/pose_meditation.jpg');
const lunge = require('../../assets/poses/pose_lunge.jpg');
const fold = require('../../assets/poses/pose_fold.jpg');
const seated = require('../../assets/poses/pose_seated.jpg');
const standing = require('../../assets/poses/pose_standing.jpg');
const straddle = require('../../assets/poses/pose_straddle.jpg');
const mermaid = require('../../assets/poses/pose_mermaid.jpg');
const studio = require('../../assets/poses/pose_studio.jpg');
const steps = require('../../assets/poses/pose_steps.jpg');
const pilates = require('../../assets/poses/pose_pilates.jpg');

export const POSE_IMAGES: Record<PoseKey, ImageSourcePropType> = {
  breathing: meditation,
  forwardFold: straddle,
  lunge: lunge,
  butterfly: seated,
  seatedTwist: seated,
  cobra: mermaid,
  childPose: fold,
  hamstring: straddle,
  pigeon: mermaid,
  sideBend: mermaid,
  catCow: fold,
  shoulderRoll: standing,
  neckRelease: seated,
  splitSlide: straddle,
  quadStretch: standing,
  calf: lunge,
};

/**
 * A distinct hero photo per routine so the list never looks repetitive.
 * Ordered to avoid the same image appearing on adjacent rows.
 */
export const ROUTINE_IMAGES: Record<string, ImageSourcePropType> = {
  r_front_splits: straddle,
  r_middle_splits: mermaid,
  r_morning_wake: meditation,
  r_evening_unwind: seated,
  r_posture_reset: studio,
  r_full_flex: standing,
  r_lower_back: fold,
  r_advanced_splits: lunge,
  r_morning_energise: steps,
  r_tech_neck: pilates,
  r_hip_opener: mermaid,
  r_deep_sleep: meditation,
  r_straddle_pancake: straddle,
};

/** A hero image for marketing / welcome surfaces. */
export const HERO_IMAGE: ImageSourcePropType = standing;
export const CALM_IMAGE: ImageSourcePropType = meditation;
