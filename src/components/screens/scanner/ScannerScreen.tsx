import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { observer } from 'mobx-react-lite'
import { isTablet } from 'react-native-device-info'
import Orientation from 'react-native-orientation'

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
  const { settings, users, notification, isConnected } = useAppStore()
  const navigation = useNavigation()
  const [scanner, setScanner] = React.useState(React.createRef())
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

  const onRead = React.useCallback(
    (e: any) => {
      __DEV__ && console.log(e)

      if (e.type === 'QR_CODE') {
        users.scanUserTicket(e.data, isConnected)
      }
    },
    [isConnected, users],
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

      <BottomBarImage source={{ uri: mapImages.bottom }} resizeMode="cover" />

      <Notification
        title={notification.title}
        message={notification.message}
        fullName={notification.fullName}
        type={notification.type}
        isVisible={notification.isVisible}
        onDismiss={() => notification.dismiss()}
        onNoPress={() => notification.dismiss()}
        onYesPress={() => notification.dismiss()}
      />
    </Wrapper>
  )
})

const styles = StyleSheet.create({
  camera: { width: '100%', height: '100%' },
})
export default ScannerScreen
