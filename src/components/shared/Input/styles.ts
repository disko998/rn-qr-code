import styled from 'styled-components/native'
import { isTablet } from 'react-native-device-info'
import { StyleSheet } from 'react-native'

import { appTheme } from '../../../styles/theme'
import { WINDOW } from '../../../styles'

const MAX_INPUT_WIDTH = isTablet() ? '500px' : '100%'

export const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    maxWidth: isTablet() ? 500 : '100%',
    height: 50,
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  dropdownLabel: {
    fontSize: 18,
    color: appTheme.colors.dark,
  },
  picker: { height: 50, width: '100%' },
  pickerIcon: {
    backgroundColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: appTheme.colors.darkGray,
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
  },
  inputPicker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: appTheme.colors.black,
    borderWidth: 0,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 12,
    right: 10,
  },
  pickerContainer: {
    width: isTablet() ? 500 : WINDOW.width - 30,
    overflow: 'hidden',
  },
})

export const Container = styled.View`
  flex-direction: ${isTablet() ? 'row' : 'column'};
  align-items: ${isTablet() ? 'center' : 'flex-start'};
  width: 100%;
`

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 5px;
  height: 50px;
  width: 100%;
  max-width: ${MAX_INPUT_WIDTH};
`

export const StyledInput = styled.TextInput`
  height: 100%;
  width: 100%;
  font-size: 18px;
  padding: 5px 10px;
`
export const HelperText = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.colors.danger};
  position: absolute;
  bottom: -25px;
  left: 10px;
`

export const Label = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.colors.dark};
  width: 150px;
  margin: 5px;
`

export const Button = styled.TouchableOpacity`
  width: 100%;
  max-width: 300px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  text-align: center;
`

export const BtnLabel = styled(Label)`
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.colors.light};
  width: auto;
  text-transform: uppercase;
`
