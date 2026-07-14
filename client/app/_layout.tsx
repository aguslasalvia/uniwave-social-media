import {
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/hooks/useAuth";
import { useColors } from "@/hooks/useColors";
import { ActivityIndicator, View } from "react-native";
import { ToastHost, ToastProvider } from "@/components/ui/toast";
import { useMemo } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = useColors();

  // React Navigation paints every screen/tab background from its own theme,
  // so it must follow the university palette instead of the stock themes.
  const navigationTheme = useMemo(() => {
    const base = colorScheme === "dark" ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: colors.tint,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        notification: colors.danger,
      },
    };
  }, [colorScheme, colors]);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });

  const { isAuthenticated, loading } = useAuth();

  if (!loaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={navigationTheme}>
      <ToastProvider>
        <StatusBar
          style={colorScheme === "dark" ? "light" : "dark"}
          backgroundColor="transparent"
          translucent
        />

        <Stack screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="index" />
          )}
          <Stack.Screen name="+not-found" />
        </Stack>

        <ToastHost />
      </ToastProvider>
    </ThemeProvider>
  );
}
