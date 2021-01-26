import 'react-native-gesture-handler'
import React from 'react'
import { AppRegistry, Text } from 'react-native'
import codePush from 'react-native-code-push'

import App from './src/App'
import { name as appName } from './app.json'
import { AppStoreProvider } from './src/stores'
import { useCodePush, codePushOptions } from './src/hooks'

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

export default function Index() {
  useCodePush()

  return (
    <AppStoreProvider>
      <App />
    </AppStoreProvider>
  )
}

AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(Index))
