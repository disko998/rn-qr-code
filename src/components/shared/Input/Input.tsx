import React from 'react'
import { Platform, TextInputProps, TouchableOpacityProps } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Picker } from '@react-native-picker/picker'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { appTheme } from '../../../styles'
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

export const Select = ({ label, items, value, onValueChange }: SelectProps) => {
  const [parentWidth, setParentWidth] = React.useState(0)

  const onPageLayout = (event: any) => {
    const { width, height } = event.nativeEvent.layout
    setParentWidth(width)
  }

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputWrapper onLayout={onPageLayout}>
        {Platform.OS === 'android' ? (
          <Picker
            onLayout={onPageLayout}
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
            placeholder={{}}
            onValueChange={onValueChange}
            items={items}
            value={value}
            style={{
              inputIOS: styles.inputPicker,
              inputIOSContainer: { width: parentWidth },
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
