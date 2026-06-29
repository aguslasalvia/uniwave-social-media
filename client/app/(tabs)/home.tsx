import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CreatePostModal, PostCard, ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { Post } from "@/core/Post";
import { useColorScheme } from "@/hooks/useColorScheme";
import { postService } from "@/services/postService";

export default function HomeScreen() {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  useEffect(() => {
    const fetchPostsData = async () => {
      const data = await postService.fetchPosts();
      setPostsData(data);
    };
    fetchPostsData();
  }, [refresh]);

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

  const handleCreatePost = () => {
    setShowCreateModal(true);
  };

  const handleCreatePostSubmit = async (postData: FormData) => {
    try {
      await postService.createPost(postData);
      // Refresh the feed so the new post appears
      setRefresh((r) => !r);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#0f172a" : "#f8fafc" },
      ]}
    >
      <LinearGradient
        colors={
          colorScheme === "dark"
            ? ["#0f172a", "#1e293b"]
            : ["#f8fafc", "#ffffff"]
        }
        style={styles.gradient}
      >
        <SafeAreaView
          style={styles.safeArea}
          edges={["bottom", "left", "right"]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <ThemedText style={[styles.headerTitle, { color: colors.text }]}>
                UniWave
              </ThemedText>
              <ThemedText
                style={[styles.headerSubtitle, { color: colors.icon }]}
              >
                Tu comunidad universitaria
              </ThemedText>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={colors.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Stories Section */}
            {/* <View style={styles.storiesSection}>
							<FlatList
								data={stories}
								renderItem={({ item }) => (
									<StoryItem
										name={item.name}
										avatar={item.avatar}
										isAdd={item.isAdd}
										onPress={() => handleStoryPress(item)}
									/>
								)}
								keyExtractor={(item) => item.id.toString()}
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.storiesList}
							/>
						</View> */}

            {/* Posts Section */}
            <View style={styles.postsSection}>
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
                    onPress={() => handlePostPress(item)}
                    onLike={() => handleLike(item)}
                    onShare={() => handleShare(item.id)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                contentContainerStyle={styles.postsList}
              />
            </View>
          </ScrollView>

          {/* Floating Action Button */}
          <TouchableOpacity
            style={[styles.add, { backgroundColor: colors.tint }]}
            onPress={handleCreatePost}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={24} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.refresh, { backgroundColor: colors.tint }]}
            onPress={() => setRefresh(!refresh)} // change the falue of refresh to it's oposite
            activeOpacity={0.8}
          >
            <Ionicons name="refresh" size={24} color="#ffffff" />
          </TouchableOpacity>

          {/* Create Post Modal */}
          <CreatePostModal
            visible={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreatePostSubmit}
          />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
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
    paddingVertical: 15,
    marginTop: 50,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: "row",
    gap: 16,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  storiesSection: {
    marginBottom: 20,
  },
  storiesList: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  postsSection: {
    paddingHorizontal: 20,
  },
  postsList: {
    paddingBottom: 100,
  },
  refresh: {
    position: "absolute",
    bottom: 110,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    elevation: 8,
  },

  add: {
    position: "absolute",
    bottom: 190,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    elevation: 8,
  },
});
