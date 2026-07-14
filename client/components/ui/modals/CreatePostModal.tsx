import * as ImagePicker from "expo-image-picker";
import {
  CircleX,
  Globe,
  ImagePlus,
  Lock,
  LucideIcon,
  Users,
  X,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ToastHost, useToast } from "@/components/ui/toast";
import { withAlpha } from "@/constants/Colors";
import { UserProfile } from "@/core/User";
import { userService } from "@/services/userService";
import { useColors } from "@/hooks/useColors";

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

export function CreatePostModal({
  visible,
  onClose,
  onCreate,
}: CreatePostModalProps) {
  const colors = useColors();
  const { showToast } = useToast();

  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState("public"); // public, friends, private
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await userService.getUserProfile();
        if (profile) {
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [visible]);

  const handleCreate = async () => {
    if (!content.trim()) {
      showToast("Por favor escribe algo para tu publicación", "error");
      return;
    }

    const formData = new FormData();
    formData.append("content", content.trim());
    formData.append("privacy", privacy);
    formData.append("timestamp", new Date().toISOString());

    if (pickedImage) {
      formData.append("image", {
        uri: pickedImage,
        type: "image/jpeg",
        name: "photo.jpg",
      } as any);
    }

    onCreate(formData);
    handleClose();
  };

  const handleClose = () => {
    setContent("");
    setPrivacy("public");
    setPickedImage(null);
    onClose();
  };

  const pickImage = async () => {
    setPicking(true);
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        showToast("Se requiere permiso para acceder a la galería.", "error");
        setPicking(false);
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPickedImage(result.assets[0].uri);
      }
    } catch {
      showToast("Error al seleccionar la imagen.", "error");
    } finally {
      setPicking(false);
    }
  };

  const displayName = userProfile?.fullName || userProfile?.username || "U";

  const PrivacyOption = ({
    value,
    label,
    icon: Icon,
  }: {
    value: string;
    label: string;
    icon: LucideIcon;
  }) => {
    const selected = privacy === value;
    return (
      <TouchableOpacity
        style={[
          styles.privacyOption,
          {
            backgroundColor: selected ? colors.tint : colors.surface,
            borderColor: selected ? colors.tint : colors.border,
          },
        ]}
        onPress={() => setPrivacy(value)}
      >
        <Icon
          size={16}
          color={selected ? "#ffffff" : colors.textMuted}
          strokeWidth={2}
        />
        <Text
          style={[
            styles.privacyLabel,
            { color: selected ? "#ffffff" : colors.text },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* RN's Modal opens its own native layer, so the toast host at the
            app root can't show through it — mount a local one here. */}
        <ToastHost />

        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButton}
            accessibilityLabel="Cerrar"
          >
            <X size={22} color={colors.text} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Nueva publicación
          </Text>
          <TouchableOpacity
            onPress={handleCreate}
            style={[styles.publishButton, { backgroundColor: colors.tint }]}
          >
            <Text style={styles.publishButtonText}>Publicar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* User */}
          <View style={styles.userInfo}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: withAlpha(colors.tint, 0.14) },
              ]}
            >
              <Text style={[styles.avatarText, { color: colors.tint }]}>
                {displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={[styles.userName, { color: colors.text }]}>
              {userProfile?.username}
            </Text>
          </View>

          {/* Content */}
          <TextInput
            style={[
              styles.contentInput,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            placeholder="¿Qué querés compartir con tu comunidad?"
            placeholderTextColor={colors.textMuted}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
            autoFocus
          />

          {/* Image */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
            IMAGEN
          </Text>
          {pickedImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: pickedImage }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setPickedImage(null)}
                accessibilityLabel="Quitar imagen"
              >
                <CircleX size={24} color="#ffffff" fill="rgba(0,0,0,0.55)" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.imagePickerButton,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                },
              ]}
              onPress={pickImage}
              disabled={picking}
            >
              <ImagePlus size={20} color={colors.tint} strokeWidth={2} />
              <Text style={[styles.imagePickerText, { color: colors.tint }]}>
                {picking ? "Abriendo galería..." : "Agregar una imagen"}
              </Text>
            </TouchableOpacity>
          )}

          {/* Privacy */}
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
            ¿QUIÉN PUEDE VERLO?
          </Text>
          <View style={styles.privacyOptions}>
            <PrivacyOption value="public" label="Público" icon={Globe} />
            <PrivacyOption value="friends" label="Amigos" icon={Users} />
            <PrivacyOption value="private" label="Privado" icon={Lock} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  publishButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  publishButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    marginBottom: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "800",
  },
  userName: {
    fontSize: 15,
    fontWeight: "700",
  },
  contentInput: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
    minHeight: 140,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11.5,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  imagePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 24,
  },
  imagePickerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  imagePreviewContainer: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: 200,
  },
  removeImageButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  privacyOptions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 40,
  },
  privacyOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1.5,
    gap: 7,
  },
  privacyLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
});
