import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { observer } from 'mobx-react-lite'
import { isTablet } from 'react-native-device-info'

import { useAppStore } from '../../../stores'
import { Alert as Notification } from '../../shared'
import { Routes, SCANNING_DELAY } from '../../../config'
import { qrcode } from '../../../assets/images'
import { DEFAULT_HIT_SLOP } from '../../../styles'
import {
  Wrapper,
  Header,
  HeaderText,
  BottomBarImage,
  MenuIcon,
  MenuButton,
  ICON_SIZE,
  Marker,
  QRImage,
  AbsoluteCenter,
} from './styles'

const ScannerScreen = observer(() => {
  const {
    settings,
    users,
    notification,
    isConnected,
    screenOrientation,
  } = useAppStore()
  const navigation = useNavigation()
  const [scanner, setScanner] = React.useState(React.createRef())

  const onRead = React.useCallback(
    (e: any) => {
      __DEV__ && console.log(e)

      if (e.type === 'UPC_E' || notification.isVisible) return

      users.scanUserTicket(e.data, isConnected)
    },
    [isConnected, users, notification.isVisible],
  )

  const mapImages = React.useMemo(
    () =>
      isTablet()
        ? {
            bottom: settings.event?.imageBottomTablet,
            top: settings.event?.imageTopTablet,
          }
        : {
            bottom:
              screenOrientation === 'LANDSCAPE'
                ? settings.event?.imageBottomTablet
                : settings.event?.imageBottomMobile,

            top: settings.event?.imageTopMobile,
          },
    [settings.event, screenOrientation],
  )

  return (
    <Wrapper>
      <Header source={{ uri: mapImages.top }}>
        <HeaderText>Check {settings.checkState}</HeaderText>
        <AbsoluteCenter>
          <HeaderText>{users.users.length}</HeaderText>
        </AbsoluteCenter>
        <MenuButton
          hitSlop={DEFAULT_HIT_SLOP}
          onPress={() => navigation.navigate(Routes.SETTINGS)}>
          <MenuIcon size={ICON_SIZE} name="dots-vertical" />
        </MenuButton>
      </Header>

      <QRCodeScanner
        fadeIn
        reactivate={true}
        reactivateTimeout={SCANNING_DELAY}
        ref={(node: any) => setScanner(node)}
        containerStyle={styles.camera}
        cameraStyle={styles.camera}
        cameraType={settings.cameraType}
        onRead={onRead}
        showMarker
        customMarker={
          <Marker>
            <QRImage source={qrcode} />
          </Marker>
        }
      />

      <BottomBarImage
        source={{ uri: mapImages.bottom }}
        resizeMode={screenOrientation === 'LANDSCAPE' ? 'stretch' : 'cover'}
      />

      <Notification
        title={notification.title}
        message={notification.message}
        fullName={notification.fullName}
        type={notification.type}
        description={notification.description}
        isVisible={notification.isVisible}
        showActions={notification.showActions}
        onDismiss={() => notification.dismiss()}
        onNoPress={() => notification.onNoPress && notification.onNoPress()}
        onYesPress={() => notification.onYesPress && notification.onYesPress()}
      />
    </Wrapper>
  )
})

const styles = StyleSheet.create({
  camera: { width: '100%', height: '100%' },
})
export default ScannerScreen
