import { Picker } from "@react-native-picker/picker";
import {
  AtSign,
  ChevronDown,
  GraduationCap,
  LibraryBig,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { WaveMark } from "@/components/ui/brand";
import { SolidButton } from "@/components/ui/buttons";
import { DateInput, FormInput } from "@/components/ui/forms";
import { ModalHeader } from "@/components/ui/modals/ModalHeader";
import { ThemedText } from "@/components/ui/themed";
import { ToastHost, useToast } from "@/components/ui/toast";
import { Fonts, Radius } from "@/constants/Design";
import { initialRegisterForm, RegisterForm } from "@/core/User";
import { useColors } from "@/hooks/useColors";
import { universityService } from "@/services/universityServices";

interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
  onRegister: (data: RegisterForm) => Promise<void>;
}

export function RegisterModal({
  visible,
  onClose,
  onRegister,
}: RegisterModalProps) {
  const [form, setForm] = useState<RegisterForm>(initialRegisterForm);
  const [universities, setUniversities] =
    useState<[{ id: string; name: string }]>();
  const [isLoading, setIsLoading] = useState(false);
  const colors = useColors();
  const { showToast } = useToast();

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const fetchUniversities = async () => {
      const response = await universityService.getAllActiveUniversities();
      setUniversities(response);
    };
    fetchUniversities();
  }, []);

  const handleRegister = async () => {
    if (
      !form.fullName ||
      !form.username ||
      !form.email ||
      !form.phone ||
      !form.dateOfBirth ||
      !form.university ||
      !form.career ||
      !form.password ||
      !form.confirmPassword
    ) {
      showToast("Por favor completa todos los campos", "error");
      return;
    }

    if (form.password !== form.confirmPassword) {
      showToast("Las contraseñas no coinciden", "error");
      return;
    }

    if (form.password.length < 8) {
      showToast("La contraseña debe tener al menos 8 caracteres", "error");
      return;
    }

    setIsLoading(true);
    try {
      await onRegister(form);
      // Only close the modal when registration succeeded
      handleClose();
    } catch (error: any) {
      // Keep the modal (and the entered values) open on failure
      showToast(error.message || "Error al registrar usuario", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setForm(initialRegisterForm);
    onClose();
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

        <ModalHeader
          title=""
          onClose={handleClose}
          actionLabel={isLoading ? "Registrando..." : "Registrar"}
          onAction={handleRegister}
          actionDisabled={isLoading}
        />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Brand */}
          <View style={styles.headerSection}>
            <WaveMark size={56} color={colors.tint} />
            <ThemedText style={styles.title}>
              Únete a Uni
              <ThemedText style={[styles.title, { color: colors.tint }]}>
                Wave
              </ThemedText>
            </ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.textMuted }]}>
              Crea tu cuenta y conecta con tu comunidad universitaria
            </ThemedText>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <FormInput
              placeholder="Nombre completo"
              value={form.fullName}
              onChangeText={(value) => updateForm("fullName", value)}
              icon={User}
              autoCapitalize="words"
              autoCorrect={false}
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            <FormInput
              placeholder="Nombre de usuario"
              value={form.username}
              onChangeText={(value) => updateForm("username", value)}
              icon={AtSign}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            <FormInput
              placeholder="Correo universitario"
              value={form.email}
              onChangeText={(value) => updateForm("email", value)}
              icon={Mail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            <FormInput
              placeholder="Teléfono"
              value={form.phone}
              onChangeText={(value) => updateForm("phone", value)}
              icon={Phone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            <DateInput
              placeholder="Fecha de nacimiento"
              value={form.dateOfBirth}
              onChangeText={(value) => updateForm("dateOfBirth", value)}
              style={styles.inputWrapper}
              maximumDate={new Date()}
              minimumDate={new Date(1950, 0, 1)}
              display="calendar"
              locale="es-ES"
              disabled={isLoading}
            />

            {/* University picker */}
            <View
              style={[
                styles.selectContainer,
                styles.inputWrapper,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <GraduationCap size={19} color={colors.textMuted} strokeWidth={2} />
              <View style={styles.selectField}>
                <Picker
                  selectedValue={form.university}
                  onValueChange={(itemValue: any) =>
                    updateForm("university", itemValue)
                  }
                  enabled={!isLoading}
                  mode="dialog"
                  dropdownIconColor={"transparent"}
                  dropdownIconRippleColor={"transparent"}
                  style={{
                    color: colors.text,
                    fontSize: 15,
                    width: "100%",
                    backgroundColor: "transparent",
                  }}
                >
                  <Picker.Item label="Selecciona universidad" value="" />
                  {universities?.map((uni) => (
                    <Picker.Item key={uni.id} label={uni.name} value={uni.id} />
                  ))}
                </Picker>
              </View>
              <ChevronDown size={17} color={colors.textMuted} strokeWidth={2} />
            </View>

            <FormInput
              placeholder="Carrera"
              value={form.career}
              onChangeText={(value) => updateForm("career", value)}
              icon={LibraryBig}
              autoCapitalize="words"
              autoCorrect={false}
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            <FormInput
              placeholder="Contraseña"
              value={form.password}
              onChangeText={(value) => updateForm("password", value)}
              icon={Lock}
              secureTextEntry={true}
              autoCapitalize="none"
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            <FormInput
              placeholder="Confirmar contraseña"
              value={form.confirmPassword}
              onChangeText={(value) => updateForm("confirmPassword", value)}
              icon={Lock}
              secureTextEntry={true}
              autoCapitalize="none"
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            <SolidButton
              title="Crear cuenta"
              onPress={handleRegister}
              style={styles.registerButtonStyle}
            />

            {/* Login link */}
            <View style={styles.loginLinkContainer}>
              <ThemedText
                style={[styles.loginLinkText, { color: colors.textMuted }]}
              >
                ¿Ya tienes una cuenta?{" "}
              </ThemedText>
              <TouchableOpacity onPress={handleClose}>
                <ThemedText style={[styles.loginLink, { color: colors.tint }]}>
                  Inicia sesión
                </ThemedText>
              </TouchableOpacity>
            </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerSection: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 28,
    gap: 4,
  },
  title: {
    fontFamily: Fonts.displayHeavy,
    fontSize: 24,
    letterSpacing: -0.6,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 280,
  },
  formContainer: {
    gap: 0,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    borderRadius: Radius.action,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    gap: 8,
  },
  selectField: {
    flex: 1,
    justifyContent: "center",
  },
  registerButtonStyle: {
    marginTop: 8,
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  loginLinkText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "700",
  },
});
