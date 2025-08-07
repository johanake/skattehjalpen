import { colors } from "./src/config/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // New Swedish tax color scheme
        primary: colors.primary,
        accent: colors.accent,
        neutral: colors.neutral,
        danger: colors.danger,

        // Semantic colors
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        error: colors.semantic.error,

        // Background colors
        "bg-primary": colors.background.primary,
        "bg-secondary": colors.background.secondary,
        "bg-dark": colors.background.dark,
        "bg-white": colors.background.white,
        "bg-accent-light": colors.accent.light,
        "bg-accent-dark": colors.accent.DEFAULT,

        // Text colors
        "text-primary": colors.text.primary,
        "text-secondary": colors.text.secondary,
        "text-muted": colors.text.muted,
        "text-inverse": colors.text.inverse,
        "text-accent": colors.text.accent,

        // Border colors
        "border-default": colors.border.default,
        "border-light": colors.border.light,
        "border-accent": colors.border.accent,
        "border-error": colors.border.error,

        // Keep existing colors for backward compatibility
        green: {
          DEFAULT: colors.accent.DEFAULT,
          400: colors.accent.light,
          500: colors.accent.DEFAULT,
          600: colors.accent.DEFAULT,
          700: colors.accent.DEFAULT,
        },
        blue: {
          DEFAULT: colors.primary.DEFAULT,
          600: colors.primary.DEFAULT,
          700: colors.primary.DEFAULT,
        },
        gray: {
          50: colors.neutral.light,
          100: colors.primary.bg,
          200: colors.text.muted,
          300: colors.text.secondary,
          400: colors.text.secondary,
          500: colors.border.default,
          600: colors.border.default,
          700: colors.neutral.dark,
          800: colors.neutral.dark,
          900: colors.neutral.dark,
        },
        red: {
          DEFAULT: colors.danger.DEFAULT,
          400: colors.danger.light,
          600: colors.danger.DEFAULT,
          900: colors.danger.DEFAULT,
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
