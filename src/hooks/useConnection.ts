import React from 'react'
import NetInfo from '@react-native-community/netinfo'
import Toast from 'react-native-simple-toast'

import { settings, users } from '../stores/AppStore'

export const useConnection = (): boolean => {
  const [isConnected, setIsConnected] = React.useState(false)

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      __DEV__ && console.log('Is connected?', state.isConnected)
      setIsConnected(state.isConnected && Boolean(state.isInternetReachable))

      if (state.isConnected && state.isInternetReachable) {
        Toast.show('Connection online')

        settings.loadEvents()
        users.consumePending()
      } else {
        // on lost connection
        Toast.show('Connection offline')
      }
    })

    return unsubscribe
  }, [])

  return isConnected
}
