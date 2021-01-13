import React from 'react'
import { CheckBox } from 'react-native-elements'
import { useFormik } from 'formik'
import { ScrollView } from 'react-native'

import { settingsSchema } from './schema'
import { FormWrapper, Section, styles } from './styles'
import { appTheme } from '../../../styles'
import { Input } from '../../shared'

export enum CheckState {
  CHECK_IN = 'Check in',
  CHECK_OUT = 'Check out',
}

export default function SettingsScreen() {
  const form = useFormik({
    initialValues: {
      deviceName: '',
      event: '',
      url: '',
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
          <Input
            label="Device Name"
            placeholder="Device"
            value={form.values.deviceName}
            onChangeText={form.handleChange('deviceName')}
            errorMessage={form.errors.deviceName}
          />
        </Section>
        <Section>
          <Input.Select
            label="Event"
            value="Plenary Session"
            items={[
              {
                label: 'Plenary Session',
                value: 'Plenary Session',
              },
              {
                label: 'UK',
                value: 'uk',
              },
              {
                label: 'France',
                value: 'france',
              },
            ]}
            onChangeItem={(item) => console.log(item)}
          />
        </Section>
        <Section>
          <Input
            label="URL"
            placeholder="https://example.com"
            value={form.values.event}
            onChangeText={form.handleChange('url')}
            errorMessage={form.errors.url}
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
          <Input.Button label="Save" onPress={form.handleSubmit} />
        </Section>
      </ScrollView>
    </FormWrapper>
  )
}
