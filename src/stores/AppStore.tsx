import React from 'react'
import { SettingsStore } from './SettingsStore'

type AppStoreContextValue = {
  settingsStore: SettingsStore
}

const settingsStore = new SettingsStore()

const AppStoreContext = React.createContext<AppStoreContextValue>(
  {} as AppStoreContextValue,
)

export const AppStoreProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <AppStoreContext.Provider value={{ settingsStore }}>
      {children}
    </AppStoreContext.Provider>
  )
}

export const useAppStore = () => React.useContext(AppStoreContext)
