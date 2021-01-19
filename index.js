import 'react-native-gesture-handler'
import React from 'react'
import { AppRegistry } from 'react-native'

import App from './src/App'
import { name as appName } from './app.json'
import { AppStoreProvider } from './src/stores'

export default function Index() {
  return (
    <AppStoreProvider>
      <App />
    </AppStoreProvider>
  )
}

AppRegistry.registerComponent(appName, () => Index)
