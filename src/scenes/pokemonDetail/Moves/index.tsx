import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { StyledContainer } from 'src/components/StyledContainer'
import { StyledText } from 'src/components/StyledText'
import { Pokemon } from 'src/types/pokemon'

interface MovesProps {
  data: Pokemon
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export const Moves: React.FC<MovesProps> = ({ data }) => {
  const moves = data.moves

  return (
    <ScrollView style={styles.container}>
      {moves.map(move => (
        <StyledContainer>
          <View style={{ flex: 1 }}>
            <StyledText>{move.move.name}</StyledText>
          </View>
          <View style={{ flex: 1 }}>
            <StyledText>
              {move.versionGroupDetails[0].levelLearnedAt}
            </StyledText>
          </View>
        </StyledContainer>
      ))}
    </ScrollView>
  )
}
