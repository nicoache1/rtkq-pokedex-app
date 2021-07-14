import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Home } from 'src/scenes/home'
import { PokemonDetail } from 'src/scenes/pokemonDetail'
import { Routes } from '../routes'

export type MainStackParamList = {
  [Routes.Home]: undefined
  [Routes.PokemonDetail]: { name: string }
}

const Stack = createStackNavigator<MainStackParamList>()

export const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={Routes.Home} component={Home} />
    <Stack.Screen name={Routes.PokemonDetail} component={PokemonDetail} />
  </Stack.Navigator>
)
