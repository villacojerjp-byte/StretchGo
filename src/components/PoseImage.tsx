import React, { useState } from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, View, ViewStyle } from 'react-native';
import { PoseKey } from '../data/routines';
import { POSE_IMAGES } from '../data/poseImages';
import PoseArt from './PoseArt';
import { colors } from '../theme';

type Props = {
  pose: PoseKey;
  /** Optional explicit image (e.g. a per-routine hero); defaults to the pose photo. */
  source?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain';
  fallbackSize?: number;
};

/**
 * Renders the bundled colour model photo for a pose (or an explicit source).
 * Falls back to the original line-art figure if an image fails to decode.
 */
export default function PoseImage({ pose, source, style, resizeMode = 'cover', fallbackSize = 90 }: Props) {
  const src = source ?? POSE_IMAGES[pose];
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <View style={[{ alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface }, style as StyleProp<ViewStyle>]}>
        <PoseArt pose={pose} size={fallbackSize} stroke={colors.ink} />
      </View>
    );
  }

  return <Image source={src} resizeMode={resizeMode} onError={() => setFailed(true)} style={style} />;
}
