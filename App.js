import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Navigation from './navigation';

export default function App() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFontsAsync = async () => {
    await Font.loadAsync({
      'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFontsAsync();
  }, []);

  if (fontsLoaded) {
    return (
      <SafeAreaProvider style={{ flex: 1 }}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style='auto' />
      </SafeAreaProvider>
    );
  } else {
    return <AppLoading />;
  }
}
