import React from 'react'

import { SettingsStore } from './SettingsStore'
import { UsersStore } from './UsersStore'

type AppStoreContextValue = {
  settings: SettingsStore
  users: UsersStore
}

export const settings = new SettingsStore()
export const users = new UsersStore()

const AppStoreContext = React.createContext<AppStoreContextValue>(
  {} as AppStoreContextValue,
)

export const AppStoreProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <AppStoreContext.Provider value={{ settings, users }}>
      {children}
    </AppStoreContext.Provider>
  )
}

export const useAppStore = () => React.useContext(AppStoreContext)
