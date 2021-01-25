import React from 'react'
import { Platform, TextInputProps, TouchableOpacityProps } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Picker } from '@react-native-picker/picker'
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
        {Platform.OS === 'android' ? (
          <Picker
            onValueChange={onValueChange}
            selectedValue={value}
            style={styles.picker}
            mode="dialog"
            prompt="Events">
            {items.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        ) : (
          <RNPickerSelect
            placeholder={{ label: 'Select event' }}
            onValueChange={onValueChange}
            items={items}
            value={value}
            style={{
              inputIOS: styles.inputPicker,
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
        )}
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
  onValueChange: (value: any) => void
}

export type DropDownItem = {
  label: any
  value: any
  icon?: (() => JSX.Element) | undefined
  hidden?: boolean | undefined
  disabled?: boolean | undefined
  selected?: boolean | undefined
}
