import React from 'react'
import Orientation from 'react-native-orientation'

import { useConnection } from '../hooks'
import { SettingsStore } from './SettingsStore'
import { UsersStore } from './UsersStore'
import { NotificationStore } from './NotificationStore'

export type AppStoreContextValue = {
  settings: SettingsStore
  users: UsersStore
  notification: NotificationStore
  isConnected: boolean
  screenOrientation: Orientation.orientation
}

export const settings = new SettingsStore()
export const users = new UsersStore()
export const notification = new NotificationStore()

const AppStoreContext = React.createContext<AppStoreContextValue>(
  {} as AppStoreContextValue,
)

export const AppStoreProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const isConnected = useConnection()
  const [screenOrientation, setScreenOrientation] = React.useState(
    Orientation.getInitialOrientation(),
  )

  const orientationDidChange = React.useCallback(
    (orientation: Orientation.orientation) => {
      setScreenOrientation(orientation)
    },
    [],
  )

  React.useEffect(() => {
    Orientation.addOrientationListener(orientationDidChange)

    return () => Orientation.removeOrientationListener(orientationDidChange)
  }, [orientationDidChange])

  return (
    <AppStoreContext.Provider
      value={{ settings, users, notification, isConnected, screenOrientation }}>
      {children}
    </AppStoreContext.Provider>
  )
}

export const useAppStore = () => React.useContext(AppStoreContext)
