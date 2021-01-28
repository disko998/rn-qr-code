import { makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DEFAULT_URL, queries, query } from '../config'
import { users } from './AppStore'

export class SettingsStore {
  cameraType: 'front' | 'back' = 'front'
  checkState: CheckState = CheckState.CHECK_IN
  deviceName: string = ''
  event: Event | undefined = undefined
  url: string = DEFAULT_URL

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

      users.loadUsers()
    } else {
      this.initSettings = true
    }
  }

  async loadEvents(fromUrl?: string) {
    try {
      const res = await query(fromUrl || this.url, queries.events)

      runInAction(() => {
        this.events = res.data.scanningAppEvents
      })

      AsyncStorage.setItem(
        '@events',
        JSON.stringify(res.data.scanningAppEvents),
      )
    } catch (error) {
      __DEV__ && console.error(error)
    }
  }
}

export enum CheckState {
  CHECK_IN = 'IN',
  CHECK_OUT = 'OUT',
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
    en?: string
    fr?: string
    nl?: string
    pl?: string
    it?: string
  }
  imageTopMobile: string
  imageBottomMobile: string
  imageTopTablet: string
  imageBottomTablet: string
  sideEventReference?: string
  sideEvents: SideEvent[]
}

export type SideEvent = {
  reference: string
  name: {
    en?: string
    fr?: string
    nl?: string
    pl?: string
    it?: string
  }
}
