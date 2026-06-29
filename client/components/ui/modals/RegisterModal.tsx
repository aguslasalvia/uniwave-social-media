import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { DateInput, FormInput, SolidButton, ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { initialRegisterForm, RegisterForm } from "@/core/User";
import { useColorScheme } from "@/hooks/useColorScheme";
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
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

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
    // Validaciones básicas
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
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    if (form.password.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setIsLoading(true);
    try {
      // Llamar al callback de registro
      await onRegister(form);
      // Solo cerrar el modal si el registro fue exitoso
      handleClose();
    } catch (error: any) {
      // Mostrar el error pero no cerrar el modal
      Alert.alert(
        "Error de registro",
        error.message || "Error al registrar usuario",
      );
      // El modal permanece abierto y los valores se mantienen
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setForm(initialRegisterForm);
    onClose();
  };

  // const handleGoogleRegister = () => {
  //   // Aquí iría la lógica de registro con Google
  //   console.log("Google register");
  // };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: colorScheme === "dark" ? "#0f172a" : "#ffffff" },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Crear Cuenta
          </Text>
          <TouchableOpacity
            onPress={handleRegister}
            style={styles.registerButton}
            disabled={isLoading}
          >
            <Text style={[styles.registerButtonText, { color: colors.tint }]}>
              {isLoading ? "Registrando..." : "Registrar"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View
              style={[styles.logoContainer, { backgroundColor: colors.tint }]}
            >
              <Ionicons name="school" size={32} color="#ffffff" />
            </View>
            <ThemedText style={styles.title}>Únete a UniWave</ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.icon }]}>
              Crea tu cuenta y conecta con tu comunidad universitaria
            </ThemedText>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Full Name Input */}
            <FormInput
              placeholder="Nombre completo"
              value={form.fullName}
              onChangeText={(value) => updateForm("fullName", value)}
              icon="person"
              autoCapitalize="words"
              autoCorrect={false}
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            {/* Username Input */}
            <FormInput
              placeholder="Nombre de usuario"
              value={form.username}
              onChangeText={(value) => updateForm("username", value)}
              icon="at"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            {/* Email Input */}
            <FormInput
              placeholder="Correo universitario"
              value={form.email}
              onChangeText={(value) => updateForm("email", value)}
              icon="mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            {/* Phone Input */}
            <FormInput
              placeholder="Teléfono"
              value={form.phone}
              onChangeText={(value) => updateForm("phone", value)}
              icon="call"
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            {/* Date of Birth Input */}
            <DateInput
              placeholder="Fecha de nacimiento"
              value={form.dateOfBirth}
              onChangeText={(value) => updateForm("dateOfBirth", value)}
              icon="calendar"
              style={styles.inputWrapper}
              maximumDate={new Date()}
              minimumDate={new Date(1950, 0, 1)}
              display="calendar"
              locale="es-ES"
              theme={{
                backgroundColor: colorScheme === "dark" ? "#1e293b" : "#f8fafc",
                textColor: colors.text,
                accentColor: colors.tint,
                borderColor: colorScheme === "dark" ? "#334155" : "#e2e8f0",
                placeholderColor: colors.icon,
              }}
              disabled={isLoading}
            />

            {/* University Input */}
            <View style={[styles.selectContainer, styles.inputWrapper]}>
              <Ionicons
                name="school"
                size={20}
                color={colors.tint}
                style={styles.selectIcon}
              />
              <Ionicons
                name="chevron-down"
                size={20}
                color={colors.icon}
                style={styles.selectRightIcon}
              />
              <View
                style={[
                  styles.selectField,
                  {
                    backgroundColor:
                      colorScheme === "dark" ? "#1e293b" : "#ffffff",
                    borderColor: colorScheme === "dark" ? "#334155" : "#e2e8f0",
                  },
                ]}
              >
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
                    fontSize: 16,
                    fontWeight: "500",
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
            </View>

            {/* Career Input */}
            <FormInput
              placeholder="Carrera"
              value={form.career}
              onChangeText={(value) => updateForm("career", value)}
              icon="library"
              autoCapitalize="words"
              autoCorrect={false}
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            {/* Password Input */}
            <FormInput
              placeholder="Contraseña"
              value={form.password}
              onChangeText={(value) => updateForm("password", value)}
              icon="lock-closed"
              secureTextEntry={true}
              autoCapitalize="none"
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            {/* Confirm Password Input */}
            <FormInput
              placeholder="Confirmar contraseña"
              value={form.confirmPassword}
              onChangeText={(value) => updateForm("confirmPassword", value)}
              icon="lock-closed"
              secureTextEntry={true}
              autoCapitalize="none"
              style={styles.inputWrapper}
              editable={!isLoading}
            />

            {/* Register Button */}
            <SolidButton
              title="Crear Cuenta"
              onPress={handleRegister}
              style={styles.registerButtonStyle}
            />

            {/* Divider */}
            {/* <Divider /> */}

            {/* Google Register Button */}
            {/* <SocialButton
							title="Google"
							onPress={handleGoogleRegister}
							icon="logo-google"
							iconColor="#DB4437"
							style={styles.googleButton}
						/> */}

            {/* Login Link */}
            <View style={styles.loginLinkContainer}>
              <ThemedText
                style={[styles.loginLinkText, { color: colors.icon }]}
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
  registerButton: {
    padding: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  formContainer: {
    gap: 16,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  selectContainer: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectIcon: {
    position: "absolute",
    left: 16,
    top: 16,
    zIndex: 1,
  },
  selectRightIcon: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 1,
  },
  selectField: {
    height: 56,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 48,
    justifyContent: "center",
  },
  registerButtonStyle: {
    marginTop: 8,
  },
  googleButton: {
    marginTop: 0,
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
    fontWeight: "600",
  },
});
