import { concat } from 'lodash'
import React, { useContext } from 'react'
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native'
import { ThemeContext } from 'src/styles/Theme'
import { PaletteScale } from 'src/styles/types'

type CustomViewProps = {
  color?: PaletteScale
  children?: React.ReactNode
  ref?: React.MutableRefObject<View | undefined>
} & ViewProps

export const StyledView = React.forwardRef<any, CustomViewProps>(
  (props, ref) => {
    const { Theme: ActualTheme } = useContext(ThemeContext)

    const { children, color, style } = props
    const themedColor = color
      ? ActualTheme.colors[color]
      : ActualTheme.colors.TRANSPARENT

    const contextStyle: StyleProp<ViewStyle> = {
      backgroundColor: themedColor,
    }

    const mergedStyle: StyleProp<ViewStyle> = style
      ? style instanceof Array
        ? concat([contextStyle], style)
        : StyleSheet.flatten([contextStyle, style])
      : contextStyle

    return (
      <View {...props} ref={ref as any} style={mergedStyle}>
        {children}
      </View>
    )
  },
)
