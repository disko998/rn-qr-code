import React from 'react'
import { CheckBox } from 'react-native-elements'
import { useFormik } from 'formik'
import { ScrollView } from 'react-native'

import { settingsSchema } from './schema'
import {
  FormWrapper,
  StyledInput,
  Section,
  SubmitButton,
  styles,
} from './styles'
import { appTheme } from '../../../styles'

export enum CheckState {
  CHECK_IN = 'Check in',
  CHECK_OUT = 'Check out',
}

export default function SettingsScreen() {
  const form = useFormik({
    initialValues: {
      deviceName: '',
      event: '',
      checkState: CheckState.CHECK_IN,
      cameraType: 'back',
    },
    validationSchema: settingsSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <FormWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Section>
          <StyledInput
            label="Device Name"
            placeholder="Device"
            labelStyle={styles.label}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            value={form.values.deviceName}
            onChangeText={form.handleChange('deviceName')}
            errorMessage={form.errors.deviceName}
          />
        </Section>
        <Section>
          <StyledInput
            label="Event"
            placeholder="Event"
            labelStyle={styles.label}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            value={form.values.event}
            onChangeText={form.handleChange('event')}
            errorMessage={form.errors.deviceName}
          />
        </Section>
        <Section>
          <CheckBox
            title="Check IN"
            checked={form.values.checkState === CheckState.CHECK_IN}
            onPress={() =>
              form.setFieldValue('checkState', CheckState.CHECK_IN)
            }
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.label}
            checkedColor={appTheme.colors.success}
          />
          <CheckBox
            title="Check OUT"
            checked={form.values.checkState === CheckState.CHECK_OUT}
            onPress={() =>
              form.setFieldValue('checkState', CheckState.CHECK_OUT)
            }
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.label}
            checkedColor={appTheme.colors.success}
          />
        </Section>
        <Section>
          <CheckBox
            title="Back Camera"
            checked={form.values.cameraType === 'back'}
            onPress={() => form.setFieldValue('cameraType', 'back')}
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.label}
            checkedColor={appTheme.colors.success}
          />
          <CheckBox
            title="Front Camera"
            checked={form.values.cameraType === 'front'}
            onPress={() => form.setFieldValue('cameraType', 'front')}
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.label}
            checkedColor={appTheme.colors.success}
          />
        </Section>
        <Section center>
          <SubmitButton
            title="Save"
            onPress={form.handleSubmit}
            titleStyle={styles.btnTitle}
          />
        </Section>
      </ScrollView>
    </FormWrapper>
  )
}
