import React from 'react'
import { Overlay } from 'react-native-elements'

import { appTheme } from '../../../styles'
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

export default function Alert({
  isVisible,
  toggleOverlay,
  type,
  title,
  message,
  fulName,
  onNoPress,
  onYesPress,
}: AlertProps) {
  if (type === 'error') {
    return (
      <Overlay
        animationType="fade"
        isVisible={isVisible}
        onBackdropPress={toggleOverlay}
        backdropStyle={styles.backdropStyle}
        overlayStyle={styles.overlayErrorStyle}>
        <ErrorText>Code not recognized</ErrorText>
      </Overlay>
    )
  }

  return (
    <Overlay
      animationType="fade"
      isVisible={isVisible}
      onBackdropPress={toggleOverlay}
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

          <AlertText>{fulName}</AlertText>
          <AlertText>{message}</AlertText>
        </AlertBody>
      </>
    </Overlay>
  )
}

type AlertProps = {
  isVisible: boolean
  toggleOverlay?: () => void
  type: AlertType
  title: string
  fulName?: string
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
