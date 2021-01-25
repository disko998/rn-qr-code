import React from 'react'
import { useConnection } from '../hooks'

import { SettingsStore } from './SettingsStore'
import { UsersStore } from './UsersStore'
import { NotificationStore } from './NotificationStore'

type AppStoreContextValue = {
  settings: SettingsStore
  users: UsersStore
  notification: NotificationStore
  isConnected: boolean
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
  const isConnected = useConnection(() => {
    settings.loadEvents()
  })

  return (
    <AppStoreContext.Provider
      value={{ settings, users, notification, isConnected }}>
      {children}
    </AppStoreContext.Provider>
  )
}

export const useAppStore = () => React.useContext(AppStoreContext)
