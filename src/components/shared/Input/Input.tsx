import React from 'react'
import { TextInputProps, TouchableOpacityProps } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

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

Input.Select = ({ label, items, value, onChangeItem }: SelectProps) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <DropDownPicker
        items={items}
        containerStyle={styles.containerStyle}
        itemStyle={styles.itemStyle}
        defaultValue={value}
        onChangeItem={onChangeItem}
        labelStyle={styles.dropdownLabel}
      />
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
  onChangeItem: (item: DropDownItem) => void
}

export type DropDownItem = {
  label: any
  value: any
  icon?: (() => JSX.Element) | undefined
  hidden?: boolean | undefined
  disabled?: boolean | undefined
  selected?: boolean | undefined
}
