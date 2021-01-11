import styled from 'styled-components/native'

const BAR_HEIGHT = 60

export const CameraView = styled.View`
  flex: 1;
`

export const Header = styled.View`
  width: 100%;
  height: ${BAR_HEIGHT}px;
  background-color: ${(props) => props.theme.colors.bar};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 15px;
  position: absolute;
  top: 0;
  elevation: 1;
`

export const HeaderText = styled.Text`
  font-weight: bold;
  font-size: 24px;
  color: ${(props) => props.theme.colors.light};
`

export const BottomBarImage = styled.ImageBackground`
  width: 100%;
  height: ${BAR_HEIGHT}px;
  position: absolute;
  bottom: 0;
  elevation: 1;
`
