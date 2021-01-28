import React from 'react'
import { CheckBox } from 'react-native-elements'
import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import Toast from 'react-native-simple-toast'
import { useNavigation } from '@react-navigation/native'

import { settingsSchema } from './schema'
import { appTheme } from '../../../styles'
import { Input } from '../../shared'
import { FormWrapper, Section, styles, StyledScroll } from './styles'
import { useAppStore, CheckState } from '../../../stores'
import { DropDownItem } from '../../shared/Input/Input'

const SettingsScreen = observer(() => {
  const navigation = useNavigation()
  const { settings } = useAppStore()

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings',
    })
  }, [navigation])

  const eventItems = React.useMemo(() => {
    const sideEvents: DropDownItem[] = []

    const mainEvents = settings.events.map((event) => {
      event.sideEvents.map((sideEvent) =>
        sideEvents.push({
          value: JSON.stringify({
            ...event,
            sideEventReference: sideEvent.reference,
          }),
          label: sideEvent.name.fr,
        }),
      )

      return {
        value: JSON.stringify(event),
        label: event.name['en'],
      }
    })

    const events = [...mainEvents, ...sideEvents]

    return events
  }, [settings.events])

  const form = useFormik({
    initialValues: {
      deviceName: settings.deviceName,
      event: settings.event
        ? JSON.stringify(settings.event)
        : settings.events.length
        ? JSON.stringify(settings.events[0])
        : '',
      url: settings.url,
      checkState: settings.checkState,
      cameraType: settings.cameraType,
    },
    validationSchema: settingsSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      settings.updateSettings({
        ...values,
        event: JSON.parse(values.event),
      })

      Toast.show('Changes Saved!', Toast.LONG, ['UIAlertController'])
    },
  })

  return (
    <FormWrapper>
      <StyledScroll showsVerticalScrollIndicator={false}>
        <Section>
          <Input
            label="Device Name *"
            placeholder="Device"
            value={form.values.deviceName}
            onChangeText={form.handleChange('deviceName')}
            errorMessage={form.errors.deviceName}
          />
        </Section>
        <Section>
          <Input.Select
            label="Event"
            value={form.values.event}
            items={eventItems}
            onValueChange={(value) => form.setFieldValue('event', value)}
          />
        </Section>
        <Section>
          <Input
            label="URL *"
            placeholder="https://example.com"
            value={form.values.url}
            onChangeText={form.handleChange('url')}
            onBlur={() => settings.loadEvents(form.values.url)}
            errorMessage={form.errors.url}
          />
        </Section>
        <Section>
          <CheckBox
            title={`Check ${CheckState.CHECK_IN}`}
            checked={form.values.checkState === CheckState.CHECK_IN}
            onPress={() =>
              form.setFieldValue('checkState', CheckState.CHECK_IN)
            }
            containerStyle={styles.checkBoxContainer}
            textStyle={styles.label}
            checkedColor={appTheme.colors.success}
          />
          <CheckBox
            title={`Check ${CheckState.CHECK_OUT}`}
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
