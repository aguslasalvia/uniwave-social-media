import {
  CalendarDays,
  Heart,
  LogOut,
  LucideIcon,
  Settings,
  Share2,
  Users,
  Waves,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  EditProfileModal,
  GhostButton,
  SectionLabel,
  Stamp,
} from "@/components";
import { withAlpha } from "@/constants/Colors";
import { Fonts, Radius, hardShadow } from "@/constants/Design";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { useColors } from "@/hooks/useColors";
import { useUserProfile } from "@/hooks/useUserProfile";

// Mock data for the posts grid; placeholder photos from Lorem Picsum
// (seeded so every reload shows the same image per post).
const posts = [
  { id: 1, likes: 156, caption: "Nueva exposición en el Museo del Prado" },
  { id: 2, likes: 89, caption: "Fotografía urbana en Madrid" },
  { id: 3, likes: 234, caption: "Teatro clásico en la universidad" },
  { id: 4, likes: 67, caption: "Visita al Louvre en París" },
  { id: 5, likes: 123, caption: "Investigación sobre Velázquez" },
  { id: 6, likes: 198, caption: "Mi proyecto de tesis" },
  { id: 7, likes: 145, caption: "Viaje de estudios a Florencia" },
  { id: 8, likes: 78, caption: "Nuevo libro sobre arte barroco" },
  { id: 9, likes: 112, caption: "Documental sobre restauración" },
].map((post) => ({
  ...post,
  image: `https://picsum.photos/seed/uniwave-${post.id}/300/300`,
}));

const profileTabs: { key: string; label: string }[] = [
  { key: "posts", label: "Posts" },
  { key: "events", label: "Eventos" },
  { key: "groups", label: "Grupos" },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("posts");
  const [showEditModal, setShowEditModal] = useState(false);
  const [userStats, setUserStats] = useState({
    posts: 0,
    followers: 0,
    following: 0,
  });
  const [loading, setLoading] = useState(true);
  const colors = useColors();
  const userProfile = useUserProfile();

  useEffect(() => {
    const loadStats = async () => {
      try {
        setUserStats(await userService.getUserStats());
      } catch (error) {
        console.error("Error loading user stats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const handleOpenEditModal = () => {
    if (userProfile) {
      setShowEditModal(true);
    }
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Seguro que quieres salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: () => authService.logout(),
      },
    ]);
  };

  const renderPost = ({ item }: { item: (typeof posts)[number] }) => (
    <TouchableOpacity style={styles.postGridItem}>
      <View
        style={[styles.postContent, { backgroundColor: colors.surfaceMuted }]}
      >
        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={styles.postOverlay}>
          <View style={styles.postStats}>
            <Heart size={12} color="#ffffff" fill="#ffffff" />
            <Text style={styles.postStatsText}>{item.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const EmptyState = ({
    icon: Icon,
    title,
    subtitle,
  }: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
  }) => (
    <View style={styles.emptyState}>
      <Icon size={30} color={colors.textMuted} strokeWidth={1.6} />
      <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.emptyStateSubtitle, { color: colors.textMuted }]}>
        {subtitle}
      </Text>
    </View>
  );

  const Stat = ({ value, label }: { value: number; label: string }) => (
    <Text style={[styles.statText, { color: colors.textMuted }]}>
      <Text style={[styles.statNumber, { color: colors.text }]}>{value}</Text>
      {` ${label}`}
    </Text>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
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
              <Text style={[styles.headerTitle, { color: colors.text }]}>
                Perfil
              </Text>
              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={styles.headerButton}
                  onPress={handleOpenEditModal}
                  accessibilityLabel="Ajustes"
                >
                  <Settings
                    size={22}
                    color={colors.textMuted}
                    strokeWidth={1.8}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.headerButton}
                  onPress={handleLogout}
                  accessibilityLabel="Cerrar sesión"
                >
                  <LogOut size={22} color={colors.danger} strokeWidth={1.8} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              style={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {/* Student-ID card: the landing's print language applied
                  to the profile — surface card with tinted border, the
                  signature hard shadow, a rotated university stamp and
                  a faint wave watermark, like a campus credential. */}
              <View
                style={[
                  styles.idCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: withAlpha(colors.tint, 0.25),
                    boxShadow: hardShadow(withAlpha(colors.tint, 0.4)),
                  },
                ]}
              >
                <Waves
                  size={120}
                  color={colors.tint}
                  strokeWidth={1.3}
                  style={styles.idWatermark}
                />

                <SectionLabel style={styles.idLabel}>
                  UniWave · Estudiante
                </SectionLabel>

                <View style={styles.idBody}>
                  <View
                    style={[
                      styles.avatarRing,
                      {
                        borderColor: withAlpha(colors.tint, 0.5),
                        backgroundColor: colors.background,
                      },
                    ]}
                  >
                    {userProfile?.avatar ? (
                      <Image
                        source={{ uri: userProfile.avatar }}
                        style={styles.avatar}
                      />
                    ) : (
                      <View
                        style={[
                          styles.avatar,
                          styles.avatarFallback,
                          { backgroundColor: withAlpha(colors.tint, 0.14) },
                        ]}
                      >
                        <Text
                          style={[styles.avatarInitial, { color: colors.tint }]}
                        >
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
                    <Text style={[styles.profileHandle, { color: colors.tint }]}>
                      {userProfile ? `@${userProfile.username}` : "@usuario"}
                    </Text>
                    <Text
                      style={[
                        styles.profileDetail,
                        { color: colors.textMuted },
                      ]}
                      numberOfLines={1}
                    >
                      {userProfile ? userProfile.career : "Carrera"}
                    </Text>
                  </View>
                </View>

                <Stamp style={styles.idStamp}>
                  {userProfile ? userProfile.university : "Universidad"}
                </Stamp>

                <View
                  style={[styles.idDivider, { backgroundColor: colors.border }]}
                />

                <View style={styles.statsRow}>
                  <Stat value={userStats.posts} label="posts" />
                  <Text style={[styles.statDot, { color: colors.textMuted }]}>
                    ·
                  </Text>
                  <Stat value={userStats.followers} label="seguidores" />
                  <Text style={[styles.statDot, { color: colors.textMuted }]}>
                    ·
                  </Text>
                  <Stat value={userStats.following} label="siguiendo" />
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actionButtons}>
                <GhostButton
                  title="Editar perfil"
                  onPress={handleOpenEditModal}
                  style={styles.editButton}
                />
                <TouchableOpacity
                  style={[
                    styles.shareButton,
                    { borderColor: withAlpha(colors.tint, 0.25) },
                  ]}
                  accessibilityLabel="Compartir perfil"
                >
                  <Share2 size={18} color={colors.text} strokeWidth={1.8} />
                </TouchableOpacity>
              </View>

              {/* Tabs — the active one gets the landing's highlighter
                  swipe behind its label instead of an underline. */}
              <View
                style={[styles.tabsRow, { borderBottomColor: colors.border }]}
              >
                {profileTabs.map(({ key, label }) => {
                  const active = activeTab === key;
                  return (
                    <TouchableOpacity
                      key={key}
                      style={styles.tab}
                      onPress={() => setActiveTab(key)}
                    >
                      <View>
                        {active && (
                          <View
                            style={[
                              styles.tabSwipe,
                              { backgroundColor: withAlpha(colors.tint, 0.35) },
                            ]}
                          />
                        )}
                        <Text
                          style={[
                            styles.tabLabel,
                            active
                              ? { color: colors.text, fontFamily: Fonts.display }
                              : { color: colors.textMuted, fontWeight: "500" },
                          ]}
                        >
                          {label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Posts grid */}
              {activeTab === "posts" && (
                <View style={styles.postsGrid}>
                  <FlatList
                    data={posts as any[]}
                    renderItem={renderPost}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.postRow}
                  />
                </View>
              )}

              {activeTab === "events" && (
                <EmptyState
                  icon={CalendarDays}
                  title="Próximos eventos"
                  subtitle="No tienes eventos programados"
                />
              )}

              {activeTab === "groups" && (
                <EmptyState
                  icon={Users}
                  title="Grupos de estudio"
                  subtitle="No estás en ningún grupo activo"
                />
              )}

              {/* Bottom padding for the floating tab bar */}
              <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Edit profile modal */}
            {userProfile && (
              <EditProfileModal
                visible={showEditModal}
                onClose={() => setShowEditModal(false)}
                initialData={{
                  id: userProfile.id,
                  name: userProfile.fullName,
                  username: userProfile.username,
                  email: userProfile.email,
                  phone: userProfile.phone,
                  dateOfBirth: userProfile.dateOfBirth.split("T")[0],
                  university: userProfile.university,
                  career: userProfile.career,
                }}
              />
            )}
          </>
        )}
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
  headerTitle: {
    fontFamily: Fonts.displayHeavy,
    fontSize: 26,
    letterSpacing: -0.8,
  },
  headerActions: {
    flexDirection: "row",
    marginRight: -10,
  },
  headerButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  idCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 18,
    borderWidth: 1.5,
    borderRadius: Radius.card,
    overflow: "hidden",
  },
  idWatermark: {
    position: "absolute",
    right: -16,
    bottom: -22,
    opacity: 0.08,
    transform: [{ rotate: "-8deg" }],
  },
  idLabel: {
    fontSize: 10,
    marginBottom: 14,
  },
  idBody: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  idStamp: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  idDivider: {
    height: StyleSheet.hairlineWidth,
    marginBottom: 12,
  },
  avatarRing: {
    borderWidth: 2,
    borderRadius: 42,
    padding: 2,
    marginRight: 14,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  avatarFallback: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 34,
    fontWeight: "800",
  },
  profileInfo: {
    flex: 1,
    gap: 3,
  },
  profileName: {
    fontFamily: Fonts.displayHeavy,
    fontSize: 21,
    letterSpacing: -0.4,
  },
  // The @handle reads as a code identifier, so it gets the mono face
  // (like emails and labels on the landing page).
  profileHandle: {
    fontFamily: Fonts.mono,
    fontSize: 12.5,
  },
  profileDetail: {
    fontSize: 13.5,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statText: {
    fontSize: 13.5,
  },
  statNumber: {
    fontFamily: Fonts.display,
    fontSize: 14,
  },
  statDot: {
    fontSize: 13.5,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  editButton: {
    flex: 1,
    height: 44,
  },
  shareButton: {
    width: 44,
    height: 44,
    borderWidth: 1.5,
    borderRadius: Radius.action,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsRow: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 11,
  },
  tabLabel: {
    fontSize: 13.5,
  },
  // Marker swipe across the lower half of the active tab label,
  // mirroring the landing's .mark highlight.
  tabSwipe: {
    position: "absolute",
    left: -5,
    right: -6,
    top: "45%",
    bottom: -1,
    borderRadius: 3,
    transform: [{ skewX: "-10deg" }, { rotate: "-0.8deg" }],
  },
  postsGrid: {
    paddingHorizontal: 20,
  },
  postRow: {
    gap: 4,
    marginBottom: 4,
  },
  postGridItem: {
    flex: 1,
    aspectRatio: 1,
  },
  postContent: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
  postOverlay: {
    position: "absolute",
    top: 6,
    right: 6,
  },
  postStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
  },
  postStatsText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },
  emptyState: {
    alignItems: "center",
    gap: 6,
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontFamily: Fonts.display,
    fontSize: 16,
    marginTop: 8,
  },
  emptyStateSubtitle: {
    fontSize: 13.5,
    textAlign: "center",
    lineHeight: 19,
  },
  bottomPadding: {
    height: 130,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
