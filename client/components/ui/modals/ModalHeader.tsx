import { X } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Fonts, Radius, hardShadow } from "@/constants/Design";
import { useColors } from "@/hooks/useColors";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
  actionDisabled?: boolean;
}

/**
 * Shared modal top bar: close button, display title and an optional
 * primary action styled like a small landing CTA (hard offset shadow).
 */
export function ModalHeader({
  title,
  onClose,
  actionLabel,
  onAction,
  actionDisabled = false,
}: ModalHeaderProps) {
  const colors = useColors();

  return (
    <View style={[styles.header, { borderBottomColor: colors.border }]}>
      <TouchableOpacity
        onPress={onClose}
        style={styles.closeButton}
        accessibilityLabel="Cerrar"
      >
        <X size={22} color={colors.text} strokeWidth={2} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          disabled={actionDisabled}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.action,
            {
              backgroundColor: colors.text,
              boxShadow: hardShadow(colors.tint, pressed ? 0 : 3),
              transform: pressed
                ? [{ translateX: 3 }, { translateY: 3 }]
                : [],
              opacity: actionDisabled ? 0.5 : 1,
            },
          ]}
        >
          <Text style={[styles.actionLabel, { color: colors.background }]}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : (
        // Keeps the title centered when there is no action.
        <View style={styles.closeButton} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  closeButton: {
    width: 38,
    padding: 8,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 16,
  },
  action: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: Radius.action,
  },
  actionLabel: {
    fontFamily: Fonts.display,
    fontSize: 13,
  },
});
