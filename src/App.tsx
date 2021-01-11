import React from 'react'
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'

import Router from './components/Router'
import { ThemeProvider, appTheme } from './styles/theme'

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeWrapper}>
        <ThemeProvider theme={appTheme}>
          <Router />
        </ThemeProvider>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  safeWrapper: {
    flex: 1,
  },
})

export default App
