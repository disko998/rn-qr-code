import React from 'react'
import { Text } from 'react-native'

import { CameraView, Header, HeaderText, BottomBarImage } from './styles'
import { block_content } from '../../../assets/images'

export default function ScannerScreen() {
  return (
    <CameraView>
      <Header>
        <HeaderText>Check In</HeaderText>
        <HeaderText>225</HeaderText>
        <HeaderText>Menu icon</HeaderText>
      </Header>

      <Text style={{ marginTop: 15 }}>ScannerScreen</Text>
      <Text style={{ position: 'absolute', bottom: 20 }}>ScannerScreen</Text>

      <BottomBarImage source={block_content} />
    </CameraView>
  )
}
