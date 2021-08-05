import { Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

export const HEADER_HEIGHT = 140
export const POKEBALL_SIZE = HEADER_HEIGHT + 100
export const HEADER_HEIGHT_COLLAPSED = 60
export const IMAGE_SIZE = 300
export const TAB_VIEW_HEIGHT = height - (HEADER_HEIGHT + IMAGE_SIZE)
