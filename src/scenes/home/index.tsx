import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface HomeProps {}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
})

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Pokedex App Starts</Text>
    </View>
  )
}
