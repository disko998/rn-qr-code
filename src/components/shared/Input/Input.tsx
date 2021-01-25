import React from 'react'
import { TextInputProps, TouchableOpacityProps } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {
  StyledInput,
  Container,
  Label,
  Button,
  BtnLabel,
  InputWrapper,
  HelperText,
  styles,
} from './styles'
import { appTheme } from '../../../styles'

export default function Input({
  label,
  errorMessage,
  ...inputProps
}: InputProps) {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <StyledInput {...inputProps} />
        <HelperText>{errorMessage}</HelperText>
      </InputWrapper>
    </Container>
  )
}

Input.Button = ({ label, ...btnProps }: ButtonProps) => {
  return (
    <Button {...btnProps}>
      <BtnLabel>{label}</BtnLabel>
    </Button>
  )
}

Input.Select = ({ label, items, value, onValueChange }: SelectProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <RNPickerSelect
          placeholder={{ label: 'Select event' }}
          onValueChange={onValueChange}
          items={items}
          value={value}
          style={{
            inputIOS: styles.inputPicker,
            inputAndroid: styles.inputPicker,
            inputAndroidContainer: styles.pickerContainer,
            inputIOSContainer: styles.pickerContainer,
            iconContainer: styles.iconContainer,
          }}
          Icon={() => (
            <AntDesign
              size={20}
              name="caretdown"
              color={appTheme.colors.darkGray}
            />
          )}
        />
      </InputWrapper>
    </Container>
  )
}

type InputProps = TextInputProps & {
  label?: string
  errorMessage?: string
}

type ButtonProps = TouchableOpacityProps & {
  label: string
}

type SelectProps = {
  label?: string
  items: DropDownItem[]
  value: string
  onValueChange: (value: string) => void
}

export type DropDownItem = {
  label: any
  value: any
  icon?: (() => JSX.Element) | undefined
  hidden?: boolean | undefined
  disabled?: boolean | undefined
  selected?: boolean | undefined
}
