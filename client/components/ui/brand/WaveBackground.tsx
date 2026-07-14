import React, { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Svg, { Path } from "react-native-svg";

import { withAlpha } from "@/constants/Colors";

interface WaveLayerProps {
  width: number;
  height: number;
  amplitude: number;
  baseline: number;
  color: string;
  duration: number;
  animated: boolean;
}

/** Builds a seamless two-screen-wide sine band filled down to the bottom. */
const wavePath = (
  width: number,
  height: number,
  amplitude: number,
  baseline: number,
) => {
  const half = width / 2;
  // First curve sets the control point; each `t` mirrors it, producing a
  // continuous sine. Four half-periods span exactly 2x the screen width,
  // so translating by -width loops seamlessly.
  return (
    `M0 ${baseline} q ${half / 2} ${-amplitude} ${half} 0` +
    ` t ${half} 0 t ${half} 0 t ${half} 0` +
    ` L ${width * 2} ${height} L 0 ${height} Z`
  );
};

function WaveLayer({
  width,
  height,
  amplitude,
  baseline,
  color,
  duration,
  animated,
}: WaveLayerProps) {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) {
      translateX.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(translateX, {
        toValue: -width,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [animated, duration, translateX, width]);

  return (
    <Animated.View
      style={[styles.layer, { width: width * 2, transform: [{ translateX }] }]}
    >
      <Svg width={width * 2} height={height}>
        <Path d={wavePath(width, height, amplitude, baseline)} fill={color} />
      </Svg>
    </Animated.View>
  );
}

interface WaveBackgroundProps {
  color: string;
  height?: number;
}

/**
 * Ambient animated waves pinned to the bottom of the screen — the UniWave
 * login signature. Falls back to a static composition when the system
 * reduce-motion setting is on.
 */
export function WaveBackground({ color, height = 220 }: WaveBackgroundProps) {
  const { width } = useWindowDimensions();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReduceMotion(enabled);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.container, { height }]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <WaveLayer
        width={width}
        height={height}
        amplitude={26}
        baseline={70}
        color={withAlpha(color, 0.08)}
        duration={26000}
        animated={!reduceMotion}
      />
      <WaveLayer
        width={width}
        height={height}
        amplitude={32}
        baseline={104}
        color={withAlpha(color, 0.12)}
        duration={18000}
        animated={!reduceMotion}
      />
      <WaveLayer
        width={width}
        height={height}
        amplitude={24}
        baseline={146}
        color={withAlpha(color, 0.18)}
        duration={12000}
        animated={!reduceMotion}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
  },
});
