import { Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  container: {
    height: 130,
    width: width / 2 - 16,
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
  },
  pokeballIcon: {
    position: 'absolute',
    right: -30,
    bottom: -30,
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
