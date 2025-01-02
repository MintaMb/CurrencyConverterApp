import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SafeAreaView, StatusBar} from 'react-native';
import {ThemeProvider, useTheme} from './src/contexts/ThemeContext';
import {lightTheme, darkTheme} from './src/styles/theme';
import {ThemeSwitch} from './src/components/ThemeSwitch';
import BottomBar from './src/components/BottomBar';
import CurrencyConversionHistoryScreen from './src/screens/CurrencyConversionHistoryScreen';
import CurrencyConversionScreen from './src/screens/CurrencyConversionScreen';
import 'react-native-gesture-handler';
const Tab = createBottomTabNavigator();

function MainApp() {
  const {theme} = useTheme();
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <NavigationContainer theme={currentTheme}>
      <StatusBar />
      <SafeAreaView style={{flex: 1}}>
        <Tab.Navigator
          tabBar={props => <BottomBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen
            name="CurrencyConversionScreen"
            component={CurrencyConversionScreen}
          />
          <Tab.Screen
            name="CurrencyConversionHistoryScreen"
            component={CurrencyConversionHistoryScreen}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <MainApp />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
