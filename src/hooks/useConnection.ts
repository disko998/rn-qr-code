import React from 'react'
import NetInfo from '@react-native-community/netinfo'

export const useConnection = (onConnection?: () => void): boolean => {
  const [isConnected, setIsConnected] = React.useState(true)

  React.useEffect(() => {
    console.log('****************add listener*************')
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type)
      console.log('Is connected?', state.isConnected)
      setIsConnected(state.isConnected)

      if (state.isConnected) {
        onConnection && onConnection()
      } else {
        // on lost connection
      }
    })

    return unsubscribe
  }, [])

  return isConnected
}
