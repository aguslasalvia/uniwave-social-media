import { Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  FormInput,
  RegisterModal,
  SolidButton,
  ThemedText,
  WaveBackground,
  WaveMark,
} from "@/components";
import { initialLoginForm, RegisterForm, UserLoginForm } from "@/core/User";
import { useToast } from "@/components/ui/toast";
import { authService } from "@/services/authService";
import { useColors } from "@/hooks/useColors";

export default function LoginScreen() {
  const [form, setForm] = useState<UserLoginForm>(initialLoginForm);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const colors = useColors();
  const { showToast } = useToast();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      showToast("Por favor completa todos los campos", "error");
      return;
    }

    try {
      await authService.login(form);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  const handleRegister = async (registerData: RegisterForm) => {
    try {
      const register = await authService.register(registerData);
      if (register) {
        setShowRegisterModal(false);
        showToast("Usuario registrado exitosamente", "success");
      } else {
        showToast(
          "No se pudo registrar el usuario. Por favor, inténtalo de nuevo más tarde.",
          "error",
        );
      }
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Signature: ambient waves rolling along the bottom */}
      <WaveBackground color={colors.tint} height={240} />

      <SafeAreaView style={styles.safeArea} edges={["top", "bottom", "left", "right"]}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Brand */}
            <View style={styles.header}>
              <WaveMark size={76} color={colors.tint} />
              <ThemedText style={styles.title}>
                Uni
                <ThemedText style={[styles.title, { color: colors.tint }]}>
                  Wave
                </ThemedText>
              </ThemedText>
              <ThemedText style={[styles.subtitle, { color: colors.textMuted }]}>
                Conecta con tu comunidad universitaria
              </ThemedText>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <FormInput
                placeholder="Correo universitario"
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
                icon={Mail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <FormInput
                placeholder="Contraseña"
                value={form.password}
                onChangeText={(value) => setForm({ ...form, password: value })}
                icon={Lock}
                secureTextEntry={true}
                autoCapitalize="none"
              />

              <SolidButton
                title="Iniciar sesión"
                onPress={handleLogin}
                style={styles.loginButton}
              />

              <View style={styles.registerLinkContainer}>
                <ThemedText
                  style={[styles.registerLinkText, { color: colors.textMuted }]}
                >
                  ¿No tienes una cuenta?{" "}
                </ThemedText>
                <TouchableOpacity onPress={() => setShowRegisterModal(true)}>
                  <ThemedText
                    style={[styles.registerLink, { color: colors.tint }]}
                  >
                    Regístrate
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <RegisterModal
        visible={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onRegister={handleRegister}
      />
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
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: -1.2,
    marginTop: 20,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  formContainer: {
    gap: 14,
  },
  loginButton: {
    marginTop: 10,
  },
  registerLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
  registerLinkText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: "700",
  },
});
