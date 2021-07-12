import React, { createContext, useContext } from 'react'

import { Palette } from './Palette'
import { Spacing } from './Spacing'
import { ITheme } from './types'
import { Typography } from './Typography'

export const Theme: ITheme = {
  colors: Palette,
  spacing: Spacing,
  typography: Typography,
}

export const ThemeContext: React.Context<{ Theme: ITheme }> = createContext({
  Theme,
})

export const useTheme = () => useContext(ThemeContext)
