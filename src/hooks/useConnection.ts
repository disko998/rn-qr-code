import React from 'react'
import NetInfo from '@react-native-community/netinfo'
import Toast from 'react-native-simple-toast'

export const useConnection = (onConnection?: () => void): boolean => {
  const [isConnected, setIsConnected] = React.useState(true)

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      __DEV__ && console.log('Is connected?', state.isConnected)
      setIsConnected(state.isConnected && Boolean(state.isInternetReachable))

      if (state.isConnected && state.isInternetReachable) {
        onConnection?.()
        Toast.show('Connection online')
      } else {
        // on lost connection
        Toast.show('Connection offline')
      }
    })

    return unsubscribe
  }, [])

  return isConnected
}
