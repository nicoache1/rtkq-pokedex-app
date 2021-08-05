import { StyleSheet } from 'react-native'

import { HEADER_HEIGHT } from './constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pokeball: {
    position: 'absolute',
    right: -HEADER_HEIGHT / 3,
    top: -HEADER_HEIGHT / 6,
  },
})
