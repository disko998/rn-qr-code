import styled from 'styled-components/native'
import { isTablet } from 'react-native-device-info'
import { Input, Button } from 'react-native-elements'
import { StyleSheet } from 'react-native'

import { appTheme } from '../../../styles/theme'

export const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    color: appTheme.colors.dark,
    width: 150,
  },
  containerStyle: { flexDirection: 'row', alignItems: 'center' },
  inputContainerStyle: {
    borderBottomWidth: 0,
    width: '60%',
  },
  checkBoxContainer: { backgroundColor: appTheme.colors.light, borderWidth: 0 },
  btnTitle: {
    textTransform: 'uppercase',
    fontSize: 18,
  },
})

export const FormWrapper = styled.View`
  flex: 1;
  padding: 20px;
  background: ${(props) => props.theme.colors.light};
`

export const Section = styled.View<{ center?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.center ? 'center' : 'flex-start')}
  margin: 20px 0;
`

export const StyledInput = styled(Input)`
  height: 50px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 5px;
  padding: 5px 10px;
  elevation: 1;
`

export const Label = styled.Text`
  font-weight: bold;
  font-size: 15;
  color: ${(props) => props.theme.colors.dark};
`

export const SubmitButton = styled(Button)`
  width: 300px;
  height: 50px;
`
