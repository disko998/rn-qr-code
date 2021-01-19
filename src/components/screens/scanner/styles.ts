import styled from 'styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { isTablet } from 'react-native-device-info'

export const ICON_SIZE = isTablet() ? 40 : 35
const BAR_HEIGHT = isTablet() ? 80 : 60

export const Wrapper = styled.View`
  flex: 1;
`

export const Header = styled.ImageBackground`
  width: 100%;
  min-height: ${BAR_HEIGHT}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-horizontal: 15px;
  position: absolute;
  top: 0;
  elevation: 1;
  z-index: 10;
`

export const HeaderText = styled.Text<{ translate?: boolean }>`
  font-weight: bold;
  font-size: ${isTablet() ? 30 : 24}px;
  color: ${(props) => props.theme.colors.light};
  ${(props) => (props.translate ? 'transform: translateX(-10px)' : '')};
`

export const BottomBarImage = styled.ImageBackground`
  height: ${BAR_HEIGHT}px;
  position: absolute;
  bottom: 0;
  width: 100%;
`

export const MenuIcon = styled(MaterialCommunityIcons)`
  color: ${(props) => props.theme.colors.light};
`

export const MenuButton = styled.TouchableOpacity``

export const Marker = styled.View`
  padding: ${isTablet() ? 80 : 30}px;
  border: 2px solid ${(props) => props.theme.colors.success};
`

export const QRImage = styled.Image`
  width: ${isTablet() ? 300 : 130}px;
  height: ${isTablet() ? 300 : 130}px;
`
