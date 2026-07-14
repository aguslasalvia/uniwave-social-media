import {
  AtSign,
  GraduationCap,
  LibraryBig,
  Lock,
  Mail,
  Phone,
  User,
  X,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { DateInput, FormInput } from "@/components/ui/forms";
import { ToastHost, useToast } from "@/components/ui/toast";
import { userService } from "@/services/userService";
import { useColors } from "@/hooks/useColors";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  initialData: {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    university: string;
    career: string;
  };
}

export function EditProfileModal({
  visible,
  onClose,
  initialData,
}: EditProfileModalProps) {
  const colors = useColors();
  const { showToast } = useToast();

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
    university: initialData.university,
    career: initialData.career,
  });

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
      showToast("Usuario actualizado exitosamente", "success");
    } else {
      showToast("No se pudo actualizar. Por favor reintenta más tarde", "error");
    }
  };

  const SectionLabel = ({ children }: { children: string }) => (
    <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
      {children}
    </Text>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* RN's Modal opens its own native layer, so the toast host at the
            app root can't show through it — mount a local one here. */}
        <ToastHost />

        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
            accessibilityLabel="Cerrar"
          >
            <X size={22} color={colors.text} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Editar perfil
          </Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={[styles.saveButtonText, { color: colors.tint }]}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Personal info */}
          <View style={styles.section}>
            <SectionLabel>INFORMACIÓN PERSONAL</SectionLabel>

            <FormInput
              placeholder="Nombre completo"
              value={form.name}
              onChangeText={(text) => updateForm("name", text)}
              icon={User}
              style={styles.input}
            />

            <FormInput
              placeholder="Username"
              value={form.username}
              onChangeText={(text) => updateForm("username", text)}
              icon={AtSign}
              style={styles.input}
            />

            <FormInput
              placeholder="Email"
              value={form.email}
              onChangeText={(text) => updateForm("email", text)}
              icon={Mail}
              keyboardType="email-address"
              style={styles.input}
            />

            <FormInput
              placeholder="Teléfono"
              value={form.phone}
              onChangeText={(text) => updateForm("phone", text)}
              icon={Phone}
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

          {/* Academic info */}
          <View style={styles.section}>
            <SectionLabel>INFORMACIÓN ACADÉMICA</SectionLabel>

            <FormInput
              placeholder="Universidad"
              value={form.university}
              onChangeText={(text) => updateForm("university", text)}
              icon={GraduationCap}
              style={styles.input}
            />

            <FormInput
              placeholder="Carrera"
              value={form.career}
              onChangeText={(text) => updateForm("career", text)}
              icon={LibraryBig}
              style={styles.input}
            />
          </View>

          {/* Password */}
          <View style={styles.section}>
            <SectionLabel>CAMBIAR CONTRASEÑA</SectionLabel>

            <FormInput
              placeholder="Contraseña actual"
              value={form.currentPassword}
              onChangeText={(text) => updateForm("currentPassword", text)}
              icon={Lock}
              secureTextEntry
              style={styles.input}
            />

            <FormInput
              placeholder="Nueva contraseña"
              value={form.password}
              onChangeText={(text) => updateForm("password", text)}
              icon={Lock}
              secureTextEntry
              style={styles.input}
            />

            <FormInput
              placeholder="Confirmar nueva contraseña"
              value={form.confirmPassword}
              onChangeText={(text) => updateForm("confirmPassword", text)}
              icon={Lock}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <View style={styles.bottomPadding} />
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
  saveButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionLabel: {
    fontSize: 11.5,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  input: {
    marginBottom: 12,
  },
  bottomPadding: {
    height: 40,
  },
});
