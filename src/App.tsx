import React from 'react'
import { StatusBar } from 'react-native'

import Router from './components/Router'
import { ThemeProvider, appTheme } from './styles/theme'

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
        hidden
      />
      <ThemeProvider theme={appTheme}>
        <Router />
      </ThemeProvider>
    </>
  )
}

export default App
