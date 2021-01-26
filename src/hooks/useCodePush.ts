import { useEffect, useState } from 'react'
import codePush from 'react-native-code-push'

export const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
}

export const useCodePush = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    codePush.sync({
      updateDialog: {
        title: 'Update available',
      },
      installMode: codePush.InstallMode.IMMEDIATE,
    })
  }, [])

  return loading
}
