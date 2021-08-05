import { TextStyle } from 'react-native'

export interface ITheme {
  colors: PaletteStyle<string>
  typography: TypographyStyle<TextStyle>
  spacing: SpacingStyle<number>
}

export enum TypographyScale {
  H0_HEADLINE = 'H0_HEADLINE',
  H1_HEADLINE = 'H1_HEADLINE',
  H2_HEADLINE = 'H2_HEADLINE',
  H3_HEADLINE = 'H3_HEADLINE',
  SUBTITLE1 = 'SUBTITLE1',
  SUBTITLE2 = 'SUBTITLE2',
  BODY1 = 'BODY1',
  BODY2 = 'BODY2',
  BUTTON = 'BUTTON',
  CAPTION = 'CAPTION',
  OVERLINE = 'OVERLINE',
}

export interface TypographyStyle<T> {
  [TypographyScale.H0_HEADLINE]: T
  [TypographyScale.H1_HEADLINE]: T
  [TypographyScale.H2_HEADLINE]: T
  [TypographyScale.H3_HEADLINE]: T
  [TypographyScale.SUBTITLE1]: T
  [TypographyScale.SUBTITLE2]: T
  [TypographyScale.BODY1]: T
  [TypographyScale.BODY2]: T
  [TypographyScale.BUTTON]: T
  [TypographyScale.CAPTION]: T
  [TypographyScale.OVERLINE]: T
}

export enum PaletteScale {
  'PRIMARY' = 'PRIMARY',
  'SECONDARY' = 'SECONDARY',
  'ERROR' = 'ERROR',
  'SUCCESS' = 'SUCCESS',
  'THIRD' = 'THIRD',
  'ON_SURFACE' = 'ON_SURFACE',
  'ON_SURFACE_HIGH_EMPHASIS' = 'ON_SURFACE_HIGH_EMPHASIS',
  'ON_SURFACE_MID_EMPHASIS' = 'ON_SURFACE_MID_EMPHASIS',
  'ON_SURFACE_LOW_EMPHASIS' = 'ON_SURFACE_LOW_EMPHASIS',
  'BACKGROUND' = 'BACKGROUND',
  'BACKGROUND_HIGH_EMPHASIS' = 'BACKGROUND_HIGH_EMPHASIS',
  'BACKGROUND_MID_EMPHASIS' = 'BACKGROUND_MID_EMPHASIS',
  'BACKGROUND_LOW_EMPHASIS' = 'BACKGROUND_LOW_EMPHASIS',
  'SEPARATOR' = 'SEPARATOR',
  'TRANSPARENT' = 'TRANSPARENT',
}

export interface PaletteStyle<T> {
  [PaletteScale.PRIMARY]: T
  [PaletteScale.SECONDARY]: T
  [PaletteScale.ERROR]: T
  [PaletteScale.SUCCESS]: T
  [PaletteScale.THIRD]: T
  [PaletteScale.ON_SURFACE]: T
  [PaletteScale.ON_SURFACE_HIGH_EMPHASIS]: T
  [PaletteScale.ON_SURFACE_MID_EMPHASIS]: T
  [PaletteScale.ON_SURFACE_LOW_EMPHASIS]: T
  [PaletteScale.BACKGROUND]: T
  [PaletteScale.BACKGROUND_HIGH_EMPHASIS]: T
  [PaletteScale.BACKGROUND_MID_EMPHASIS]: T
  [PaletteScale.BACKGROUND_LOW_EMPHASIS]: T
  [PaletteScale.SEPARATOR]: T
  [PaletteScale.TRANSPARENT]: T
}

export enum SpacingScale {
  HORIZONTAL_SCREEN_PADDING = 'HORIZONTAL_SCREEN_PADDING',
}

export interface SpacingStyle<T> {
  [SpacingScale.HORIZONTAL_SCREEN_PADDING]: T
}
