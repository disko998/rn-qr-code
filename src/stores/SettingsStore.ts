import { action, makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getEvents } from '../config'

export class SettingsStore {
  cameraType: 'front' | 'back' = 'front'
  checkState: CheckState = CheckState.CHECK_IN
  deviceName: string = ''
  event: string = 'Plenary Session'
  url: string = 'https://letsconnect.store/'

  events: Event[] = []

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

  async loadEvents() {
    const res = await getEvents()
    runInAction(() => {
      this.events = res.data.scanningAppEvents
    })
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

export type Event = {
  id: string
  name: string
  imageTopMobile: string
  imageBottomMobile: string
  imageTopTablet: string
  imageBottomTablet: string
}
