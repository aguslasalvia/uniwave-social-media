import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { Colors } from "@/constants/Colors";
import { PostAuthor } from "@/core/Post";
import { useColorScheme } from "@/hooks/useColorScheme";

interface PostCardProps {
  user?: PostAuthor;
  content: string;
  likes?: string[];
  comments?: number;
  likedByMe?: boolean;
  image?: string[];
  onPress?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export function PostCard({
  user,
  content,
  likes,
  comments,
  likedByMe = false,
  image,
  onPress,
  onLike,
  onComment,
  onShare,
}: PostCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const likesCount = likes?.length ?? 0;
  const commentsCount = comments ?? 0;
  const displayName = user?.fullName || user?.username || "Usuario";
  const firstImage = image && image.length > 0 ? image[0] : null;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colorScheme === "dark" ? "#1e293b" : "#ffffff",
          borderColor: colorScheme === "dark" ? "#334155" : "#e2e8f0",
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
            {user?.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatarImage}
              />
            ) : (
              <ThemedText style={styles.avatarText}>
                {displayName.charAt(0).toUpperCase()}
              </ThemedText>
            )}
          </View>
          <View style={styles.userDetails}>
            <ThemedText style={[styles.userName, { color: colors.text }]}>
              {displayName}
            </ThemedText>
            {!!user?.university && (
              <View style={styles.universityBadge}>
                <ThemedText style={styles.universityText}>
                  {user.university}
                </ThemedText>
              </View>
            )}
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons
              name="ellipsis-horizontal"
              size={16}
              color={colors.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <ThemedText style={[styles.content, { color: colors.text }]}>
          {content}
        </ThemedText>

        {/* Image */}
        {firstImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: firstImage }}
              style={styles.postImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* Action buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={onLike}>
            <Ionicons
              name={likedByMe ? "heart" : "heart-outline"}
              size={18}
              color={likedByMe ? "#ef4444" : colors.icon}
            />
            <ThemedText style={[styles.actionText, { color: colors.icon }]}>
              {likesCount}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onComment}>
            <Ionicons name="chatbubble-outline" size={18} color={colors.icon} />
            <ThemedText style={[styles.actionText, { color: colors.icon }]}>
              {commentsCount}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onShare}>
            <Ionicons name="share-outline" size={18} color={colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bookmark-outline" size={18} color={colors.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "700",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  universityBadge: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  universityText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#3b82f6",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeText: {
    fontSize: 12,
    fontWeight: "400",
  },
  moreButton: {
    padding: 4,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  imageContainer: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
