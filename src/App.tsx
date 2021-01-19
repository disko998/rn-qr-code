import React from 'react'
import { StatusBar } from 'react-native'
import Toast from 'react-native-toast-message'

import Router from './components/Router'
import { ThemeProvider, appTheme } from './styles/theme'
import { useAppStore } from './stores/AppStore'
import { useConnection } from './hooks'

const App = () => {
  const { settings } = useAppStore()
  useConnection(() => {
    settings.loadEvents()
  })

  return (
    <>
      <StatusBar barStyle="dark-content" hidden />
      <ThemeProvider theme={appTheme}>
        <Router />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </ThemeProvider>
    </>
  )
}

export default App
