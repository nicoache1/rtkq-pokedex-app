import { Dimensions, StyleSheet } from 'react-native'
import { CARD_HEIGHT } from '../constants'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
    width: width / 2 - 36,
    margin: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 16,
    overflow: 'hidden',
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  pokeballIcon: {
    position: 'absolute',
    right: -20,
    top: 0,
  },
  badge: {
    width: 70,
    height: 20,
    marginVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  imageContainer: {
    right: 0,
    bottom: 0,
    position: 'absolute',
    height: 100,
    width: 100,
  },
  image: {
    height: 100,
  },
})
