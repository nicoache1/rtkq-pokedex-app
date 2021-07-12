import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Home} from 'src/scenes/home';
import {Routes} from '../routes';

const Stack = createStackNavigator();

export const MainStack = () => (
    <Stack.Navigator>
      <Stack.Screen name={Routes.Home} component={Home} />
    </Stack.Navigator>
  );

