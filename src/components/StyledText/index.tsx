import { concat } from 'lodash'
import React, { useContext } from 'react'
import { StyleProp, Text, TextProps, TextStyle } from 'react-native'
import { ThemeContext } from 'src/styles/Theme'
import { PaletteScale, TypographyScale } from 'src/styles/types'

type TextCustomProps = {
  typography?: TypographyScale
  color?: PaletteScale
  children: React.ReactNode
} & TextProps

export const StyledText: React.FC<TextCustomProps> = (props) => {
  const { Theme: ActualTheme } = useContext(ThemeContext)
  const {
    color = PaletteScale.ON_SURFACE_HIGH_EMPHASIS,
    children,
    typography = TypographyScale.BODY1,
    style,
  } = props
  const themedColor = color
    ? ActualTheme.colors[color]
    : ActualTheme.colors.ON_SURFACE

  const themedTypography = ActualTheme.typography[typography]
  const contextStyle: StyleProp<TextStyle> = {
    color: themedColor,
    ...themedTypography,
  }

  const mergedStyle: StyleProp<TextStyle> = style
    ? style instanceof Array
      ? concat([contextStyle], style)
      : { ...contextStyle, ...(style as any) }
    : contextStyle

  return (
    <Text {...props} style={mergedStyle}>
      {children}
    </Text>
  )
}
