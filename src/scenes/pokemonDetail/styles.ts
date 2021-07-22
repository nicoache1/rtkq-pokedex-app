import { Dimensions, StyleSheet } from 'react-native'

import { HEADER_HEIGHT, POKEBALL_SIZE } from './constants'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexible: {
    flex: 1,
  },
  headerButton: {
    padding: 0,
  },
  image: {
    height: 300,
    zIndex: 100,
  },
  pokeballStyle: {
    left: width / 2 - POKEBALL_SIZE / 2,
    position: 'absolute',
    top: HEADER_HEIGHT - POKEBALL_SIZE / 2,
  },
})
