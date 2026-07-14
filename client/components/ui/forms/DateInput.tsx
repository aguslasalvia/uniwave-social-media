import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarDays, ChevronDown, LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useColors } from "@/hooks/useColors";


interface DateInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  icon?: LucideIcon;
  style?: any;
  maximumDate?: Date;
  minimumDate?: Date;
  display?: "default" | "spinner" | "calendar" | "clock";
  mode?: "date" | "time" | "datetime";
  locale?: string;
  disabled?: boolean;
  theme?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    borderColor?: string;
    placeholderColor?: string;
  };
}

export function DateInput({
  placeholder = "Seleccionar fecha",
  value,
  onChangeText,
  icon: Icon = CalendarDays,
  style,
  maximumDate = new Date(),
  minimumDate = new Date(1900, 0, 1),
  display = Platform.OS === "ios" ? "spinner" : "default",
  mode = "date",
  locale = "es-ES",
  disabled = false,
  theme,
}: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const colors = useColors();

  const customTheme = {
    backgroundColor: theme?.backgroundColor || colors.surface,
    textColor: theme?.textColor || colors.text,
    accentColor: theme?.accentColor || colors.tint,
    borderColor: theme?.borderColor || colors.border,
    placeholderColor: theme?.placeholderColor || colors.textMuted,
  };

  // Convert the YYYY-MM-DD string to a local Date for the picker,
  // avoiding UTC offset issues.
  const getDateValue = () => {
    if (!value) return new Date();
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);

    if (selectedDate && event.type !== "dismissed") {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      onChangeText(`${year}-${month}-${day}`);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.input,
          {
            backgroundColor: customTheme.backgroundColor,
            borderColor: customTheme.borderColor,
          },
        ]}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Icon size={19} color={customTheme.accentColor} strokeWidth={2} />
        <Text
          style={[
            styles.text,
            {
              color: value
                ? customTheme.textColor
                : customTheme.placeholderColor,
            },
          ]}
        >
          {value ? formatDisplayDate(value) : placeholder}
        </Text>
        <ChevronDown
          size={17}
          color={customTheme.placeholderColor}
          strokeWidth={2}
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={getDateValue()}
          mode={mode}
          display={display}
          onChange={handleDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          locale={locale}
          textColor={customTheme.textColor}
          accentColor={customTheme.accentColor}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    gap: 12,
  },
  text: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
});
