import React from 'react'

import { SettingsStore } from './SettingsStore'
import { UsersStore } from './UsersStore'
import { NotificationStore } from './NotificationStore'

type AppStoreContextValue = {
  settings: SettingsStore
  users: UsersStore
  notification: NotificationStore
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
  return (
    <AppStoreContext.Provider value={{ settings, users, notification }}>
      {children}
    </AppStoreContext.Provider>
  )
}

export const useAppStore = () => React.useContext(AppStoreContext)
