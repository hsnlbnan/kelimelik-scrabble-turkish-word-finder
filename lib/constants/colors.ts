export const colors = {
  light: {
    bg: '#FFFFFF',
    bgSecondary: '#FAFAFA',
    bgTertiary: '#F3F4F6',
    text: '#1F2937',
    textSecondary: '#4B5563',
    border: '#E5E7EB',
    primary: '#0070F3',
    primaryHover: '#0051B3',
    accent: '#7C3AED'
  },
  dark: {
    bg: '#000000',
    bgSecondary: '#111111',
    bgTertiary: '#1A1A1A',
    text: '#E5E7EB',
    textSecondary: '#9CA3AF',
    border: '#262626',
    primary: '#0070F3',
    primaryHover: '#0051B3',
    accent: '#7C3AED'
  }
} as const;

// Tailwind için extend edilecek renkler
export const tailwindColors = {
  custom: {
    light: colors.light,
    dark: colors.dark
  }
} as const;