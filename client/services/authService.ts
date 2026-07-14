import { applyDefaultTheme, applyThemedColors } from "@/constants/Colors";
import { RegisterForm, UserLoginForm } from "@/core/User";
import { setUserProfile } from "@/hooks/useUserProfile";
import { storage } from "@/utils/storage";
import { router } from "expo-router";
import api from "@/utils/api";

export const authService = {
  async login(form: UserLoginForm) {
    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      console.log(response.status);

      if (response.data.token) {
        let theme = response.data.theme;
        await storage.setItem("token", response.data.token);
        await setUserProfile(response.data.user);
        await storage.setItem("theme", JSON.stringify(response.data.theme));

        applyThemedColors(theme.light, theme.dark);
        router.replace("/(tabs)/home");
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(
        error.response?.data?.message || "Error al iniciar sesión",
      );
    }
  },

  async register(form: RegisterForm) {
    try {
      if (!form.dateOfBirth) {
        throw new Error("La fecha de nacimiento es requerida");
      }
      const [year, month, day] = form.dateOfBirth.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      const dateOfBirth = date.toISOString();

      const registerData = {
        fullName: form.fullName,
        username: form.username,
        email: form.email,
        phone: form.phone,
        dateOfBirth: dateOfBirth,
        university: form.university,
        career: form.career,
        password: form.password,
      };

      const response = await api.post("/auth/register", registerData);

      return response.status === 201 ? true : false;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Error al registrar usuario",
      );
    }
  },

  async logout() {
    await storage.clear();
    await setUserProfile(null);
    applyDefaultTheme();
    router.replace("/");
  },
};
