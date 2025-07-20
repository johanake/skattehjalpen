export const colors = {
  // Primary colors - Blue for trust and professionalism
  primary: {
    DEFAULT: "#1E3A8A", // Blå – tillit och professionalism
    light: "#3B82F6", // Ljusare blå för hover, interaktion
    bg: "#F1F5F9", // Bakgrund (blue-gray-50)
  },

  // Accent colors - Green for economic success and security
  accent: {
    DEFAULT: "#16A34A", // Grön – ekonomisk framgång, trygghet
    light: "#38a169", // Ljusgrön för highlights
  },

  // Neutral colors - Grays for text and backgrounds
  neutral: {
    dark: "#1F2937", // Text – mörkgrå
    light: "#F9FAFB", // Ljus bakgrund
    border: "#E5E7EB", // Ljusgrå border
  },

  // Danger colors - Red for negative analysis or errors
  danger: {
    DEFAULT: "#DC2626", // Röd – vid negativ analys eller fel
    light: "#FECACA", // Light red for backgrounds
  },

  // Semantic colors (mapped to new scheme)
  semantic: {
    success: {
      DEFAULT: "#16A34A", // Maps to accent.DEFAULT
      light: "#A7F3D0", // Maps to accent.light
    },
    warning: {
      DEFAULT: "#F59E0B", // Amber for warnings
      light: "#FDE68A", // Light amber
    },
    error: {
      DEFAULT: "#DC2626", // Maps to danger.DEFAULT
      light: "#FECACA", // Maps to danger.light
    },
  },

  // Background colors
  background: {
    primary: "#F9FAFB", // neutral.light - main light background
    secondary: "#F1F5F9", // primary.bg - secondary background
    dark: "#1F2937", // neutral.dark - dark background
    white: "#FFFFFF", // Pure white
  },

  // Text colors
  text: {
    primary: "#1F2937", // neutral.dark - primary text
    secondary: "#2a2d33", // Medium gray for secondary text
    muted: "#f5f5f5", // Light gray for muted text
    inverse: "#FFFFFF", // White text for dark backgrounds
    accent: "#1E3A8A", // primary.DEFAULT for accent text
  },

  // Border colors
  border: {
    default: "#E5E7EB", // neutral.border - default border
    light: "#F3F4F6", // Even lighter border
    accent: "#1E3A8A", // primary.DEFAULT for accent borders
    error: "#DC2626", // danger.DEFAULT for error borders
  },
} as const;

// Export individual color palettes for easier access
export const primaryColors = colors.primary;
export const accentColors = colors.accent;
export const neutralColors = colors.neutral;
export const dangerColors = colors.danger;
export const semanticColors = colors.semantic;
export const backgroundColors = colors.background;
export const textColors = colors.text;
export const borderColors = colors.border;

// Color utility functions
export const getColorValue = (colorPath: string): string => {
  const keys = colorPath.split(".");
  let value: typeof colors | string = colors;

  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      throw new Error(`Color path "${colorPath}" not found`);
    }
  }

  return value;
};

// Common color combinations
export const colorCombinations = {
  primaryButton: {
    bg: colors.primary.DEFAULT,
    hover: colors.primary.light,
    text: colors.text.inverse,
  },
  secondaryButton: {
    bg: colors.neutral.light,
    hover: colors.primary.bg,
    text: colors.text.primary,
    border: colors.border.default,
  },
  accentButton: {
    bg: colors.accent.DEFAULT,
    hover: colors.accent.DEFAULT,
    text: colors.text.inverse,
  },
  formInput: {
    bg: colors.background.white,
    border: colors.border.default,
    text: colors.text.primary,
    placeholder: colors.text.muted,
    focus: colors.primary.DEFAULT,
  },
  card: {
    bg: colors.background.white,
    border: colors.border.light,
    text: colors.text.primary,
  },
  darkCard: {
    bg: colors.background.dark,
    border: colors.border.default,
    text: colors.text.inverse,
  },
};
