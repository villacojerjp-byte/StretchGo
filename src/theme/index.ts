/**
 * Design system — strictly black & white.
 * Premium, editorial, minimal aesthetic: high-contrast serif display + clean
 * sans UI, generous spacing, soft neutral surfaces. No color, ever.
 */

export const colors = {
  // Core
  black: '#000000',
  white: '#FFFFFF',

  // Backgrounds & surfaces (true neutrals only — between black and white)
  bg: '#FFFFFF',
  surface: '#F4F4F2',
  surfaceAlt: '#ECECEA',
  surfaceSunken: '#E6E6E4',

  // Ink (text)
  ink: '#0A0A0A',
  inkSecondary: '#5B5B5B',
  inkTertiary: '#8C8C8C',
  inkFaint: '#B6B6B6',
  inkInverse: '#FFFFFF',

  // Lines
  line: '#E4E4E2',
  lineStrong: '#D2D2D0',

  // States (rendered with neutrals)
  overlay: 'rgba(0,0,0,0.55)',
  scrim: 'rgba(0,0,0,0.04)',
} as const;

export const fonts = {
  // Display serif (headlines, big numbers)
  display: 'Fraunces_600SemiBold',
  displayBold: 'Fraunces_700Bold',
  displayBlack: 'Fraunces_900Black',
  // UI sans
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
} as const;

export const type = {
  // Display (serif)
  hero: { fontFamily: fonts.displayBlack, fontSize: 52, lineHeight: 54, letterSpacing: -1.5, color: colors.ink },
  display: { fontFamily: fonts.displayBold, fontSize: 38, lineHeight: 42, letterSpacing: -0.8, color: colors.ink },
  title: { fontFamily: fonts.displayBold, fontSize: 28, lineHeight: 32, letterSpacing: -0.4, color: colors.ink },
  serif: { fontFamily: fonts.display, fontSize: 22, lineHeight: 28, letterSpacing: -0.2, color: colors.ink },

  // UI (sans)
  h2: { fontFamily: fonts.bold, fontSize: 20, lineHeight: 26, letterSpacing: -0.2, color: colors.ink },
  h3: { fontFamily: fonts.semibold, fontSize: 17, lineHeight: 22, letterSpacing: -0.1, color: colors.ink },
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: colors.inkSecondary },
  bodyStrong: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 24, color: colors.ink },
  small: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, color: colors.inkSecondary },
  smallStrong: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.ink },
  caption: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16, color: colors.inkTertiary },
  // All-caps tracked label
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

/** Subtle neutral shadow — used sparingly for elevation. */
export const shadow = {
  card: {
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  floating: {
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
} as const;

export const theme = { colors, fonts, type, spacing, radius, layout, shadow };
export default theme;
