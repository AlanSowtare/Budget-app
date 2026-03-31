export const colors = {
  bg: '#0d0f14',
  surface: '#161920',
  surface2: '#1e2230',
  surface3: '#252a3a',
  border: 'rgba(255,255,255,0.06)',
  text: '#f0f2f8',
  textMuted: '#6b7280',
  textSoft: '#9ca3af',
  accent: '#6ee7b7',
  accentDim: 'rgba(110,231,183,0.15)',
  danger: '#f87171',
  dangerDim: 'rgba(248,113,113,0.15)',
  warning: '#fbbf24',
  blue: '#60a5fa',   blueDim: 'rgba(96,165,250,0.12)',
  purple: '#a78bfa', purpleDim: 'rgba(167,139,250,0.12)',
  pink: '#f472b6',   pinkDim: 'rgba(244,114,182,0.12)',
  orange: '#fb923c', orangeDim: 'rgba(251,146,60,0.12)',
} as const;

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