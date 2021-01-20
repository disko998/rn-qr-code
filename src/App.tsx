import React from 'react'
import { StatusBar } from 'react-native'

import Router from './components/Router'
import { ThemeProvider, appTheme } from './styles/theme'
import { useAppStore } from './stores/AppStore'
import { useConnection } from './hooks'

const App = () => {
  const { settings, users } = useAppStore()
  useConnection(() => {
    settings.loadEvents()
    users.loadUsers('a977890a-956f-4262-a38e-cc2017dce28f')
  })

  return (
    <>
      <StatusBar barStyle="dark-content" hidden />
      <ThemeProvider theme={appTheme}>
        <Router />
      </ThemeProvider>
    </>
  )
}

export default App
