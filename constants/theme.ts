export type ThemeColors = {
  bg: string;
  surface: string;
  surface2: string;
  surface3: string;
  surfaceRaised: string;
  surfaceRaisedStrong: string;
  border: string;
  borderStrong: string;
  text: string;
  textMuted: string;
  textSoft: string;
  accent: string;
  accentDim: string;
  accentBorder: string;
  onAccent: string;
  onLight: string;
  overlay: string;
  shadow: string;
  danger: string;
  dangerDim: string;
  warning: string;
  blue: string;
  blueDim: string;
  purple: string;
  purpleDim: string;
  pink: string;
  pinkDim: string;
  orange: string;
  orangeDim: string;
};

export type ThemeName = 'dark' | 'light';

const dark: ThemeColors = {
  bg: '#0d0f14',
  surface: '#161920',
  surface2: '#1e2230',
  surface3: '#252a3a',
  surfaceRaised: '#202535',
  surfaceRaisedStrong: '#232838',
  border: 'rgba(255,255,255,0.06)',
  borderStrong: 'rgba(255,255,255,0.08)',
  text: '#f0f2f8',
  textMuted: '#6b7280',
  textSoft: '#9ca3af',
  accent: '#6ee7b7',
  accentDim: 'rgba(110,231,183,0.15)',
  accentBorder: 'rgba(110,231,183,0.14)',
  onAccent: '#0d2e22',
  onLight: '#0b0d12',
  overlay: 'rgba(0,0,0,0.45)',
  shadow: '#000',
  danger: '#f87171',
  dangerDim: 'rgba(248,113,113,0.15)',
  warning: '#fbbf24',
  blue: '#60a5fa',   blueDim: 'rgba(96,165,250,0.12)',
  purple: '#a78bfa', purpleDim: 'rgba(167,139,250,0.12)',
  pink: '#f472b6',   pinkDim: 'rgba(244,114,182,0.12)',
  orange: '#fb923c', orangeDim: 'rgba(251,146,60,0.12)',
};

const light: ThemeColors = {
  bg: '#f5f7fa',
  surface: '#ffffff',
  surface2: '#edf0f5',
  surface3: '#e1e6ed',
  surfaceRaised: '#e8ecf2',
  surfaceRaisedStrong: '#dde3eb',
  border: 'rgba(15,23,42,0.08)',
  borderStrong: 'rgba(15,23,42,0.14)',
  text: '#171923',
  textMuted: '#5f6877',
  textSoft: '#465161',
  accent: '#087a55',
  accentDim: 'rgba(8,122,85,0.12)',
  accentBorder: 'rgba(8,122,85,0.22)',
  onAccent: '#ffffff',
  onLight: '#0b0d12',
  overlay: 'rgba(15,23,42,0.35)',
  shadow: '#334155',
  danger: '#c62828',
  dangerDim: 'rgba(198,40,40,0.12)',
  warning: '#8a5a00',
  blue: '#2563b8',
  blueDim: 'rgba(37,99,184,0.12)',
  purple: '#7040b8',
  purpleDim: 'rgba(112,64,184,0.12)',
  pink: '#b83269',
  pinkDim: 'rgba(184,50,105,0.12)',
  orange: '#b84a0a',
  orangeDim: 'rgba(184,74,10,0.12)',
};

export const themes: Record<ThemeName, ThemeColors> = {dark, light};

// Keep existing screens on the original palette until they are migrated by lot.
export const colors: ThemeColors = themes.dark;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  full: 99,
} as const;

export const fonts = {
  regular: 'PlusJakartaSans-Regular',
  medium: 'PlusJakartaSans-Medium',
  bold: 'PlusJakartaSans-Bold',
  extraBold: 'PlusJakartaSans-ExtraBold',
} as const;

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  display: 42,
} as const;