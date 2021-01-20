import { action, makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { queries, URL } from '../config'

export class SettingsStore {
  cameraType: 'front' | 'back' = 'front'
  checkState: CheckState = CheckState.CHECK_IN
  deviceName: string = ''
  event: Event | undefined = undefined
  url: string = 'https://letsconnect.store/'

  events: Event[] = []
  initSettings: boolean = false

  constructor() {
    makeAutoObservable(this)

    AsyncStorage.getItem('@settings').then((data) => {
      runInAction(() => {
        this.updateSettings(data ? JSON.parse(data) : null)
      })
    })

    AsyncStorage.getItem('@events').then((data) => {
      if (data) {
        runInAction(() => {
          this.events = JSON.parse(data)
        })
      }
    })
  }

  @action
  async updateSettings(settings: Settings | null): Promise<void> {
    if (settings) {
      const { cameraType, checkState, deviceName, event, url } = settings

      this.cameraType = cameraType
      this.checkState = checkState
      this.deviceName = deviceName
      this.event = event
      this.url = url
      this.initSettings = false

      AsyncStorage.setItem('@settings', JSON.stringify(settings))
    } else {
      this.initSettings = true
    }
  }

  async loadEvents() {
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queries.events }),
      })

      if (!res.ok) {
        throw new Error('Server Error')
      }

      const json = await res.json()

      runInAction(() => {
        this.events = json.data.scanningAppEvents
      })

      AsyncStorage.setItem(
        '@events',
        JSON.stringify(json.data.scanningAppEvents),
      )
    } catch (error) {
      __DEV__ && console.warn(error.message)
      // fallback to cached data
    }
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
  event: Event | undefined
  url: string
}

export type Event = {
  id: string
  name: {
    en: string
    fr: string
    nl: string
    pl: string
    it: string
  }
  imageTopMobile: string
  imageBottomMobile: string
  imageTopTablet: string
  imageBottomTablet: string
}
