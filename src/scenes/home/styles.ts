import { Dimensions, StyleSheet } from 'react-native'
import { HEADER_HEIGHT } from './constants'

const { height, width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  pokeball: {
    position: 'absolute',
    top: -HEADER_HEIGHT / 6,
    right: -HEADER_HEIGHT / 3,
  },
})
