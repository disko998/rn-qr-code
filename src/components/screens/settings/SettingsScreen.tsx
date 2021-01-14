import React from 'react'
import { CheckBox } from 'react-native-elements'
import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'

import { settingsSchema } from './schema'
import { appTheme } from '../../../styles'
import { Input } from '../../shared'
import { FormWrapper, Section, styles, StyledScroll } from './styles'
import { useAppStore, CheckState } from '../../../stores'

const SettingsScreen = observer(() => {
  const { settingsStore } = useAppStore()

  console.log('Settings Screen', settingsStore)

  const form = useFormik({
    initialValues: {
      deviceName: settingsStore.deviceName,
      event: settingsStore.event,
      url: settingsStore.url,
      checkState: settingsStore.checkState,
      cameraType: settingsStore.cameraType,
    },
    validationSchema: settingsSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log('SUBMIT', values)
      settingsStore.updateSettings(values)
    },
  })

  return (
    <FormWrapper>
      <StyledScroll showsVerticalScrollIndicator={false}>
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
            value={form.values.url}
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
            title="Front Camera"
            checked={form.values.cameraType === 'front'}
            onPress={() => form.setFieldValue('cameraType', 'front')}
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.label}
            checkedColor={appTheme.colors.success}
          />
          <CheckBox
            title="Back Camera"
            checked={form.values.cameraType === 'back'}
            onPress={() => form.setFieldValue('cameraType', 'back')}
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.label}
            checkedColor={appTheme.colors.success}
          />
        </Section>
        <Section center>
          <Input.Button label="Save" onPress={form.handleSubmit} />
        </Section>
      </StyledScroll>
    </FormWrapper>
  )
})

export default SettingsScreen
