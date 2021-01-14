import { action, makeAutoObservable } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class SettingsStore {
  cameraType: 'front' | 'back' = 'front'
  checkState: CheckState = CheckState.CHECK_IN
  deviceName: string = ''
  event: string = 'Plenary Session'
  url: string = 'https://letsconnect.store/'

  constructor() {
    makeAutoObservable(this)

    AsyncStorage.getItem('@settings').then((data) => {
      data && this.updateSettings(JSON.parse(data))
    })
  }

  @action
  async updateSettings(settings: Settings): Promise<boolean> {
    const { cameraType, checkState, deviceName, event, url } = settings

    this.cameraType = cameraType
    this.checkState = checkState
    this.deviceName = deviceName
    this.event = event
    this.url = url

    await AsyncStorage.setItem('@settings', JSON.stringify(settings))

    return true
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
