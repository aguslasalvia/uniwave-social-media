import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useColors } from "@/hooks/useColors";


export function SkeletonEventCard() {
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
      style={[
        styles.container,
        { borderColor: colors.border, opacity: fadeAnim },
      ]}
    >
      <View style={styles.topRow}>
        <View style={[styles.emojiSkeleton, bone]} />
        <View style={[styles.categorySkeleton, bone]} />
      </View>
      <View style={[styles.titleSkeleton, bone]} />
      <View style={[styles.descriptionSkeleton, bone]} />
      <View style={styles.detailsRow}>
        <View style={[styles.detailSkeleton, bone]} />
        <View style={[styles.detailSkeleton, bone]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 264,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 12,
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  emojiSkeleton: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  categorySkeleton: {
    width: 72,
    height: 10,
    borderRadius: 5,
  },
  titleSkeleton: {
    width: "80%",
    height: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  descriptionSkeleton: {
    width: "100%",
    height: 12,
    borderRadius: 6,
    marginBottom: 14,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailSkeleton: {
    width: "40%",
    height: 10,
    borderRadius: 5,
  },
});
