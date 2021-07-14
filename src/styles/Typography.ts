import { TextStyle } from 'react-native'

import { TypographyScale, TypographyStyle } from './types'

export const Typography: TypographyStyle<TextStyle> = {
  [TypographyScale.H0_HEADLINE]: {
    fontSize: 72,
    fontWeight: '900',
  },
  [TypographyScale.H1_HEADLINE]: {
    fontSize: 54,
    fontWeight: '900',
    letterSpacing: 0.24,
  },
  [TypographyScale.H2_HEADLINE]: {
    fontSize: 36,
  },
  [TypographyScale.H3_HEADLINE]: {
    fontSize: 28,
    letterSpacing: 0.15,
    fontWeight: 'bold',
  },
  [TypographyScale.SUBTITLE1]: {
    fontSize: 18,
    letterSpacing: 0.16,
    lineHeight: 24,
  },
  [TypographyScale.SUBTITLE2]: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.11,
    lineHeight: 24,
  },
  [TypographyScale.BODY1]: {
    fontSize: 16,
    letterSpacing: 0.47,
  },
  [TypographyScale.BODY2]: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.27,
  },
  [TypographyScale.BUTTON]: {
    fontSize: 46,
    fontWeight: 'bold',
    letterSpacing: 1.35,
    textTransform: 'uppercase',
  },
  [TypographyScale.CAPTION]: {
    fontSize: 13,
    letterSpacing: 0.43,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  [TypographyScale.OVERLINE]: {
    fontSize: 14,
    letterSpacing: 0.43,
    lineHeight: 16,
  },
}
