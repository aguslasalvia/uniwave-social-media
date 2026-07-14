import {
  Bookmark,
  Ellipsis,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ui/themed";
import { withAlpha } from "@/constants/Colors";
import { PostAuthor } from "@/core/Post";
import { useColors } from "@/hooks/useColors";
import { timeAgo } from "@/utils/time";

interface PostCardProps {
  user?: PostAuthor;
  content: string;
  likes?: string[];
  comments?: number;
  likedByMe?: boolean;
  image?: string[];
  createdAt?: number;
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
  createdAt,
  onPress,
  onLike,
  onComment,
  onShare,
}: PostCardProps) {
  const colors = useColors();

  const likesCount = likes?.length ?? 0;
  const commentsCount = comments ?? 0;
  const displayName = user?.fullName || user?.username || "Usuario";
  const firstImage = image && image.length > 0 ? image[0] : null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: withAlpha(colors.tint, 0.14) },
          ]}
        >
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
          ) : (
            <ThemedText style={[styles.avatarText, { color: colors.tint }]}>
              {displayName.charAt(0).toUpperCase()}
            </ThemedText>
          )}
        </View>
        <View style={styles.userDetails}>
          <View style={styles.nameRow}>
            <ThemedText
              style={[styles.userName, { color: colors.text }]}
              numberOfLines={1}
            >
              {displayName}
            </ThemedText>
            {createdAt != null && (
              <ThemedText style={[styles.timestamp, { color: colors.textMuted }]}>
                · {timeAgo(createdAt)}
              </ThemedText>
            )}
          </View>
          {!!user?.university && (
            <ThemedText
              style={[styles.university, { color: colors.textMuted }]}
              numberOfLines={1}
            >
              {user.university}
            </ThemedText>
          )}
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ellipsis size={18} color={colors.textMuted} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ThemedText style={[styles.content, { color: colors.text }]}>
        {content}
      </ThemedText>

      {firstImage && (
        <Image
          source={{ uri: firstImage }}
          style={[styles.postImage, { borderColor: colors.border }]}
          resizeMode="cover"
        />
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onLike}
          accessibilityLabel={likedByMe ? "Quitar me gusta" : "Me gusta"}
        >
          <Heart
            size={19}
            color={likedByMe ? colors.danger : colors.textMuted}
            fill={likedByMe ? colors.danger : "none"}
            strokeWidth={1.8}
          />
          <ThemedText
            style={[
              styles.actionText,
              { color: likedByMe ? colors.danger : colors.textMuted },
            ]}
          >
            {likesCount}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onComment}
          accessibilityLabel="Comentar"
        >
          <MessageCircle size={19} color={colors.textMuted} strokeWidth={1.8} />
          <ThemedText style={[styles.actionText, { color: colors.textMuted }]}>
            {commentsCount}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onShare}
          accessibilityLabel="Compartir"
        >
          <Share2 size={19} color={colors.textMuted} strokeWidth={1.8} />
        </TouchableOpacity>

        <View style={styles.actionsSpacer} />

        <TouchableOpacity
          style={styles.actionButton}
          accessibilityLabel="Guardar"
        >
          <Bookmark size={19} color={colors.textMuted} strokeWidth={1.8} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "800",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    flex: 1,
    gap: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
  },
  userName: {
    fontSize: 15,
    fontWeight: "700",
    flexShrink: 1,
  },
  timestamp: {
    fontSize: 13,
  },
  university: {
    fontSize: 12.5,
  },
  moreButton: {
    padding: 6,
    marginLeft: 6,
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
  },
  postImage: {
    width: "100%",
    height: 210,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: -10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  actionsSpacer: {
    flex: 1,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
