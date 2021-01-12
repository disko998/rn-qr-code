import React from 'react'
import { Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import Orientation from 'react-native-orientation'

import { Routes } from '../../Router'
import { block_content, qrcode } from '../../../assets/images'
import { DEFAULT_HIT_SLOP } from '../../../styles'
import {
  CameraView,
  Header,
  HeaderText,
  BottomBarImage,
  MenuIcon,
  MenuButton,
  ICON_SIZE,
  Marker,
  QRImage,
} from './styles'

const ScannerScreen = () => {
  const navigation = useNavigation()
  const [screenOrientation, setScreenOrientation] = React.useState(
    Orientation.getInitialOrientation(),
  )

  React.useEffect(() => {
    Orientation.addOrientationListener((oritentation) => {
      setScreenOrientation(oritentation)
    })
  }, [])

  const onSuccess = React.useCallback((e: any) => {
    Linking.openURL(e.data).catch((err) =>
      console.error('An error occured', err),
    )
  }, [])

  console.log(screenOrientation)

  return (
    <CameraView>
      <Header>
        <HeaderText>Check In</HeaderText>
        <HeaderText>225</HeaderText>
        <MenuButton
          hitSlop={DEFAULT_HIT_SLOP}
          onPress={() => navigation.navigate(Routes.SETTINGS)}>
          <MenuIcon size={ICON_SIZE} name="dots-vertical" />
        </MenuButton>
      </Header>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker
        // flashMode={RNCamera.Constants.FlashMode.torch}
        // topContent={
        //   <Header>
        //     <HeaderText>Check In</HeaderText>
        //     <HeaderText>225</HeaderText>
        //     <MenuButton
        //       hitSlop={DEFAULT_HIT_SLOP}
        //       onPress={() => navigation.navigate(Routes.SETTINGS)}>
        //       <MenuIcon size={ICON_SIZE} name="dots-vertical" />
        //     </MenuButton>
        //   </Header>
        // }
        bottomContent={
          <BottomBarImage source={block_content} resizeMode="cover" />
        }
        customMarker={
          <Marker>
            <QRImage source={qrcode} />
          </Marker>
        }
      />
    </CameraView>
  )
}

export default ScannerScreen
