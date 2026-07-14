import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

interface WaveMarkProps {
  size?: number;
  color: string;
}

/**
 * UniWave brand mark: two stacked waves inside a rounded square.
 * `color` is expected to be the current theme tint so the mark follows
 * runtime theme changes.
 */
export function WaveMark({ size = 64, color }: WaveMarkProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Rect width={64} height={64} rx={20} fill={color} />
      <Path
        d="M8 26 c4 -7 12 -7 16 0 c4 7 12 7 16 0 c4 -7 12 -7 16 0"
        stroke="#ffffff"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M8 40 c4 -7 12 -7 16 0 c4 7 12 7 16 0 c4 -7 12 -7 16 0"
        stroke="#ffffff"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        opacity={0.5}
      />
    </Svg>
  );
}
