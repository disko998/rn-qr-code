import React from 'react'
import { Overlay } from 'react-native-elements'

import { appTheme } from '../../../styles'
import { POPUP_DELAY } from '../../../config'
import {
  styles,
  AlertBody,
  AlertHeader,
  AlertText,
  AlertTitle,
  ButtonsContainer,
  AlertButton,
  AlertActionWrapper,
  ErrorText,
} from './styles'

const Alert = ({
  isVisible,
  onDismiss,
  type,
  title,
  message,
  fullName,
  onNoPress,
  onYesPress,
}: AlertProps) => {
  React.useEffect(() => {
    if (isVisible && type !== 'warn') {
      setTimeout(() => onDismiss(), POPUP_DELAY)
    }
  }, [isVisible, onDismiss, type])

  if (type === 'error') {
    return (
      <Overlay
        animationType="fade"
        isVisible={isVisible}
        onBackdropPress={onDismiss}
        backdropStyle={styles.backdropStyle}
        overlayStyle={styles.overlayErrorStyle}>
        <ErrorText>{title}</ErrorText>
      </Overlay>
    )
  }

  return (
    <Overlay
      animationType="fade"
      isVisible={isVisible}
      onBackdropPress={onDismiss}
      backdropStyle={styles.backdropStyle}
      overlayStyle={styles.overlayStyle}>
      <>
        <AlertHeader bg={TypeMap[type]}>
          <AlertTitle>{title}</AlertTitle>
        </AlertHeader>
        <AlertBody contentContainerStyle={styles.scrollContainer}>
          {type === 'warn' && (
            <AlertActionWrapper>
              <AlertText>Check in this attendee anyway?</AlertText>
              <ButtonsContainer>
                <AlertButton onPress={onNoPress}>
                  <AlertText>NO</AlertText>
                </AlertButton>
                <AlertButton onPress={onYesPress}>
                  <AlertText>YES</AlertText>
                </AlertButton>
              </ButtonsContainer>
            </AlertActionWrapper>
          )}

          <AlertText>{fullName}</AlertText>
          <AlertText>{message}</AlertText>
        </AlertBody>
      </>
    </Overlay>
  )
}

export type AlertProps = {
  isVisible: boolean
  onDismiss: () => void
  type: AlertType
  title: string
  fullName?: string
  message?: string
  onYesPress?: () => void
  onNoPress?: () => void
}

export type AlertType = 'success' | 'warn' | 'error' | 'info'

export const TypeMap = {
  success: appTheme.colors.success,
  warn: appTheme.colors.warning,
  error: appTheme.colors.danger,
  info: appTheme.colors.secondary,
}

export default Alert
