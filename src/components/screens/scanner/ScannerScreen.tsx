import React from 'react'
import { useNavigation } from '@react-navigation/native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { observer } from 'mobx-react-lite'
import { isTablet } from 'react-native-device-info'
import Orientation from 'react-native-orientation'

import { useAppStore } from '../../../stores'
import { Alert as Notification } from '../../shared'
import { Routes } from '../../../config'
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
  const { settings, users } = useAppStore()
  const navigation = useNavigation()
  const [screenOrientation, setScreenOrientation] = React.useState(
    Orientation.getInitialOrientation(),
  )

  const mapImage = React.useMemo(
    () =>
      isTablet()
        ? {
            bottom: settings.event ? settings.event.imageBottomTablet : '',
            top: settings.event ? settings.event.imageTopTablet : '',
          }
        : {
            bottom: settings.event
              ? screenOrientation === 'LANDSCAPE'
                ? settings.event.imageBottomTablet
                : settings.event.imageBottomMobile
              : '',

            top: settings.event ? settings.event.imageTopMobile : '',
          },
    [settings.event, screenOrientation],
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

  const onRead = React.useCallback((e: any) => {
    __DEV__ && console.log(e)

    if (e.type === 'QR_CODE') {
      users.validateScan(e.data)
    }
  }, [])

  return (
    <Wrapper>
      <Header source={{ uri: mapImage.top }}>
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
        reactivate={false}
        reactivateTimeout={3000}
        // ref={(node: any) => setScanner(node)}
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

      <BottomBarImage source={{ uri: mapImage.bottom }} resizeMode="cover" />

      <Notification
        title={users.alertState.title}
        message={users.alertState.message}
        fullName="Alexander Vansteelant"
        type={users.alertState.type}
        isVisible={users.alertState.isVisible}
        onDismiss={users.dismissAlert}
        onNoPress={users.dismissAlert}
        onYesPress={users.dismissAlert}
      />
    </Wrapper>
  )
})

const styles = {
  camera: { width: '100%', height: '100%' },
}

export default ScannerScreen
