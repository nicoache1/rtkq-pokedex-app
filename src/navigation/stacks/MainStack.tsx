import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Home } from 'src/scenes/home'
import { Routes } from '../routes'

export type MainStackParamList = {
  [Routes.Home]: undefined
}

const Stack = createStackNavigator<MainStackParamList>()

export const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={Routes.Home} component={Home} />
  </Stack.Navigator>
)
