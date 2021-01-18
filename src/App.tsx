import React from 'react'
import { StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'

import Router from './components/Router'
import { ThemeProvider, appTheme } from './styles/theme'
import { AppStoreProvider } from './stores/AppStore'

const App = () => {
  return (
    <AppStoreProvider>
      <ThemeProvider theme={appTheme}>
        <StatusBar barStyle="dark-content" hidden />
        <Router />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ThemeProvider>
    </AppStoreProvider>
  )
}

export default App
