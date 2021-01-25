import 'react-native-gesture-handler'
import React from 'react'
import { AppRegistry, Text } from 'react-native'

import App from './src/App'
import { name as appName } from './app.json'
import { AppStoreProvider } from './src/stores'

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

export default function Index() {
  return (
    <AppStoreProvider>
      <App />
    </AppStoreProvider>
  )
}

AppRegistry.registerComponent(appName, () => Index)
