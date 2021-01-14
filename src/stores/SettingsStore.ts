import { observable, action } from 'mobx'

export class SettingsStore {
  @observable cameraType: 'front' | 'back' = 'front'
  @observable checkState: CheckState = CheckState.CHECK_IN
  @observable deviceName: string = ''
  @observable event: string = 'Plenary Session'
  @observable url: string = 'https://letsconnect.store/'

  @action
  updateSettings({ cameraType, checkState, deviceName, event, url }: Settings) {
    this.cameraType = cameraType
    this.checkState = checkState
    this.deviceName = deviceName
    this.event = event
    this.url = url
  }
}

export enum CheckState {
  CHECK_IN = 'Check in',
  CHECK_OUT = 'Check out',
}

export type Settings = {
  cameraType: 'front' | 'back'
  checkState: CheckState
  deviceName: string
  event: string
  url: string
}
