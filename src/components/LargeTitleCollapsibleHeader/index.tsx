import { StackHeaderProps } from '@react-navigation/stack'
import React from 'react'
import { Animated as RNAnimated, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyledContainer } from 'src/components/StyledContainer'
import { StyledText } from 'src/components/StyledText'
import { useTheme } from 'src/styles/Theme'
import { PaletteScale, TypographyScale } from 'src/styles/types'

import { styles } from './styles'

interface LargeTitleCollapsibleHeaderProps {
  maxHeight: number
  collapsedHeight?: number
  animationProgress?: Animated.SharedValue<number>
  leftComponent?: React.ReactNode
  rightComponent?: React.ReactNode
  largeTitleComponent?: React.ReactNode
  largeTitle: string
  title?: string
  scene?: StackHeaderProps['scene']
  backgroundColor?: string
  largeTitleColor?: PaletteScale
}

type DefaultComponent = Pick<
  LargeTitleCollapsibleHeaderProps,
  'largeTitle' | 'largeTitleColor'
>

const DefaultLargeTitleComponent: React.FC<DefaultComponent> = ({
  largeTitle,
  largeTitleColor,
}) => (
  <StyledText
    typography={TypographyScale.H2_HEADLINE}
    color={largeTitleColor ? largeTitleColor : PaletteScale.ON_SURFACE}>
    {largeTitle}
  </StyledText>
)

export const LargeTitleCollapsibleHeader: React.FC<LargeTitleCollapsibleHeaderProps> =
  ({
    collapsedHeight = 0,
    maxHeight,
    animationProgress,
    largeTitle,
    title = largeTitle,
    leftComponent,
    rightComponent,
    scene,
    backgroundColor,
    largeTitleColor = PaletteScale.ON_SURFACE_HIGH_EMPHASIS,
    largeTitleComponent,
  }) => {
    const collapsibleSectionHeight = maxHeight - collapsedHeight

    const { Theme } = useTheme()

    const headerCollapsibleStyle = useAnimatedStyle(() => ({
      height: animationProgress
        ? interpolate(
            animationProgress.value,
            [0, collapsibleSectionHeight],
            [maxHeight, collapsedHeight],
            Extrapolate.CLAMP,
          )
        : maxHeight,
    }))

    const headerTitleStyle = useAnimatedStyle(() => ({
      opacity: animationProgress
        ? interpolate(
            animationProgress.value,
            [0, collapsibleSectionHeight],
            [0, 1],
            Extrapolate.CLAMP,
          )
        : 0,
    }))

    const largeTitleStyle = useAnimatedStyle(() => ({
      opacity: animationProgress
        ? interpolate(
            animationProgress.value,
            [0, collapsibleSectionHeight],
            [1, 0],
            Extrapolate.CLAMP,
          )
        : 1,
    }))

    const sceneProgress = RNAnimated.add(
      scene?.progress.current ?? 0,
      scene?.progress.next ?? 0,
    )

    const opacity = sceneProgress.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    })

    return (
      <RNAnimated.View style={{ opacity }}>
        <SafeAreaView
          style={{
            backgroundColor: backgroundColor
              ? backgroundColor
              : Theme.colors.ON_SURFACE,
          }}
          edges={['top']}>
          <Animated.View style={headerCollapsibleStyle}>
            <StyledContainer
              color={PaletteScale.TRANSPARENT}
              style={[styles.headerContainer, { height: collapsedHeight }]}>
              <View style={styles.leftComponentContainer}>{leftComponent}</View>
              <Animated.View style={[styles.titleContainer, headerTitleStyle]}>
                <StyledText
                  typography={TypographyScale.BODY2}
                  color={largeTitleColor}>
                  {title}
                </StyledText>
              </Animated.View>
              <View style={styles.rightComponentContainer}>
                {rightComponent}
              </View>
            </StyledContainer>
            <StyledContainer
              color={PaletteScale.TRANSPARENT}
              style={styles.largeTitleContainer}>
              <Animated.View style={largeTitleStyle}>
                {largeTitleComponent !== undefined && largeTitleComponent}
                {!largeTitleComponent && (
                  <DefaultLargeTitleComponent
                    largeTitle={largeTitle}
                    largeTitleColor={largeTitleColor}
                  />
                )}
              </Animated.View>
            </StyledContainer>
          </Animated.View>
        </SafeAreaView>
      </RNAnimated.View>
    )
  }
