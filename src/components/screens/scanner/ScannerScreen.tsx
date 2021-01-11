import React from 'react'
import { StyleSheet, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import QRCodeScanner from 'react-native-qrcode-scanner'

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
} from './elements'

const ScannerScreen = () => {
  const navigation = useNavigation()

  const onSuccess = React.useCallback((e: any) => {
    Linking.openURL(e.data).catch((err) =>
      console.error('An error occured', err),
    )
  }, [])

  return (
    <CameraView>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Header>
            <HeaderText>Check In</HeaderText>
            <HeaderText>225</HeaderText>
            <MenuButton
              hitSlop={DEFAULT_HIT_SLOP}
              onPress={() => navigation.navigate(Routes.SETTINGS)}>
              <MenuIcon size={ICON_SIZE} name="dots-vertical" />
            </MenuButton>
          </Header>
        }
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

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
})

export default ScannerScreen
