import { StyleSheet, Text, type TextProps } from "react-native";

import { Fonts } from "@/constants/Design";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  // Display types use the brand face; do not add fontWeight on top of a
  // static font file (Android would fake-bold it).
  title: {
    fontFamily: Fonts.displayHeavy,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.8,
  },
  subtitle: {
    fontFamily: Fonts.display,
    fontSize: 20,
    letterSpacing: -0.3,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontWeight: "600",
  },
});
