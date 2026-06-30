/**
 * Design system — soft, girly, editorial.
 * Warm off-white base, full-colour model photography, a pastel accent family
 * (blush · sage · butter · peach · lavender), a signature rose, and a
 * high-contrast Fraunces serif with italic accents.
 */

export const colors = {
  // Core
  black: '#000000',
  white: '#FFFFFF',

  // Backgrounds & surfaces (warm off-white)
  bg: '#FFFCFB',
  surface: '#F8F1EE',
  surfaceAlt: '#F1E7E2',
  surfaceSunken: '#EBDFD9',

  // Ink (warm near-black)
  ink: '#241D21',
  inkSecondary: '#6B5F63',
  inkTertiary: '#9C9094',
  inkFaint: '#C7BBBE',
  inkInverse: '#FFFFFF',

  // Lines
  line: '#EEE4DF',
  lineStrong: '#DFD3CD',

  // Signature accent
  rose: '#D76A88',
  roseDeep: '#C0536F',
  roseSoft: '#F6D6DF',

  // Timer / progress-ring accent
  gold: '#F2B705',

  // Pastel family
  blush: '#F4B9C8',
  blushBg: '#FBE3E9',
  sage: '#BBD3B4',
  sageBg: '#E3EFDD',
  butter: '#F3DD9B',
  butterBg: '#FBF1CD',
  peach: '#F8C7A6',
  peachBg: '#FCE6D7',
  lavender: '#CDBDEA',
  lavenderBg: '#ECE4F7',

  // States
  overlay: 'rgba(0,0,0,0.55)',
  scrim: 'rgba(0,0,0,0.04)',
} as const;

/** Rotating pastel set for tiles (tile fill + soft text/number colour). */
export const PASTELS: { bg: string; ink: string }[] = [
  { bg: colors.blushBg, ink: '#B85C73' },
  { bg: colors.butterBg, ink: '#A98620' },
  { bg: colors.sageBg, ink: '#5E8456' },
  { bg: colors.peachBg, ink: '#C2723E' },
  { bg: colors.lavenderBg, ink: '#7E68A6' },
];

export const fonts = {
  // Display serif (Fraunces) — roman + italic
  display: 'Fraunces_600SemiBold',
  displayBold: 'Fraunces_700Bold',
  displayBlack: 'Fraunces_900Black',
  displayItalic: 'Fraunces_700Bold_Italic',
  displaySemiItalic: 'Fraunces_600SemiBold_Italic',
  blackItalic: 'Fraunces_900Black_Italic',
  // UI sans (Inter)
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
} as const;

export const type = {
  // Display (serif)
  hero: { fontFamily: fonts.displayBlack, fontSize: 52, lineHeight: 54, letterSpacing: -1.5, color: colors.ink },
  heroItalic: { fontFamily: fonts.blackItalic, fontSize: 52, lineHeight: 54, letterSpacing: -1.5, color: colors.ink },
  display: { fontFamily: fonts.displayBold, fontSize: 38, lineHeight: 42, letterSpacing: -0.8, color: colors.ink },
  displayItalic: { fontFamily: fonts.displayItalic, fontSize: 38, lineHeight: 42, letterSpacing: -0.8, color: colors.ink },
  title: { fontFamily: fonts.displayBold, fontSize: 28, lineHeight: 32, letterSpacing: -0.4, color: colors.ink },
  titleItalic: { fontFamily: fonts.displayItalic, fontSize: 28, lineHeight: 32, letterSpacing: -0.4, color: colors.ink },
  serif: { fontFamily: fonts.display, fontSize: 22, lineHeight: 28, letterSpacing: -0.2, color: colors.ink },
  serifItalic: { fontFamily: fonts.displaySemiItalic, fontSize: 22, lineHeight: 28, letterSpacing: -0.2, color: colors.ink },

  // UI (sans)
  h2: { fontFamily: fonts.bold, fontSize: 20, lineHeight: 26, letterSpacing: -0.2, color: colors.ink },
  h3: { fontFamily: fonts.semibold, fontSize: 17, lineHeight: 22, letterSpacing: -0.1, color: colors.ink },
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: colors.inkSecondary },
  bodyStrong: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 24, color: colors.ink },
  small: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.inkSecondary },
  smallStrong: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.ink },
  caption: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16, color: colors.inkTertiary },
  overline: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.6,
    textTransform: 'uppercase' as const,
    color: colors.inkTertiary,
  },
  button: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 20, letterSpacing: 0.1 },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 44,
  huge: 64,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const layout = {
  screenPadding: 22,
  maxContentWidth: 520,
} as const;

export const shadow = {
  card: {
    shadowColor: '#3A2A2E',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  floating: {
    shadowColor: '#3A2A2E',
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
} as const;

export const theme = { colors, fonts, type, spacing, radius, layout, shadow, PASTELS };
export default theme;
