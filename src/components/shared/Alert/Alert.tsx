import React from 'react'
import { Overlay } from 'react-native-elements'

import { appTheme } from '../../../styles'
import { styles, AlertBody, AlertHeader, AlertText, AlertTitle } from './styles'

export default function Alert({ isVisible, toggleOverlay, type }: AlertProps) {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={toggleOverlay}
      backdropStyle={styles.backdropStyle}
      overlayStyle={styles.overlayStyle}>
      <>
        <AlertHeader bg={TypeMap[type]}>
          <AlertTitle color={appTheme.colors.light}>
            Welcome Alexander
          </AlertTitle>
        </AlertHeader>
        <AlertBody>
          <AlertText>
            Alexander Vansteelant Market Franchising - Brasserie de l'abbaye du
            Val-dieu
          </AlertText>
        </AlertBody>
      </>
    </Overlay>
  )
}

type AlertProps = {
  isVisible: boolean
  toggleOverlay?: () => void
  type: AlertType
}

export type AlertType = 'success' | 'warn' | 'error' | 'info'

export const TypeMap = {
  success: appTheme.colors.success,
  warn: appTheme.colors.warning,
  error: appTheme.colors.danger,
  info: appTheme.colors.secondary,
}
