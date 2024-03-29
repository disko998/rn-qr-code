import React from 'react'
import { StatusBar } from 'react-native'
import { observer } from 'mobx-react-lite'

import Router from './components/Router'
import { ThemeProvider, appTheme } from './styles/theme'
import { useAppStore } from './stores/AppStore'
import { PULL_INTERVAL } from './config'

const App = observer(() => {
  const { users } = useAppStore()

  React.useEffect(() => {
    setInterval(() => users.loadUsers(), PULL_INTERVAL)
  }, [users])

  return (
    <>
      <StatusBar barStyle="dark-content" hidden />
      <ThemeProvider theme={appTheme}>
        <Router />
      </ThemeProvider>
    </>
  )
})

export default App
