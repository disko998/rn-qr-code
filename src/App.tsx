import React from 'react'
import { StatusBar } from 'react-native'

import Router from './components/Router'
import { ThemeProvider, appTheme } from './styles/theme'
import { AppStoreProvider } from './stores/AppStore'

const App = () => {
  return (
    <AppStoreProvider>
      <StatusBar barStyle="dark-content" hidden />
      <ThemeProvider theme={appTheme}>
        <Router />
      </ThemeProvider>
    </AppStoreProvider>
  )
}

export default App
