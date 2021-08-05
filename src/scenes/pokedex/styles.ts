import { StyleSheet } from 'react-native'

import { HEADER_HEIGHT } from './constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 999,
  },
  headerButton: {
    padding: 0,
  },
  pokeballStyle: {
    position: 'absolute',
    right: -HEADER_HEIGHT / 3,
    top: -HEADER_HEIGHT / 6,
  },
})
