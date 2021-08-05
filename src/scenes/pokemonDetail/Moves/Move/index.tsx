import { capitalize } from 'lodash'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StyledContainer } from 'src/components/StyledContainer'
import { StyledText } from 'src/components/StyledText'
import { Move as MoveTypes } from 'src/types/pokemon'

interface MoveProps {
  move: MoveTypes
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  flexible: {
    flex: 1,
  },
})

export const Move: React.FC<MoveProps> = ({ move }) => {
  const moveDetails = move.versionGroupDetails[0]
  const learnMethod = moveDetails.moveLearnMethod.name
  const formattedLearn = capitalize(
    learnMethod.includes('level')
      ? `${learnMethod.replace('-up', ' ')} ${moveDetails.levelLearnedAt}`
      : learnMethod,
  )

  const name = capitalize(move.move.name.replaceAll('-', ' '))

  return (
    <StyledContainer style={styles.container}>
      <View style={styles.flexible}>
        <StyledText>{name}</StyledText>
      </View>
      <View style={styles.flexible}>
        <StyledText>{formattedLearn}</StyledText>
      </View>
    </StyledContainer>
  )
}
