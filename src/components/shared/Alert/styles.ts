import styled from 'styled-components/native'
import { isTablet } from 'react-native-device-info'
import { StyleSheet } from 'react-native'

import { appTheme } from '../../../styles'

export const styles = StyleSheet.create({
  overlayStyle: {
    width: '90%',
    height: '80%',
    maxWidth: isTablet() ? 600 : 500,
    maxHeight: isTablet() ? 300 : 280,
    padding: 0,
    overflow: 'hidden',
    borderRadius: 10,
  },
  overlayErrorStyle: {
    width: '100%',
    padding: 15,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: appTheme.colors.danger,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    flex: 1,
  },
  backdropStyle: { backgroundColor: 'transparent' },
})

export const AlertHeader = styled.View<{ bg: string }>`
  padding: ${isTablet() ? 30 : 25}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bg};
`

export const AlertBody = styled.ScrollView`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.colors.light};
  padding: 20px;
`

export const AlertText = styled.Text<{ color?: string }>`
  text-align: center;
  font-size: ${isTablet() ? 20 : 18}px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.black};
`

export const AlertTitle = styled(AlertText)`
  font-size: ${isTablet() ? 26 : 23}px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.light};
`

export const ErrorText = styled(AlertTitle)`
  text-align: center;
  font-size: ${26}px;
  color: ${(props) => props.theme.colors.light};
`

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin: 10px 0;
`

export const AlertButton = styled.TouchableOpacity`
  padding: 5px 20px;
  border: 1px solid #000;
  border-radius: 5px;
  margin-horizontal: 30px;
`

export const AlertActionWrapper = styled.View`
  margin-bottom: 5px;
`
