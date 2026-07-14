import {
  CheckCircle2,
  CircleAlert,
  Info,
  LucideIcon,
  Waves,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { withAlpha } from "@/constants/Colors";

import { ToastType, useToast } from "./ToastProvider";
import { useColors } from "@/hooks/useColors";

const ICONS: Record<ToastType, LucideIcon> = {
  success: CheckCircle2,
  error: CircleAlert,
  info: Info,
};

/**
 * Renders the currently active toast. RN's `<Modal>` opens its own
 * native layer above everything else, so a single instance mounted at
 * the app root won't show while a modal is open — mount one instance
 * per modal too; they all read the same shared context state.
 */
export function ToastHost() {
  const { toast, dismissToast } = useToast();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const [rendered, setRendered] = useState(toast);
  const translateY = useRef(new Animated.Value(-60)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      setRendered(toast);
      translateY.setValue(-60);
      scale.setValue(0.9);
      opacity.setValue(0);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 13,
          mass: 0.8,
          stiffness: 240,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          damping: 11,
          mass: 0.8,
          stiffness: 240,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (rendered) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -60,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 160,
          useNativeDriver: true,
        }),
      ]).start(() => setRendered(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  if (!rendered) return null;

  const Icon = ICONS[rendered.type];
  const fill =
    rendered.type === "success"
      ? "#10b981"
      : rendered.type === "error"
        ? colors.danger
        : colors.tint;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrapper, { top: Math.max(insets.top, 20) + 8 }]}
    >
      <Animated.View
        style={{
          transform: [{ translateY }, { scale }],
          opacity,
          width: "100%",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={dismissToast}
          style={[
            styles.card,
            {
              backgroundColor: fill,
              boxShadow: `0px 10px 24px ${withAlpha(fill, 0.4)}`,
            },
          ]}
        >
          <Waves
            size={72}
            color="#ffffff"
            strokeWidth={1.5}
            style={styles.watermark}
          />

          <View style={styles.iconWell}>
            <Icon size={19} color="#ffffff" strokeWidth={2.6} />
          </View>
          <Text style={styles.message} numberOfLines={2}>
            {rendered.message}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 999,
    elevation: 999,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 60,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    overflow: "hidden",
    elevation: 10,
  },
  watermark: {
    position: "absolute",
    right: -14,
    bottom: -18,
    opacity: 0.16,
    transform: [{ rotate: "-8deg" }],
  },
  iconWell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14.5,
    lineHeight: 19,
    fontFamily: "SpaceGrotesk_600SemiBold",
  },
});
