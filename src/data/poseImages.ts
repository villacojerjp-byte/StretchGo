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
// Literal pose photos — each shows a person actually doing that exercise.
const forwardfold = require('../../assets/poses/g_forwardfold.jpg');
const twist = require('../../assets/poses/g_twist.jpg');
const childpose = require('../../assets/poses/g_childpose.jpg');
const pigeon = require('../../assets/poses/g_pigeon.jpg');
const sidebend = require('../../assets/poses/g_sidebend.jpg');
const shoulder = require('../../assets/poses/g_shoulder.jpg');
const quad = require('../../assets/poses/g_quad.jpg');
const butterfly = require('../../assets/poses/g_butterfly.jpg');
const catcow = require('../../assets/poses/g_catcow.jpg');
const cobra = require('../../assets/poses/g_cobra.jpg');
const calf = require('../../assets/poses/g_calf.jpg');
const neck = require('../../assets/poses/g_neck.jpg');
const breathReach = require('../../assets/poses/g_breathing.jpg');
const hamstring = require('../../assets/poses/g_hamstring.jpg');

/** Each stretch pose → a photo of a person literally doing that exercise. */
export const POSE_IMAGES: Record<PoseKey, ImageSourcePropType> = {
  breathing: breathReach,
  forwardFold: forwardfold,
  lunge: lunge,
  butterfly: butterfly,
  seatedTwist: twist,
  cobra: cobra,
  childPose: childpose,
  hamstring: hamstring,
  pigeon: pigeon,
  sideBend: sidebend,
  catCow: catcow,
  shoulderRoll: shoulder,
  neckRelease: neck,
  splitSlide: frontsplit,
  quadStretch: quad,
  calf: calf,
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
