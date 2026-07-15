import {
  Bell,
  BookOpen,
  Bookmark,
  Clock,
  Code,
  GraduationCap,
  LucideIcon,
  Mic,
  PartyPopper,
  SlidersHorizontal,
  Trophy,
  Users,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  CategoryCard,
  EventCard,
  SearchBar,
  SectionLabel,
  SkeletonCard,
  SkeletonEventCard,
  ThemedText,
} from "@/components";
import { withAlpha } from "@/constants/Colors";
import { Fonts, Radius } from "@/constants/Design";
import { useColors } from "@/hooks/useColors";

// Mock data for categories
const categories: {
  id: number;
  name: string;
  icon: LucideIcon;
  color: string;
  count: number;
}[] = [
  { id: 1, name: "Eventos", icon: PartyPopper, color: "#f43f5e", count: 12 },
  {
    id: 2,
    name: "Grupos de Estudio",
    icon: BookOpen,
    color: "#0ea5e9",
    count: 8,
  },
  { id: 3, name: "Clubes", icon: Trophy, color: "#f59e0b", count: 15 },
  { id: 4, name: "Tutorías", icon: GraduationCap, color: "#10b981", count: 6 },
  { id: 5, name: "Hackathons", icon: Code, color: "#8b5cf6", count: 3 },
  { id: 6, name: "Conferencias", icon: Mic, color: "#ec4899", count: 9 },
];

// Mock data for trending events
const trendingEvents = [
  {
    id: 1,
    title: "Hackathon Universitario 2024",
    description: "48 horas de programación y innovación",
    date: "15-17 Mar",
    time: "9:00 AM",
    location: "Auditorio Principal",
    attendees: 156,
    image: "https://picsum.photos/seed/uw-event-1/480/240",
    category: "Hackathons",
  },
  {
    id: 2,
    title: "Conferencia de IA y Machine Learning",
    description: "Descubre las últimas tendencias en IA",
    date: "22 Mar",
    time: "2:00 PM",
    location: "Sala de Conferencias",
    attendees: 89,
    image: "https://picsum.photos/seed/uw-event-2/480/240",
    category: "Conferencias",
  },
  {
    id: 3,
    title: "Grupo de Estudio: Matemáticas Avanzadas",
    description: "Sesión de repaso para exámenes finales",
    date: "20 Mar",
    time: "6:00 PM",
    location: "Biblioteca Central",
    attendees: 23,
    image: "https://picsum.photos/seed/uw-event-3/480/240",
    category: "Grupos de Estudio",
  },
  {
    id: 4,
    title: "Club de Emprendimiento",
    description: "Networking y presentación de startups",
    date: "25 Mar",
    time: "7:00 PM",
    location: "Centro de Innovación",
    attendees: 67,
    image: "https://picsum.photos/seed/uw-event-4/480/240",
    category: "Clubes",
  },
];

// Mock data for study groups
const studyGroups = [
  {
    id: 1,
    name: "Programación React",
    members: 12,
    subject: "Desarrollo Web",
    nextSession: "Mañana 3:00 PM",
    avatar: "https://picsum.photos/seed/uw-group-1/96/96",
  },
  {
    id: 2,
    name: "Cálculo Diferencial",
    members: 8,
    subject: "Matemáticas",
    nextSession: "Hoy 5:00 PM",
    avatar: "https://picsum.photos/seed/uw-group-2/96/96",
  },
  {
    id: 3,
    name: "Física Cuántica",
    members: 15,
    subject: "Física",
    nextSession: "Viernes 2:00 PM",
    avatar: "https://picsum.photos/seed/uw-group-3/96/96",
  },
  {
    id: 4,
    name: "Historia del Arte",
    members: 6,
    subject: "Arte",
    nextSession: "Lunes 4:00 PM",
    avatar: "https://picsum.photos/seed/uw-group-4/96/96",
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{
    Users: any[];
    Events: any[];
    Groups: any[];
  }>({
    Users: [],
    Events: [],
    Groups: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const colors = useColors();

  // Runs on every change of searchQuery
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults({
        Users: [],
        Events: [],
        Groups: [],
      });
      setIsSearching(false);
      setIsLoading(false);
    } else {
      setIsSearching(true);
      setIsLoading(true);

      // Simulated loading delay (replace with the real API call)
      setTimeout(() => {
        const query = searchQuery.toLowerCase();

        const mockResults = {
          Users: [],
          Events: trendingEvents.filter(
            (event) =>
              event.title.toLowerCase().includes(query) ||
              event.description.toLowerCase().includes(query) ||
              event.category.toLowerCase().includes(query),
          ),
          Groups: studyGroups.filter(
            (group) =>
              group.name.toLowerCase().includes(query) ||
              group.subject.toLowerCase().includes(query),
          ),
        };

        setSearchResults(mockResults);
        setIsLoading(false);
      }, 1500);
    }
  }, [searchQuery]);

  const handleCategoryPress = (category: any) => {
    console.log("Category pressed:", category.name);
  };

  const handleEventPress = (event: any) => {
    console.log("Event pressed:", event.title);
  };

  const handleStudyGroupPress = (group: any) => {
    console.log("Study group pressed:", group.name);
  };

  const SectionHeader = ({
    label,
    showSeeAll,
  }: {
    label: string;
    showSeeAll?: boolean;
  }) => (
    <View style={styles.sectionHeader}>
      <SectionLabel>{label}</SectionLabel>
      {showSeeAll && (
        <TouchableOpacity>
          <ThemedText style={[styles.seeAllText, { color: colors.tint }]}>
            Ver todos
          </ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <ThemedText style={[styles.headerTitle, { color: colors.text }]}>
              Explorar
            </ThemedText>
            <ThemedText
              style={[styles.headerSubtitle, { color: colors.textMuted }]}
            >
              Descubre actividades y grupos
            </ThemedText>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[
                styles.headerButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              accessibilityLabel="Notificaciones"
            >
              <Bell size={20} color={colors.textMuted} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.headerButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              accessibilityLabel="Filtros"
            >
              <SlidersHorizontal
                size={20}
                color={colors.textMuted}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Search */}
          <View style={styles.searchSection}>
            <SearchBar
              placeholder="Buscar eventos, grupos..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={() => setSearchQuery("")}
            />
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <SectionHeader label="Categorías" />
            {isLoading ? (
              <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={() => <SkeletonCard />}
                keyExtractor={(item) => item.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            ) : (
              <FlatList
                data={categories}
                renderItem={({ item }) => (
                  <CategoryCard
                    name={item.name}
                    icon={item.icon}
                    color={item.color}
                    count={item.count}
                    onPress={() => handleCategoryPress(item)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            )}
          </View>

          {/* Trending events */}
          <View style={styles.section}>
            <SectionHeader label="Eventos destacados" showSeeAll />
            {isLoading ? (
              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={() => <SkeletonEventCard />}
                keyExtractor={(item) => item.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            ) : (
              <FlatList
                data={isSearching ? searchResults.Events : trendingEvents}
                renderItem={({ item }) => (
                  <EventCard
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    time={item.time}
                    location={item.location}
                    attendees={item.attendees}
                    image={item.image}
                    category={item.category}
                    onPress={() => handleEventPress(item)}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            )}
          </View>

          {/* Study groups */}
          <View style={styles.section}>
            <SectionHeader label="Grupos de estudio" showSeeAll />
            {isLoading ? (
              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={() => <SkeletonCard width={240} height={120} />}
                keyExtractor={(item) => item.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            ) : (
              <FlatList
                data={isSearching ? searchResults.Groups : studyGroups}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.studyGroupCard,
                      {
                        backgroundColor: colors.surface,
                        borderColor: withAlpha(colors.tint, 0.18),
                      },
                    ]}
                    onPress={() => handleStudyGroupPress(item)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.studyGroupHeader}>
                      {item.avatar?.startsWith("http") ? (
                        <Image
                          source={{ uri: item.avatar }}
                          style={styles.studyGroupAvatar}
                        />
                      ) : (
                        <View
                          style={[
                            styles.studyGroupAvatar,
                            styles.studyGroupAvatarFallback,
                            { backgroundColor: withAlpha(colors.tint, 0.1) },
                          ]}
                        >
                          <ThemedText style={styles.studyGroupAvatarText}>
                            {item.avatar}
                          </ThemedText>
                        </View>
                      )}
                      <View style={styles.studyGroupInfo}>
                        <ThemedText
                          style={[styles.studyGroupName, { color: colors.text }]}
                          numberOfLines={1}
                        >
                          {item.name}
                        </ThemedText>
                        <ThemedText
                          style={[
                            styles.studyGroupSubject,
                            { color: colors.textMuted },
                          ]}
                        >
                          {item.subject}
                        </ThemedText>
                      </View>
                      <TouchableOpacity
                        style={styles.bookmarkButton}
                        accessibilityLabel="Guardar grupo"
                      >
                        <Bookmark
                          size={18}
                          color={colors.textMuted}
                          strokeWidth={2}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.studyGroupDetails}>
                      <View style={styles.studyGroupDetail}>
                        <Users size={14} color={colors.tint} strokeWidth={2} />
                        <ThemedText
                          style={[
                            styles.studyGroupDetailText,
                            { color: colors.textMuted },
                          ]}
                        >
                          {item.members} miembros
                        </ThemedText>
                      </View>
                      <View style={styles.studyGroupDetail}>
                        <Clock size={14} color={colors.tint} strokeWidth={2} />
                        <ThemedText
                          style={[
                            styles.studyGroupDetailText,
                            { color: colors.textMuted },
                          ]}
                        >
                          {item.nextSession}
                        </ThemedText>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              />
            )}
          </View>

          {/* Bottom padding for the floating tab bar */}
          <View style={styles.bottomPadding} />
        </ScrollView>
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
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: Fonts.displayHeavy,
    fontSize: 26,
    letterSpacing: -0.8,
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: "row",
    gap: 10,
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "600",
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  studyGroupCard: {
    width: 240,
    borderRadius: Radius.card,
    padding: 14,
    borderWidth: 1,
    marginRight: 12,
  },
  studyGroupHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  studyGroupAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  studyGroupAvatarFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  studyGroupAvatarText: {
    fontSize: 22,
  },
  studyGroupInfo: {
    flex: 1,
  },
  studyGroupName: {
    fontSize: 14.5,
    fontWeight: "700",
    marginBottom: 2,
  },
  studyGroupSubject: {
    fontSize: 12.5,
  },
  bookmarkButton: {
    padding: 4,
  },
  studyGroupDetails: {
    gap: 7,
  },
  studyGroupDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  studyGroupDetailText: {
    fontSize: 12,
    fontWeight: "500",
  },
  bottomPadding: {
    height: 130,
  },
});
