import { Dimensions, StyleSheet } from 'react-native'

import {
  HEADER_HEIGHT,
  IMAGE_SIZE,
  POKEBALL_SIZE,
  TAB_VIEW_HEIGHT,
} from './constants'

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
  tabContainer: {
    bottom: 0,
    height: TAB_VIEW_HEIGHT,
    left: 0,
    position: 'absolute',
    right: 0,
    top: IMAGE_SIZE - 50,
  },
  tabView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 30,
  },
})
