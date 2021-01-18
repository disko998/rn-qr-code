import React from 'react'

import { SettingsStore } from './SettingsStore'

type AppStoreContextValue = {
  settings: SettingsStore
}

const settings = new SettingsStore()

const AppStoreContext = React.createContext<AppStoreContextValue>(
  {} as AppStoreContextValue,
)

export const AppStoreProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <AppStoreContext.Provider value={{ settings }}>
      {children}
    </AppStoreContext.Provider>
  )
}

export const useAppStore = () => React.useContext(AppStoreContext)
