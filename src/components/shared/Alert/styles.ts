import styled from 'styled-components/native'
import { isTablet } from 'react-native-device-info'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  overlayStyle: {
    width: '80%',
    height: '80%',
    maxHeight: 300,
    padding: 0,
    overflow: 'hidden',
    borderRadius: 10,
  },
  backdropStyle: { backgroundColor: 'transparent' },
})

export const AlertHeader = styled.View<{ bg: string }>`
  padding: 30px 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bg};
`

export const AlertBody = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.light};
  padding: 20px;
`

export const AlertText = styled.Text<{ color?: string }>`
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.black};
`

export const AlertTitle = styled(AlertText)`
  font-size: 26px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.light};
`
