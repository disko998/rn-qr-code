import React from 'react'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { block_content } from '../../../assets/images'
import { Routes } from '../../Router'
import { DEFAULT_HIT_SLOP } from '../../../styles'
import {
  CameraView,
  Header,
  HeaderText,
  BottomBarImage,
  MenuIcon,
  MenuButton,
  ICON_SIZE,
} from './styles'

const ScannerScreen = () => {
  const navigation = useNavigation()

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

      <Text style={{ marginTop: 15 }}>ScannerScreen</Text>
      <Text style={{ position: 'absolute', bottom: 20 }}>ScannerScreen</Text>

      <BottomBarImage source={block_content} resizeMode="cover" />
    </CameraView>
  )
}

export default ScannerScreen
