import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useColors } from "@/hooks/useColors";


interface SkeletonCardProps {
  width?: number;
  height?: number;
  style?: any;
}

export function SkeletonCard({
  width = 96,
  height = 116,
  style,
}: SkeletonCardProps) {
  const colors = useColors();
  const fadeAnim = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.35,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [fadeAnim]);

  const bone = { backgroundColor: colors.surfaceMuted };

  return (
    <Animated.View
      style={[styles.container, { width, height, opacity: fadeAnim }, style]}
    >
      <View style={[styles.iconSkeleton, bone]} />
      <View style={styles.contentSkeleton}>
        <View style={[styles.titleSkeleton, bone]} />
        <View style={[styles.subtitleSkeleton, bone]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 18,
    alignItems: "center",
  },
  iconSkeleton: {
    width: 52,
    height: 52,
    borderRadius: 17,
    marginBottom: 10,
  },
  contentSkeleton: {
    alignItems: "center",
    width: "100%",
  },
  titleSkeleton: {
    width: "80%",
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  subtitleSkeleton: {
    width: "60%",
    height: 10,
    borderRadius: 5,
  },
});
