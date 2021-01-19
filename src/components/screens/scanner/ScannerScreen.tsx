import React from 'react'
import { useNavigation } from '@react-navigation/native'
import QRCodeScanner from 'react-native-qrcode-scanner'
// import Orientation from 'react-native-orientation'
import { observer } from 'mobx-react-lite'

import { Alert } from '../../shared'
import { Routes } from '../../../config'
import { block_content, qrcode } from '../../../assets/images'
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
} from './styles'
import { useAppStore } from '../../../stores'

const ScannerScreen = observer(() => {
  const { settings } = useAppStore()
  const navigation = useNavigation()
  const [showAlert, setShowAlert] = React.useState(false)

  const onSuccess = React.useCallback((e: any) => {
    console.log(e)
  }, [])

  return (
    <Wrapper>
      <Header>
        <HeaderText>{settings.checkState}</HeaderText>
        <HeaderText>225</HeaderText>
        <MenuButton
          hitSlop={DEFAULT_HIT_SLOP}
          onPress={() => navigation.navigate(Routes.SETTINGS)}>
          <MenuIcon size={ICON_SIZE} name="dots-vertical" />
        </MenuButton>
      </Header>
      <QRCodeScanner
        cameraType={settings.cameraType}
        onRead={onSuccess}
        showMarker
        bottomContent={
          <BottomBarImage source={block_content} resizeMode="cover" />
        }
        customMarker={
          <Marker>
            <QRImage source={qrcode} />
          </Marker>
        }
      />

      <Alert
        title="Welcome Alexander"
        message="Market Franchising - ﻿Brasserie de l'abbaye du Val-dieu"
        fulName="Alexander Vansteelant"
        type="success"
        isVisible={showAlert}
        toggleOverlay={() => setShowAlert((prev) => !prev)}
        onNoPress={() => setShowAlert(false)}
        onYesPress={() => setShowAlert(false)}
      />
    </Wrapper>
  )
})

export default ScannerScreen
