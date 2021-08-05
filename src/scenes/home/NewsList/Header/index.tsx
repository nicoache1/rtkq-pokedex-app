import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StyledText } from 'src/components/StyledText'
import { TypographyScale } from 'src/styles/types'

interface HeaderProps {}

const styles = StyleSheet.create({
  container: {
    height: 80,
    justifyContent: 'center',
  },
})

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <View style={styles.container}>
      <StyledText typography={TypographyScale.H3_HEADLINE}>
        Pokemon News
      </StyledText>
    </View>
  )
}
