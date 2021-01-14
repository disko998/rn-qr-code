import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'

import { ScannerScreen, SettingsScreen } from './screens'
import { appTheme } from '../styles'
import { Routes } from '../config'

const Stack = createStackNavigator()

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Routes.SCANNER}
          component={ScannerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.SETTINGS}
          component={SettingsScreen}
          options={{
            headerShown: true,
            headerTintColor: appTheme.colors.light,
            headerStyle: styles.settingsHeader,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  settingsHeader: {
    backgroundColor: appTheme.colors.secondary,
  },
})

export default Router
