import * as Yup from 'yup'

export const settingsSchema = Yup.object().shape({
  deviceName: Yup.string().required(),
  event: Yup.string().required(),
  checkState: Yup.string().required(),
  cameraType: Yup.string().required(),
})
