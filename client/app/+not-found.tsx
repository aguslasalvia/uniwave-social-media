import { Link, Stack } from "expo-router";
import { Waves } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { withAlpha } from "@/constants/Colors";
import { Fonts, Radius, hardShadow } from "@/constants/Design";
import { useColors } from "@/hooks/useColors";

export default function NotFoundScreen() {
  const colors = useColors();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Página no encontrada",
          headerShown: false,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View
          style={[
            styles.iconWell,
            { backgroundColor: withAlpha(colors.tint, 0.12) },
          ]}
        >
          <Waves size={36} color={colors.tint} strokeWidth={2} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>
          Te alejaste de la ola
        </Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Esta página no existe
        </Text>
        <Link
          href="/"
          style={[
            styles.link,
            {
              backgroundColor: colors.text,
              boxShadow: hardShadow(colors.tint),
            },
          ]}
        >
          <Text style={[styles.linkText, { color: colors.background }]}>
            Volver al inicio
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  iconWell: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: Fonts.displayHeavy,
    fontSize: 22,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 28,
  },
  link: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: Radius.action,
    overflow: "hidden",
  },
  linkText: {
    fontFamily: Fonts.display,
    fontSize: 15,
  },
});
