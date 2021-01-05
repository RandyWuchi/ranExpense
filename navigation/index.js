import * as React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens';

const customTheme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : customTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
}
