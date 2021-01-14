import { observable, action, makeAutoObservable } from 'mobx'

export class SettingsStore {
  cameraType: 'front' | 'back' = 'front'
  checkState: CheckState = CheckState.CHECK_IN
  deviceName: string = ''
  event: string = 'Plenary Session'
  url: string = 'https://letsconnect.store/'

  constructor() {
    makeAutoObservable(this)
  }

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
