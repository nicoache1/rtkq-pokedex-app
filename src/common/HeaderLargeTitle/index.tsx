import React from 'react'
import { View } from 'react-native'
import { HeaderButton } from 'src/components/HeaderButton'
import { useTheme } from 'src/styles/Theme'
import { PaletteScale, TypographyScale } from 'src/styles/types'
import BackIcon from 'src/assets/icons/back.svg'

import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { StyledText } from 'src/components/StyledText'
import { StyledContainer } from 'src/components/StyledContainer'

interface HeaderLargeTitleProps {
  title: string
  onPressBack?: () => void
}

export const HeaderLargeTitle: React.FC<HeaderLargeTitleProps> = ({
  title,
  onPressBack,
}) => {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const { Theme } = useTheme()

  return (
    <View style={styles.header}>
      <HeaderButton onPress={goBack}>
        <BackIcon
          height={32}
          width={32}
          fill={Theme.colors.ON_SURFACE_HIGH_EMPHASIS}
        />
      </HeaderButton>
      <StyledContainer style={{ flex: 1, paddingHorizontal: 20 }}>
        <StyledText
          typography={TypographyScale.H3_HEADLINE}
          style={styles.title}>
          {title}
        </StyledText>
      </StyledContainer>
    </View>
  )
}
