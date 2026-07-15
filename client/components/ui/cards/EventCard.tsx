import {
  Bookmark,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { withAlpha } from "@/constants/Colors";
import { Fonts, Radius } from "@/constants/Design";
import { useColors } from "@/hooks/useColors";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  category: string;
  onPress?: () => void;
}

export function EventCard({
  title,
  description,
  date,
  time,
  location,
  attendees,
  image,
  category,
  onPress,
}: EventCardProps) {
  const colors = useColors();

  // Mock/backend data may send either a photo URL or an emoji.
  const isPhoto = image.startsWith("http");

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: withAlpha(colors.tint, 0.18),
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {isPhoto && (
        <Image source={{ uri: image }} style={styles.banner} resizeMode="cover" />
      )}
      <View style={styles.topRow}>
        {!isPhoto && <Text style={styles.emoji}>{image}</Text>}
        <ThemedText style={[styles.category, { color: colors.tint }]}>
          {category}
        </ThemedText>
        <TouchableOpacity
          style={styles.bookmarkButton}
          accessibilityLabel="Guardar evento"
        >
          <Bookmark size={18} color={colors.textMuted} strokeWidth={1.8} />
        </TouchableOpacity>
      </View>

      <ThemedText
        style={[styles.title, { color: colors.text }]}
        numberOfLines={2}
      >
        {title}
      </ThemedText>

      <ThemedText
        style={[styles.description, { color: colors.textMuted }]}
        numberOfLines={2}
      >
        {description}
      </ThemedText>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <CalendarDays size={14} color={colors.textMuted} strokeWidth={1.8} />
          <ThemedText style={[styles.detailText, { color: colors.textMuted }]}>
            {date} · {time}
          </ThemedText>
        </View>

        <View style={styles.detailItem}>
          <MapPin size={14} color={colors.textMuted} strokeWidth={1.8} />
          <ThemedText
            style={[styles.detailText, { color: colors.textMuted }]}
            numberOfLines={1}
          >
            {location}
          </ThemedText>
        </View>

        <View style={styles.detailItem}>
          <Users size={14} color={colors.textMuted} strokeWidth={1.8} />
          <ThemedText style={[styles.detailText, { color: colors.textMuted }]}>
            {attendees} asistentes
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 264,
    borderRadius: Radius.card,
    borderWidth: 1,
    marginRight: 12,
    padding: 16,
  },
  banner: {
    width: "100%",
    height: 110,
    borderRadius: 10,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
  },
  category: {
    flex: 1,
    fontFamily: Fonts.mono,
    fontSize: 10.5,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  bookmarkButton: {
    padding: 2,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 5,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  details: {
    gap: 6,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  detailText: {
    fontSize: 12.5,
    flex: 1,
  },
});
