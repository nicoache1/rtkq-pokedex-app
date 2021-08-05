import { capitalize } from 'lodash'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { StyledText } from 'src/components/StyledText'
import { TypeBadge } from 'src/components/TypeBadge'
import { PaletteScale, TypographyScale } from 'src/styles/types'
import { Pokemon } from 'src/types/pokemon'

import { HEADER_HEIGHT, HEADER_HEIGHT_COLLAPSED } from '../constants'

interface HeaderProps {
  data: Pokemon | undefined
}

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT - HEADER_HEIGHT_COLLAPSED,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  subtitleContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})

const getPokedexNumber = (id: number) => {
  if (id < 10) {
    return `#00${id}`
  }
  if (id < 100) {
    return `#0${id}`
  }
  return `#${id}`
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  const name = data?.name ?? ''
  const number = getPokedexNumber(data?.id ?? 0)
  const types = data?.types ?? []
  const renderBadges: JSX.Element[] = types.map((typeItem, index) => (
    <TypeBadge key={`${index}`} {...typeItem.type} />
  ))

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.titleContainer}>
          <StyledText
            typography={TypographyScale.H2_HEADLINE}
            color={PaletteScale.ON_SURFACE}>
            {capitalize(name)}
          </StyledText>
        </View>
        <View style={styles.subtitleContainer}>
          <StyledText
            typography={TypographyScale.H2_HEADLINE}
            color={PaletteScale.ON_SURFACE}>
            {number}
          </StyledText>
        </View>
      </View>
      <View style={styles.titleContainer}>{renderBadges}</View>
    </View>
  )
}
