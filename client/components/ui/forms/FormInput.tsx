import { Eye, EyeOff, LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Radius } from "@/constants/Design";
import { useColors } from "@/hooks/useColors";

interface FormInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: LucideIcon;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  style?: any;
  editable?: boolean;
}

export function FormInput({
  placeholder,
  value,
  onChangeText,
  icon: Icon,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  autoCorrect = false,
  style,
  editable = true,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const colors = useColors();

  const isPassword = secureTextEntry;
  const EyeToggle = showPassword ? Eye : EyeOff;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: focused ? colors.tint : colors.border,
        },
        style,
      ]}
    >
      <Icon
        size={19}
        color={focused ? colors.tint : colors.textMuted}
        strokeWidth={2}
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        secureTextEntry={isPassword ? !showPassword : false}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        editable={editable}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
          accessibilityLabel={
            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          <EyeToggle size={19} color={colors.textMuted} strokeWidth={2} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    borderRadius: Radius.action,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    fontWeight: "500",
  },
  eyeButton: {
    padding: 4,
  },
});
