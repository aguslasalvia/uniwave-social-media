import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FormInput, SolidButton, DateInput } from "@/components";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { userService } from "@/services/userService";
import { authService } from "@/services/authService";
import { router } from "expo-router";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    // bio: string;
    university: string;
    career: string;
  };
}

export function EditProfileModal({
  visible,
  onClose,
  onSave,
  initialData,
}: EditProfileModalProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [form, setForm] = useState({
    id: initialData.id,
    name: initialData.name,
    username: initialData.username,
    email: initialData.email,
    currentPassword: "",
    password: "",
    confirmPassword: "",
    phone: initialData.phone,
    dateOfBirth: initialData.dateOfBirth,
    // bio: initialData.bio,
    university: initialData.university,
    career: initialData.career,
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setForm({
      id: initialData.id,
      name: initialData.name,
      username: initialData.username,
      email: initialData.email,
      currentPassword: "",
      password: "",
      confirmPassword: "",
      phone: initialData.phone,
      dateOfBirth: initialData.dateOfBirth,
      // bio: initialData.bio,
      university: initialData.university,
      career: initialData.career,
    });
  }, [initialData]);

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogout = async () => {
    await authService.logout();
    onClose();
  };

  const handleSave = async () => {
    const payload: any = {
      id: form.id,
    };

    if (form.name !== initialData.name) payload.fullName = form.name;
    if (form.username !== initialData.username)
      payload.username = form.username;
    if (form.email !== initialData.email) payload.email = form.email;
    if (form.phone !== initialData.phone) payload.phone = form.phone;
    if (form.dateOfBirth !== initialData.dateOfBirth) {
      // The server expects an RFC3339 timestamp, not a bare YYYY-MM-DD date.
      const [year, month, day] = form.dateOfBirth.split("-").map(Number);
      payload.dateOfBirth = new Date(year, month - 1, day).toISOString();
    }
    if (form.university !== initialData.university)
      payload.university = form.university;
    if (form.career !== initialData.career) payload.career = form.career;
    if (form.currentPassword) payload.oldPassword = form.currentPassword;
    if (form.password) payload.password = form.password;

    const response = await userService.updateUserProfile(payload);
    if (response) {
      onClose();
      Alert.alert("Usuario Actualizado Exitosamente");
    } else {
      Alert.alert("No se a podido actializar\nPor favor reintente mas tarde");
    }
  };

  const currentYear = new Date().getFullYear();
  const birthYears = Array.from({ length: 50 }, (_, i) =>
    (currentYear - 50 + i).toString(),
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: colorScheme === "dark" ? "#0f172a" : "#ffffff" },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Editar Perfil
          </Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={[styles.saveButtonText, { color: colors.tint }]}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>Cerrar Sesion</Text>
            </TouchableOpacity>
          </View>

          {/* Información Personal */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Información Personal
            </Text>

            <FormInput
              placeholder="Nombre completo"
              value={form.name}
              onChangeText={(text) => updateForm("name", text)}
              icon="person"
              style={styles.input}
            />

            <FormInput
              placeholder="Username"
              value={form.username}
              onChangeText={(text) => updateForm("username", text)}
              icon="at"
              style={styles.input}
            />

            <FormInput
              placeholder="Email"
              value={form.email}
              onChangeText={(text) => updateForm("email", text)}
              icon="mail"
              keyboardType="email-address"
              style={styles.input}
            />

            <FormInput
              placeholder="Teléfono"
              value={form.phone}
              onChangeText={(text) => updateForm("phone", text)}
              icon="call"
              keyboardType="phone-pad"
              style={styles.input}
            />

            <DateInput
              value={form.dateOfBirth}
              onChangeText={(date) => updateForm("dateOfBirth", date)}
              placeholder="Fecha de nacimiento"
              style={styles.input}
            />
          </View>

          {/* Información Académica */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Información Académica
            </Text>

            <FormInput
              placeholder="Universidad"
              value={form.university}
              onChangeText={(text) => updateForm("university", text)}
              icon="school"
              style={styles.input}
            />

            <FormInput
              placeholder="Carrera"
              value={form.career}
              onChangeText={(text) => updateForm("career", text)}
              icon="library"
              style={styles.input}
            />
          </View>

          {/* Contraseña */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Cambiar Contraseña
            </Text>

            <FormInput
              placeholder="Contraseña actual"
              value={form.currentPassword}
              onChangeText={(text) => updateForm("currentPassword", text)}
              icon="lock-closed"
              secureTextEntry={!showCurrentPassword}
              style={styles.input}
            />

            <FormInput
              placeholder="Nueva contraseña"
              value={form.password}
              onChangeText={(text) => updateForm("password", text)}
              icon="lock-closed"
              secureTextEntry={!showPassword}
              style={styles.input}
            />

            <FormInput
              placeholder="Confirmar nueva contraseña"
              value={form.confirmPassword}
              onChangeText={(text) => updateForm("confirmPassword", text)}
              icon="lock-closed"
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
            />
          </View>

          {/* Bio/Descripción */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Acerca de mí
            </Text>

            <View
              style={[
                styles.textAreaContainer,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#1e293b" : "#ffffff",
                  borderColor: colorScheme === "dark" ? "#334155" : "#e2e8f0",
                },
              ]}
            >
              {/* <Text style={[styles.textArea, { color: colors.text }]}>
								{form.bio || 'Cuéntanos sobre ti, tus intereses académicos, proyectos...'}
							</Text> */}
            </View>
          </View>

          {/* Botones de acción */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: colors.icon }]}
              onPress={onClose}
            >
              <Text style={[styles.cancelButtonText, { color: colors.text }]}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <SolidButton
              title="Guardar Cambios"
              onPress={handleSave}
              style={styles.saveChangesButton}
            />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  textAreaContainer: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
  },
  textArea: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
    marginBottom: 40,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  saveChangesButton: {
    flex: 1,
  },
  logoutButton: {
    marginTop: 20,
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "red",
  },
});
