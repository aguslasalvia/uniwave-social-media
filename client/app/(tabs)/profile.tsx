import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EditProfileModal } from "@/components";
import { Colors } from "@/constants/Colors";
import { UserProfile } from "@/core/User";
import { useColorScheme } from "@/hooks/useColorScheme";
import { userService } from "@/services/userService";

// Datos estáticos para secciones que aún no están conectadas al backend
const staticData = {
  stats: {
    posts: 0,
    followers: 0,
    following: 0,
    achievements: 0,
    events: 0,
    groups: 0,
  },
  achievements: [
    {
      id: 1,
      name: "Primer Post",
      icon: "📝",
      color: "#FF6B6B",
      description: "Comunidad",
    },
    {
      id: 2,
      name: "Evento Asistido",
      icon: "📅",
      color: "#4ECDC4",
      description: "Primer evento",
    },
    {
      id: 3,
      name: "Grupo Creado",
      icon: "👥",
      color: "#45B7D1",
      description: "Primer grupo",
    },
  ],
  interests: [
    { id: 1, name: "Tecnología", icon: "💻" },
    { id: 2, name: "Innovación", icon: "🚀" },
    { id: 3, name: "Aprendizaje", icon: "📚" },
  ],
};

// Mock data for posts grid - Diverse content
const posts: any[] = [
  {
    id: 1,
    type: "image",
    content: "🖼️",
    likes: 156,
    caption: "Nueva exposición en el Museo del Prado",
  },
  {
    id: 2,
    type: "image",
    content: "📸",
    likes: 89,
    caption: "Fotografía urbana en Madrid",
  },
  {
    id: 3,
    type: "image",
    content: "🎭",
    likes: 234,
    caption: "Teatro clásico en la universidad",
  },
  {
    id: 4,
    type: "image",
    content: "🏛️",
    likes: 67,
    caption: "Visita al Louvre en París",
  },
  {
    id: 5,
    type: "image",
    content: "📚",
    likes: 123,
    caption: "Investigación sobre Velázquez",
  },
  {
    id: 6,
    type: "image",
    content: "🎨",
    likes: 198,
    caption: "Mi proyecto de tesis",
  },
  {
    id: 7,
    type: "image",
    content: "✈️",
    likes: 145,
    caption: "Viaje de estudios a Florencia",
  },
  {
    id: 8,
    type: "image",
    content: "📖",
    likes: 78,
    caption: "Nuevo libro sobre arte barroco",
  },
  {
    id: 9,
    type: "image",
    content: "🎬",
    likes: 112,
    caption: "Documental sobre restauración",
  },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("posts");
  const [showEditModal, setShowEditModal] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userStats, setUserStats] = useState({
    posts: 0,
    followers: 0,
    following: 0,
  });
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profile = await userService.getUserProfile();
      const stats = await userService.getUserStats();
      setUserProfile(profile);
      setUserStats(stats);
    } catch (error) {
      console.error("Error loading user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async (data: any) => {
    try {
      if (userProfile) {
        const updatedProfile: UserProfile = {
          ...userProfile,
          fullName: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          university: data.university,
          career: data.major,
        };

        await userService.updateUserProfile(updatedProfile);
        setUserProfile(updatedProfile);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleOpenEditModal = () => {
    if (userProfile) {
      setShowEditModal(true);
    }
  };

  const renderAchievement = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.achievementItem}>
      <View style={[styles.achievementIcon, { backgroundColor: item.color }]}>
        <Text style={styles.achievementIconText}>{item.icon}</Text>
      </View>
      <Text
        style={[styles.achievementName, { color: colors.text }]}
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text
        style={[styles.achievementDescription, { color: colors.icon }]}
        numberOfLines={1}
      >
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const renderInterest = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.interestItem,
        { backgroundColor: colorScheme === "dark" ? "#1e293b" : "#f8fafc" },
      ]}
    >
      <Text style={styles.interestIcon}>{item.icon}</Text>
      <Text
        style={[styles.interestName, { color: colors.text }]}
        numberOfLines={1}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.postGridItem}>
      <View
        style={[
          styles.postContent,
          { backgroundColor: colorScheme === "dark" ? "#1e293b" : "#f8fafc" },
        ]}
      >
        <Text style={styles.postEmoji}>{item.content}</Text>
        <View style={styles.postOverlay}>
          <View style={styles.postStats}>
            <Ionicons name="heart" size={16} color="#ffffff" />
            <Text style={styles.postStatsText}>{item.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={[styles.loadingText, { color: colors.text }]}>
                Cargando perfil...
              </Text>
            </View>
          ) : (
            <>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <Text style={[styles.headerTitle, { color: colors.text }]}>
                    {userProfile ? `@${userProfile.username}` : "@usuario"}
                  </Text>
                  <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
                    Tu espacio personal
                  </Text>
                </View>
                <View style={styles.headerRight}>
                  <TouchableOpacity style={styles.headerButton}>
                    <Ionicons
                      name="notifications-outline"
                      size={24}
                      color={colors.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.headerButton}
                    onPress={handleOpenEditModal}
                  >
                    <Ionicons
                      name="settings-outline"
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
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                  <View style={styles.profileImageContainer}>
                    {userProfile?.avatar ? (
                      <Image
                        source={{ uri: userProfile.avatar }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                      />
                    ) : (
                      <View
                        style={[
                          styles.profileImage,
                          { backgroundColor: colors.tint },
                        ]}
                      >
                        <Text style={[styles.profileAvatar, { color: "#ffffff" }]}>
                          {(userProfile?.fullName || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.profileInfo}>
                    <Text style={[styles.profileName, { color: colors.text }]}>
                      {userProfile ? userProfile.fullName : "Cargando..."}
                    </Text>
                    <Text
                      style={[styles.profileUniversity, { color: colors.icon }]}
                    >
                      {userProfile ? userProfile.university : "Universidad"}
                    </Text>
                    <Text style={[styles.profileMajor, { color: colors.icon }]}>
                      {userProfile ? userProfile.career : "Carrera"} • 4to Año
                    </Text>
                  </View>
                </View>

                {/* Stats */}
                <View
                  style={[
                    styles.statsContainer,
                    {
                      backgroundColor:
                        colorScheme === "dark" ? "#1e293b" : "#f8fafc",
                    },
                  ]}
                >
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: colors.text }]}>
                      {userStats.posts}
                    </Text>
                    <Text style={[styles.statLabel, { color: colors.icon }]}>
                      Publicaciones
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: colors.text }]}>
                      {userStats.followers}
                    </Text>
                    <Text style={[styles.statLabel, { color: colors.icon }]}>
                      Seguidores
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={[styles.statNumber, { color: colors.text }]}>
                      {userStats.following}
                    </Text>
                    <Text style={[styles.statLabel, { color: colors.icon }]}>
                      Siguiendo
                    </Text>
                  </View>
                  {/* <View style={styles.statItem}>
										<Text style={[styles.statNumber, { color: colors.text }]}>
											{staticData.stats.achievements}
										</Text>
										<Text style={[styles.statLabel, { color: colors.icon }]}>Logros</Text>
									</View> */}
                </View>

                {/* Bio */}
                <View style={styles.bioContainer}>
                  <Text style={[styles.bioText, { color: colors.text }]}>
                    Apasionado por el aprendizaje y la innovación tecnológica.
                    Siempre explorando nuevas formas de conectar con la
                    comunidad universitaria! 🚀 #tech #innovation #learning
                  </Text>
                </View>

                {/* Contact Info */}
                <View
                  style={[
                    styles.infoContainer,
                    {
                      backgroundColor:
                        colorScheme === "dark" ? "#1e293b" : "#f8fafc",
                    },
                  ]}
                >
                  <View style={styles.infoItem}>
                    <Ionicons
                      name="mail-outline"
                      size={16}
                      color={colors.icon}
                    />
                    <Text style={[styles.infoText, { color: colors.text }]}>
                      {userProfile ? userProfile.email : "email@ejemplo.com"}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons
                      name="call-outline"
                      size={16}
                      color={colors.icon}
                    />
                    <Text style={[styles.infoText, { color: colors.text }]}>
                      {userProfile ? userProfile.phone : "+34 612 345 678"}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.editButton, { borderColor: colors.icon }]}
                    onPress={handleOpenEditModal}
                  >
                    <Text
                      style={[styles.editButtonText, { color: colors.text }]}
                    >
                      Editar Perfil
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.shareButton,
                      { backgroundColor: colors.tint },
                    ]}
                  >
                    <Ionicons name="share-outline" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>

                {/* Interests */}
                <View style={styles.interestsSection}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Intereses
                  </Text>
                  <FlatList
                    data={staticData.interests}
                    renderItem={renderInterest}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.interestsList}
                  />
                </View>

                {/* Achievements */}
                <View style={styles.achievementsSection}>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Logros y Reconocimientos
                  </Text>
                  <FlatList
                    data={staticData.achievements}
                    renderItem={renderAchievement}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.achievementsList}
                  />
                </View>

                {/* Tabs */}
                <View
                  style={[
                    styles.tabsContainer,
                    {
                      borderTopColor:
                        colorScheme === "dark" ? "#334155" : "#e2e8f0",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === "posts" && styles.activeTab,
                      {
                        borderTopColor: colors.tint,
                      },
                    ]}
                    onPress={() => setActiveTab("posts")}
                  >
                    <Ionicons
                      name="grid-outline"
                      size={24}
                      color={activeTab === "posts" ? colors.tint : colors.icon}
                    />
                    <Text
                      style={[
                        styles.tabText,
                        {
                          color:
                            activeTab === "posts" ? colors.tint : colors.icon,
                        },
                      ]}
                    >
                      Publicaciones
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === "events" && styles.activeTab,
                      {
                        borderTopColor: colors.tint,
                      },
                    ]}
                    onPress={() => setActiveTab("events")}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={24}
                      color={activeTab === "events" ? colors.tint : colors.icon}
                    />
                    <Text
                      style={[
                        styles.tabText,
                        {
                          color:
                            activeTab === "events" ? colors.tint : colors.icon,
                        },
                      ]}
                    >
                      Eventos
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === "groups" && styles.activeTab,
                      {
                        borderTopColor: colors.tint,
                      },
                    ]}
                    onPress={() => setActiveTab("groups")}
                  >
                    <Ionicons
                      name="people-outline"
                      size={24}
                      color={activeTab === "groups" ? colors.tint : colors.icon}
                    />
                    <Text
                      style={[
                        styles.tabText,
                        {
                          color:
                            activeTab === "groups" ? colors.tint : colors.icon,
                        },
                      ]}
                    >
                      Grupos
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Posts Grid */}
                {activeTab === "posts" && (
                  <View style={styles.postsGrid}>
                    <FlatList
                      data={posts as any[]}
                      renderItem={renderPost}
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={3}
                      scrollEnabled={false}
                      contentContainerStyle={styles.postsGridContainer}
                    />
                  </View>
                )}

                {/* Events Tab */}
                {activeTab === "events" && (
                  <View style={styles.eventsContainer}>
                    <View style={styles.emptyState}>
                      <Ionicons
                        name="calendar-outline"
                        size={64}
                        color={colors.icon}
                      />
                      <Text
                        style={[styles.emptyStateTitle, { color: colors.text }]}
                      >
                        Próximos Eventos
                      </Text>
                      <Text
                        style={[
                          styles.emptyStateSubtitle,
                          { color: colors.icon },
                        ]}
                      >
                        No tienes eventos programados
                      </Text>
                    </View>
                  </View>
                )}

                {/* Groups Tab */}
                {activeTab === "groups" && (
                  <View style={styles.groupsContainer}>
                    <View style={styles.emptyState}>
                      <Ionicons
                        name="people-outline"
                        size={64}
                        color={colors.icon}
                      />
                      <Text
                        style={[styles.emptyStateTitle, { color: colors.text }]}
                      >
                        Grupos de Estudio
                      </Text>
                      <Text
                        style={[
                          styles.emptyStateSubtitle,
                          { color: colors.icon },
                        ]}
                      >
                        No estás en ningún grupo activo
                      </Text>
                    </View>
                  </View>
                )}

                {/* Bottom padding for floating tab bar */}
                <View style={styles.bottomPadding} />
              </ScrollView>

              {/* Edit Profile Modal */}
              {userProfile && (
                <EditProfileModal
                  visible={showEditModal}
                  onClose={() => setShowEditModal(false)}
                  onSave={handleEditProfile}
                  initialData={{
                    id: userProfile.id,
                    name: userProfile.fullName,
                    username: userProfile.username,
                    email: userProfile.email,
                    phone: userProfile.phone,
                    dateOfBirth: userProfile.dateOfBirth.split("T")[0], // Convertir ISO a YYYY-MM-DD
                    // bio: 'Apasionado por el aprendizaje y la innovación tecnológica. Siempre explorando nuevas formas de conectar con la comunidad universitaria! 🚀 #tech #innovation #learning',
                    university: userProfile.university,
                    career: userProfile.career,
                  }}
                />
              )}
            </>
          )}
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
    marginTop: 4,
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
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  profileImageContainer: {
    position: "relative",
    marginRight: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    elevation: 8,
  },
  profileAvatar: {
    fontSize: 48,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6366f1",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileUniversity: {
    fontSize: 16,
    marginBottom: 2,
  },
  profileMajor: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 20,
    borderRadius: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  bioContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
  },
  infoContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 12,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  editButton: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  interestsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  interestsList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  interestItem: {
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    minWidth: 80,
  },
  interestIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  interestName: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  achievementsSection: {
    marginBottom: 24,
  },
  achievementsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  achievementItem: {
    alignItems: "center",
    width: 100,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    elevation: 4,
  },
  achievementIconText: {
    fontSize: 24,
  },
  achievementName: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 10,
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  activeTab: {
    borderTopWidth: 2,
    // borderTopColor: '#6366f1',
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
  },
  postsGrid: {
    paddingHorizontal: 20,
  },
  postsGridContainer: {
    gap: 2,
  },
  postRow: {
    flexDirection: "row",
    gap: 2,
    marginBottom: 2,
  },
  postGridItem: {
    flex: 1,
    aspectRatio: 1,
    marginBottom: 2,
  },
  postContent: {
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  postEmoji: {
    fontSize: 32,
  },
  postOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  postStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  postStatsText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  eventsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  groupsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyState: {
    alignItems: "center",
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  bottomPadding: {
    height: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
