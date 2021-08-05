import { Dimensions, StyleSheet } from 'react-native'

import { CARD_SIZE } from '../constants'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    borderRadius: 16,
    height: 20,
    justifyContent: 'center',
    marginVertical: 3,
    width: 70,
  },
  badgesContainer: {
    paddingVertical: 6,
  },
  container: {
    borderRadius: 16,
    elevation: 5,
    height: CARD_SIZE,
    margin: 8,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: width / 2 - 16,
  },
  image: {
    height: 100,
  },
  imageContainer: {
    bottom: 0,
    height: 100,
    position: 'absolute',
    right: 0,
    width: 100,
  },
  pokeballIcon: {
    bottom: -30,
    position: 'absolute',
    right: -30,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
})
