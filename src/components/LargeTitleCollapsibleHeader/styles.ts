import { Dimensions, StyleSheet } from 'react-native'

export const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
  largeTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 0,
  },
  leftComponentContainer: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  rightComponentContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
