import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { isTablet } from 'react-native-device-info'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const ICON_SIZE = 40
const BAR_HEIGHT = 60

export const CameraView = styled.View`
  flex: 1;
`

export const Header = styled.View`
  width: 100%;
  min-height: ${BAR_HEIGHT}px;
  background-color: ${(props) => props.theme.colors.bar};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-horizontal: 15px;
  position: absolute;
  top: 0;
  elevation: 1;
  z-index: 99;
`
//  padding-top: ${getStatusBarHeight()}px;

export const HeaderText = styled.Text<{ translate?: boolean }>`
  font-weight: bold;
  font-size: 24px;
  color: ${(props) => props.theme.colors.light};
  ${(props) => (props.translate ? 'transform: translateX(-25px)' : '')};
`

export const BottomBarImage = styled.ImageBackground`
  height: ${BAR_HEIGHT}px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  elevation: 1;
`

export const MenuIcon = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.colors.light};
`

export const MenuButton = styled.TouchableOpacity``

export const Marker = styled.View`
  padding: 30px;
  border: 2px solid ${(props) => props.theme.colors.success};
`

export const QRImage = styled.Image`
  width: ${isTablet() ? 300 : 150}px
  height: ${isTablet() ? 300 : 150}px
`
