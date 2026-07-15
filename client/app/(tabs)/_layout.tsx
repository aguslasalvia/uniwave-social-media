import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Compass, House, LucideIcon, UserRound, X } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { withAlpha } from "@/constants/Colors";
import { hardShadow } from "@/constants/Design";
import { useColors } from "@/hooks/useColors";

const TAB_META: Record<string, { icon: LucideIcon; label: string }> = {
  home: { icon: House, label: "Inicio" },
  explore: { icon: Compass, label: "Explorar" },
  profile: { icon: UserRound, label: "Perfil" },
};

// Floating navigation bubble: collapsed it shows the current page's icon;
// tapping it fans the page options out to the left.
function BubbleTabBar({ state, navigation }: BottomTabBarProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  const setOpenAnimated = (next: boolean) => {
    setOpen(next);
    Animated.spring(progress, {
      toValue: next ? 1 : 0,
      friction: 7,
      tension: 90,
      useNativeDriver: true,
    }).start();
  };

  const handleOptionPress = (routeKey: string, routeName: string) => {
    setOpenAnimated(false);
    const event = navigation.emit({
      type: "tabPress",
      target: routeKey,
      canPreventDefault: true,
    });
    if (!event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  const activeRoute = state.routes[state.index];
  const ActiveIcon = TAB_META[activeRoute.name]?.icon ?? House;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {open && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setOpenAnimated(false)}
          accessibilityLabel="Cerrar navegación"
        />
      )}
      <View
        pointerEvents="box-none"
        style={[styles.dock, { bottom: Math.max(insets.bottom, 16) + 16 }]}
      >
        <View
          pointerEvents={open ? "auto" : "none"}
          style={styles.options}
        >
          {state.routes.map((route, index) => {
            const meta = TAB_META[route.name];
            if (!meta) return null;
            const focused = state.index === index;
            const Icon = meta.icon;
            // Closed state tucks each option toward the main bubble.
            const shift = (state.routes.length - index) * 18;
            return (
              <Animated.View
                key={route.key}
                style={{
                  opacity: progress,
                  transform: [
                    {
                      translateX: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [shift, 0],
                      }),
                    },
                    {
                      scale: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.6, 1],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  onPress={() => handleOptionPress(route.key, route.name)}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel={meta.label}
                  accessibilityState={{ selected: focused }}
                  style={[
                    styles.optionBubble,
                    {
                      backgroundColor: colors.surface,
                      borderColor: withAlpha(colors.tint, 0.25),
                      boxShadow: hardShadow(withAlpha(colors.tint, 0.35), 3),
                    },
                  ]}
                >
                  {/* Tint layered over the solid surface so the bubble
                      never lets the screen content show through. */}
                  {focused && (
                    <View
                      pointerEvents="none"
                      style={[
                        StyleSheet.absoluteFill,
                        {
                          borderRadius: 28,
                          backgroundColor: withAlpha(colors.tint, 0.14),
                        },
                      ]}
                    />
                  )}
                  <Icon
                    size={22}
                    color={focused ? colors.tint : colors.textMuted}
                    strokeWidth={focused ? 2.3 : 1.8}
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => setOpenAnimated(!open)}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={open ? "Cerrar navegación" : "Abrir navegación"}
          accessibilityState={{ expanded: open }}
          style={[
            styles.mainBubble,
            {
              backgroundColor: colors.text,
              boxShadow: hardShadow(colors.tint, 3),
            },
          ]}
        >
          {open ? (
            <X size={24} color={colors.background} strokeWidth={2.2} />
          ) : (
            <ActiveIcon size={24} color={colors.background} strokeWidth={2.3} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BubbleTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: "Inicio" }} />
      <Tabs.Screen name="explore" options={{ title: "Explorar" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  dock: {
    position: "absolute",
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  mainBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
