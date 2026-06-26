import React from 'react';
import Svg, { Circle, Path, Line, G } from 'react-native-svg';
import { PoseKey } from '../data/routines';
import { colors } from '../theme';

/**
 * Minimal, original line-art figures for each stretch pose.
 * Drawn on a 100x100 canvas, pure monochrome to match the design system.
 */

type Props = { pose: PoseKey; size?: number; stroke?: string; faint?: boolean };

const SW = 5.2;

function Figure({ pose, stroke }: { pose: PoseKey; stroke: string }) {
  const common = {
    stroke,
    strokeWidth: SW,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };
  const ground = <Line x1={10} y1={88} x2={90} y2={88} stroke={stroke} strokeWidth={3} strokeLinecap="round" opacity={0.25} />;
  const head = (cx: number, cy: number, r = 7) => <Circle cx={cx} cy={cy} r={r} fill={stroke} />;

  switch (pose) {
    case 'breathing':
      return (
        <G>
          {ground}
          {head(50, 26)}
          <Path d="M50 33 L50 62" {...common} />
          <Path d="M50 44 C40 50 34 54 30 60 M50 44 C60 50 66 54 70 60" {...common} />
          <Path d="M50 62 C36 64 30 74 28 80 L72 80 C70 74 64 64 50 62 Z" {...common} />
        </G>
      );
    case 'forwardFold':
      return (
        <G>
          {ground}
          <Path d="M40 86 L40 50 M60 86 L60 50" {...common} />
          <Path d="M40 50 C40 40 60 40 60 50" {...common} />
          <Path d="M50 44 C46 56 44 66 42 76 M50 44 C54 56 56 66 58 76" {...common} />
          {head(50, 70)}
        </G>
      );
    case 'lunge':
      return (
        <G>
          {ground}
          {head(34, 28)}
          <Path d="M34 35 L40 60" {...common} />
          <Path d="M40 60 L30 86 M40 60 L40 78 L70 86" {...common} />
          <Path d="M37 44 L24 54 M37 44 L52 40" {...common} />
        </G>
      );
    case 'butterfly':
      return (
        <G>
          {ground}
          {head(50, 30)}
          <Path d="M50 37 L50 60" {...common} />
          <Path d="M50 60 L30 82 L50 76 L70 82 L50 60" {...common} />
          <Path d="M50 48 L34 78 M50 48 L66 78" {...common} />
        </G>
      );
    case 'seatedTwist':
      return (
        <G>
          {ground}
          {head(56, 28)}
          <Path d="M54 35 C52 46 50 54 46 60" {...common} />
          <Path d="M46 60 L24 76 M46 60 L70 70" {...common} />
          <Path d="M50 46 C62 44 66 52 64 60" {...common} />
        </G>
      );
    case 'cobra':
      return (
        <G>
          {ground}
          {head(30, 40)}
          <Path d="M36 44 C50 50 66 56 84 60" {...common} />
          <Path d="M44 47 L40 64 M58 52 L56 66" {...common} />
          <Path d="M84 60 L72 78" {...common} />
        </G>
      );
    case 'childPose':
      return (
        <G>
          {ground}
          <Path d="M28 80 L70 80" {...common} />
          <Path d="M28 80 C40 60 56 56 70 60" {...common} />
          {head(30, 70)}
          <Path d="M40 66 L20 60 M52 62 L24 58" {...common} opacity={0.9} />
        </G>
      );
    case 'hamstring':
      return (
        <G>
          {ground}
          {head(34, 40)}
          <Path d="M40 44 C54 50 70 54 84 56" {...common} />
          <Path d="M40 80 L84 80" {...common} />
          <Path d="M48 48 L80 60" {...common} />
        </G>
      );
    case 'pigeon':
      return (
        <G>
          {ground}
          {head(36, 36)}
          <Path d="M40 42 C50 50 56 56 60 62" {...common} />
          <Path d="M22 78 L78 78" {...common} />
          <Path d="M60 62 L80 70 M40 50 L26 70" {...common} />
        </G>
      );
    case 'sideBend':
      return (
        <G>
          {ground}
          {head(58, 26)}
          <Path d="M54 33 C50 44 48 54 46 64" {...common} />
          <Path d="M46 64 L42 86 M46 64 L56 86" {...common} />
          <Path d="M50 42 C58 34 64 30 70 30 M48 50 L40 58" {...common} />
        </G>
      );
    case 'catCow':
      return (
        <G>
          {ground}
          {head(26, 50)}
          <Path d="M32 50 C46 40 60 40 76 50" {...common} />
          <Path d="M36 52 L34 80 M72 52 L74 80" {...common} />
        </G>
      );
    case 'shoulderRoll':
      return (
        <G>
          {ground}
          {head(50, 26)}
          <Path d="M50 33 L50 74" {...common} />
          <Path d="M50 42 C38 42 32 50 32 58 M50 42 C62 42 68 50 68 58" {...common} />
          <Path d="M50 74 L40 86 M50 74 L60 86" {...common} />
        </G>
      );
    case 'neckRelease':
      return (
        <G>
          {ground}
          {head(44, 28, 7.5)}
          <Path d="M46 35 L52 72" {...common} />
          <Path d="M50 44 L34 56 M50 44 L66 52" {...common} />
          <Path d="M52 72 L44 86 M52 72 L60 86" {...common} />
        </G>
      );
    case 'splitSlide':
      return (
        <G>
          {ground}
          {head(50, 36)}
          <Path d="M50 43 L50 64" {...common} />
          <Path d="M50 64 L18 82 M50 64 L82 82" {...common} />
          <Path d="M50 50 L36 60 M50 50 L64 60" {...common} />
        </G>
      );
    case 'quadStretch':
      return (
        <G>
          {ground}
          {head(48, 24)}
          <Path d="M48 31 L48 60" {...common} />
          <Path d="M48 60 L44 86 M48 60 C62 64 66 76 56 84" {...common} />
          <Path d="M48 40 L62 50" {...common} />
        </G>
      );
    case 'calf':
      return (
        <G>
          {ground}
          {head(34, 30)}
          <Path d="M36 36 L46 58" {...common} />
          <Path d="M46 58 L34 84 M46 58 L74 84" {...common} />
          <Path d="M40 46 L60 50" {...common} />
        </G>
      );
    default:
      return (
        <G>
          {ground}
          {head(50, 30)}
          <Path d="M50 37 L50 70" {...common} />
        </G>
      );
  }
}

export default function PoseArt({ pose, size = 120, stroke = colors.ink }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Figure pose={pose} stroke={stroke} />
    </Svg>
  );
}
