import React from 'react'
import NetInfo from '@react-native-community/netinfo'
import Toast from 'react-native-simple-toast'

export const useConnection = (onConnection?: () => void): boolean => {
  const [isConnected, setIsConnected] = React.useState(true)

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      __DEV__ && console.log('Is connected?', state.isConnected)
      setIsConnected(state.isConnected)

      if (state.isConnected) {
        onConnection?.()
      } else {
        // on lost connection
        Toast.show('Connection lost')
      }
    })

    return unsubscribe
  }, [])

  return isConnected
}
