import { router } from "expo-router";
import { Bell, Plus, Waves } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { CreatePostModal, PostCard, ThemedText } from "@/components";
import { withAlpha } from "@/constants/Colors";
import { Post } from "@/core/Post";
import { postService } from "@/services/postService";
import { useColors } from "@/hooks/useColors";
import { useUserProfile } from "@/hooks/useUserProfile";

// Fallback feed for development: shown when the API has no posts (or is
// unreachable) so the UI can be previewed with realistic content.
// Photos/avatars are seeded Lorem Picsum placeholders.
const mockUser = (
  id: number,
  username: string,
  fullName: string,
  university: string,
) => ({
  id: `mock-user-${id}`,
  username,
  fullName,
  university,
  avatar: `https://picsum.photos/seed/uw-avatar-${id}/96/96`,
});

const mockPost = (
  id: number,
  user: ReturnType<typeof mockUser>,
  content: string,
  hoursAgo: number,
  likes: number,
  comments: number,
  withImage: boolean,
): Post => ({
  id: `mock-post-${id}`,
  user,
  content,
  imageUrl: withImage
    ? [`https://picsum.photos/seed/uw-post-${id}/800/500`]
    : [],
  createdAt: Math.floor(Date.now() / 1000) - hoursAgo * 3600,
  privacy: "public",
  likes: Array.from({ length: likes }, (_, i) => `mock-like-${i}`),
  likesCount: likes,
  likedByMe: false,
  comments,
});

const mockPosts: Post[] = [
  mockPost(
    1,
    mockUser(1, "valen.perez", "Valentina Pérez", "Facultad de Química"),
    "¡Terminamos el proyecto de laboratorio! Tres semanas de trabajo pero valió la pena. Gracias al equipo 🧪",
    2,
    24,
    5,
    true,
  ),
  mockPost(
    2,
    mockUser(2, "mati.rod", "Matías Rodríguez", "Facultad de Ingeniería"),
    "¿Alguien tiene los apuntes de Cálculo 2 del semestre pasado? Los míos quedaron en la casa de mis viejos 😅",
    5,
    8,
    12,
    false,
  ),
  mockPost(
    3,
    mockUser(3, "luciagarcia", "Lucía García", "Facultad de Medicina"),
    "Atardecer desde la terraza de la facultad. A veces hay que parar y mirar un poco 🌅",
    9,
    56,
    7,
    true,
  ),
  mockPost(
    4,
    mockUser(4, "santi.f", "Santiago Fernández", "Facultad de Ciencias"),
    "Se viene la hackathon del sábado, ¿quién se prende? Todavía quedan lugares en nuestro equipo.",
    26,
    15,
    9,
    false,
  ),
  mockPost(
    5,
    mockUser(5, "cami.sosa", "Camila Sosa", "Facultad de Arquitectura"),
    "Maqueta final entregada ✔️ Ahora sí, a dormir 72 horas seguidas.",
    50,
    41,
    11,
    true,
  ),
];

export default function HomeScreen() {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const colors = useColors();
  const profile = useUserProfile();
  const insets = useSafeAreaInsets();

  const fetchPosts = useCallback(async () => {
    try {
      const data = await postService.fetchPosts();
      // In development the mock posts are appended after the real ones so
      // photo cards are always visible even if the API only has text posts.
      setPostsData(__DEV__ ? [...data, ...mockPosts] : data);
    } catch {
      setPostsData(mockPosts);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchPosts();
    } finally {
      setRefreshing(false);
    }
  }, [fetchPosts]);

  const handlePostPress = (post: any) => {
    console.log("Post pressed:", post.id);
  };

  const handleLike = async (post: Post) => {
    const liked = post.likedByMe;

    // Optimistic update
    setPostsData((prev) =>
      prev.map((p) =>
        p.id === post.id
          ? {
              ...p,
              likedByMe: !liked,
              likes: liked
                ? p.likes.slice(0, Math.max(0, p.likes.length - 1))
                : [...p.likes, "__me__"],
            }
          : p,
      ),
    );

    try {
      if (liked) {
        await postService.unlikePost(post.id);
      } else {
        await postService.likePost(post.id);
      }
    } catch {
      // Revert on failure
      setPostsData((prev) => prev.map((p) => (p.id === post.id ? post : p)));
    }
  };

  const handleShare = (postId: string) => {
    console.log("Share pressed for post:", postId);
  };

  const handleCreatePostSubmit = async (postData: FormData) => {
    try {
      await postService.createPost(postData);
      // Refresh the feed so the new post appears
      await fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile")}
            accessibilityLabel="Ir a mi perfil"
          >
            {profile?.avatar ? (
              <Image
                source={{ uri: profile.avatar }}
                style={[styles.headerAvatar, { borderColor: colors.border }]}
              />
            ) : (
              <View
                style={[
                  styles.headerAvatar,
                  styles.headerAvatarFallback,
                  {
                    backgroundColor: withAlpha(colors.tint, 0.14),
                    borderColor: colors.border,
                  },
                ]}
              >
                <ThemedText
                  style={[styles.headerAvatarInitial, { color: colors.tint }]}
                >
                  {(profile?.fullName || "U").charAt(0).toUpperCase()}
                </ThemedText>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            accessibilityLabel="Notificaciones"
          >
            <Bell size={22} color={colors.textMuted} strokeWidth={1.8} />
          </TouchableOpacity>
        </View>

        {/* Feed */}
        <FlatList
          data={postsData}
          renderItem={({ item }) => (
            <PostCard
              user={item.user}
              content={item.content}
              likes={item.likes}
              comments={item.comments}
              likedByMe={item.likedByMe}
              image={item.imageUrl}
              createdAt={item.createdAt}
              onPress={() => handlePostPress(item)}
              onLike={() => handleLike(item)}
              onShare={() => handleShare(item.id)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={[styles.separator, { backgroundColor: colors.border }]}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.postsList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.tint}
              colors={[colors.tint]}
              progressBackgroundColor={colors.surface}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View
                style={[
                  styles.emptyStateIcon,
                  { backgroundColor: withAlpha(colors.tint, 0.12) },
                ]}
              >
                <Waves size={32} color={colors.tint} strokeWidth={2} />
              </View>
              <ThemedText
                style={[styles.emptyStateTitle, { color: colors.text }]}
              >
                Todavía no hay publicaciones
              </ThemedText>
              <ThemedText
                style={[styles.emptyStateSubtitle, { color: colors.textMuted }]}
              >
                Sé el primero en compartir algo con tu comunidad
              </ThemedText>
            </View>
          }
        />

        {/* Create post */}
        <TouchableOpacity
          style={[
            styles.fab,
            {
              backgroundColor: colors.tint,
              // Sit 14px above the nav bubble (dock bottom + bubble height).
              bottom: Math.max(insets.bottom, 16) + 16 + 56 + 14,
            },
          ]}
          onPress={() => setShowCreateModal(true)}
          activeOpacity={0.85}
          accessibilityLabel="Crear publicación"
        >
          <Plus size={26} color="#ffffff" strokeWidth={2.4} />
        </TouchableOpacity>

        <CreatePostModal
          visible={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreatePostSubmit}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: StyleSheet.hairlineWidth,
  },
  headerAvatarFallback: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatarInitial: {
    fontSize: 16,
    fontWeight: "800",
  },
  headerButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  postsList: {
    paddingHorizontal: 20,
    paddingBottom: 150,
    flexGrow: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyStateIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  emptyStateTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 6px 16px rgba(15, 23, 42, 0.25)",
    elevation: 8,
  },
});
