import styled from 'styled-components/native'
import { isTablet } from 'react-native-device-info'
import { StyleSheet } from 'react-native'

import { appTheme } from '../../../styles/theme'

export const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    color: appTheme.colors.dark,
    width: isTablet() ? 150 : 'auto',
  },
  checkBoxContainer: {
    backgroundColor: appTheme.colors.light,
    borderWidth: 0,
    padding: 0,
  },
})

export const FormWrapper = styled.SafeAreaView`
  flex: 1;
  padding: ${isTablet() ? 20 : 15}px;
  background: ${(props) => props.theme.colors.light};
`

export const Section = styled.View<{ center?: boolean }>`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.center ? 'center' : 'flex-start')};
  margin: 20px 0;
  width: 100%;
`
