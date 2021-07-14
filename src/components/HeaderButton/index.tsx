import React, { useContext } from 'react'
import { Pressable, View } from 'react-native'
import { ThemeContext } from 'src/styles/Theme'

import { styles } from './styles'
import { LayoutProps } from './types'

export const HeaderButton: React.FC<LayoutProps> = ({
  onPress,
  children,
  type = 'LEFT',
  buttonStyle,
}) => {
  const { Theme } = useContext(ThemeContext)
  return (
    <View
      style={[
        styles.flexible,
        type === 'LEFT' ? styles.paddingLeft : styles.paddingRight,
      ]}>
      <Pressable
        style={
          buttonStyle
            ? buttonStyle
            : { paddingHorizontal: Theme.spacing.HORIZONTAL_SCREEN_PADDING }
        }
        onPress={onPress}
        hitSlop={{ bottom: 15, left: 15, right: 15, top: 15 }}>
        {children}
      </Pressable>
    </View>
  )
}
