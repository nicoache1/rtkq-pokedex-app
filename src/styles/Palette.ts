import { PaletteScale, PaletteStyle } from './types'

// eslint-disable-next-line no-shadow
export enum Colors {
  PRIMARY = '#006d77',
  SECONDARY = '#4E4848',
  ERROR = '#b00020',
  THIRD = '#9C572B',
  ON_SURFACE = '#ffffff',
  ON_SURFACE_HIGH_EMPHASIS = '#000000',
  ON_SURFACE_MID_EMPHASIS = '#EFEFEF',
  ON_SURFACE_LOW_EMPHASIS = '#949494',
  BACKGROUND = '#f0f3fa',
  BACKGROUND_HIGH_EMPHASIS = '#000000',
  BACKGROUND_MID_EMPHASIS = '#616161',
  BACKGROUND_LOW_EMPHASIS = '#f3f3f3',
  SEPARATOR = '#9C572B',
  TRANSPARENT = 'transparent',
}

export const Palette: PaletteStyle<string> = {
  BACKGROUND: Colors.BACKGROUND,
  BACKGROUND_HIGH_EMPHASIS: Colors.BACKGROUND_HIGH_EMPHASIS,
  BACKGROUND_LOW_EMPHASIS: Colors.BACKGROUND_LOW_EMPHASIS,
  BACKGROUND_MID_EMPHASIS: Colors.BACKGROUND_MID_EMPHASIS,
  ERROR: Colors.ERROR,
  ON_SURFACE: Colors.ON_SURFACE,
  ON_SURFACE_HIGH_EMPHASIS: Colors.ON_SURFACE_HIGH_EMPHASIS,
  ON_SURFACE_LOW_EMPHASIS: Colors.ON_SURFACE_LOW_EMPHASIS,
  ON_SURFACE_MID_EMPHASIS: Colors.ON_SURFACE_MID_EMPHASIS,
  PRIMARY: Colors.PRIMARY,
  SECONDARY: Colors.SECONDARY,
  SEPARATOR: Colors.SEPARATOR,
  THIRD: Colors.THIRD,
  TRANSPARENT: Colors.TRANSPARENT,
}

function checkOpacityValue(opacity: number) {
  if (opacity < 0 || opacity > 1) {
    throw new Error(`opacity must between 0 and 1, got ${opacity}`)
  }
}

export const colorTranslucent = (color: PaletteScale, opacity: number) => {
  const colorToOpaque = Palette[color]
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorToOpaque)
  if (!result) {
    throw new Error(`Error in opacity`)
  }
  return `rgba(${parseInt(result[1], 16)}, ${parseInt(
    result[2],
    16,
  )}, ${parseInt(result[3], 16)},  ${opacity})`
}

export function blackTranslucent(opacity: number) {
  checkOpacityValue(opacity)
  return `rgba(0, 0, 0, ${opacity})`
}

export const lightenDarkenColor = (col: string, amt: number) => {
  var usePound = false
  if (col[0] == '#') {
    col = col.slice(1)
    usePound = true
  }
  var num = parseInt(col, 16)
  var r = (num >> 16) + amt
  if (r > 255) {
    r = 255
  } else if (r < 0) {
    r = 0
  }
  var b = ((num >> 8) & 0x00ff) + amt
  if (b > 255) {
    b = 255
  } else if (b < 0) {
    b = 0
  }
  var g = (num & 0x0000ff) + amt
  if (g > 255) {
    g = 255
  } else if (g < 0) {
    g = 0
  }
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}
