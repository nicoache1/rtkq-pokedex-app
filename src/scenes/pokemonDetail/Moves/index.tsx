import React from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Pokemon } from 'src/types/pokemon'

import { Move } from './Move'

interface MovesProps {
  data: Pokemon
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
})

export const Moves: React.FC<MovesProps> = ({ data }) => {
  const moves = data.moves

  return (
    <ScrollView style={styles.container}>
      {moves.map(move => (
        <Move move={move} />
      ))}
    </ScrollView>
  )
}
