import * as Yup from 'yup'

export const settingsSchema = Yup.object().shape({
  deviceName: Yup.string().trim().required('Device Name is required field'),
  event: Yup.string().required('Event is required field'),
  url: Yup.string().trim().url().required('URL is required field'),
  checkState: Yup.string().required(),
  cameraType: Yup.string().required(),
})
