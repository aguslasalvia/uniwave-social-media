import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import { withAlpha } from "@/constants/Colors";
import { Fonts, Radius } from "@/constants/Design";
import { useColors } from "@/hooks/useColors";

interface StampProps {
  children: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Mono uppercase label with a tinted border, slightly rotated — the
 * landing page's .stamp ("rubber stamp on a notice") eyebrow.
 */
export function Stamp({ children, style }: StampProps) {
  const colors = useColors();

  return (
    <View
      style={[styles.stamp, { borderColor: withAlpha(colors.tint, 0.4) }, style]}
    >
      <Text style={[styles.label, { color: colors.tint }]}>
        {children.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stamp: {
    borderWidth: 1.5,
    borderRadius: Radius.stamp,
    paddingHorizontal: 10,
    paddingVertical: 5,
    transform: [{ rotate: "-1deg" }],
    alignSelf: "center",
  },
  label: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 1.5,
  },
});
