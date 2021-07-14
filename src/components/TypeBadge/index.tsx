import { capitalize } from 'lodash'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { lightenDarkenColor } from 'src/styles/Palette'
import { TypographyScale, PaletteScale } from 'src/styles/types'
import { StyledText } from '../StyledText'
import { StyledView } from '../StyledView'

interface TypeBadgeProps {
  color: string
  name: string
}

const styles = StyleSheet.create({
  badge: {
    width: 70,
    height: 20,
    marginVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
})

export const TypeBadge: React.FC<TypeBadgeProps> = ({ color, name }) => {
  return (
    <View
      style={[
        {
          backgroundColor: lightenDarkenColor(color, 50),
        },
        styles.badge,
      ]}>
      <StyledText
        typography={TypographyScale.CAPTION}
        color={PaletteScale.ON_SURFACE}>
        {capitalize(name)}
      </StyledText>
    </View>
  )
}
