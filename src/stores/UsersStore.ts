import { makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { queries, query } from '../config'
import { notification, settings } from './AppStore'
import { CheckState } from './SettingsStore'
import { Notification } from './NotificationStore'

export class UsersStore {
  users: User[] = []
  pendingInputs: Input[] = []

  constructor() {
    makeAutoObservable(this)

    AsyncStorage.getItem('@users').then((data) => {
      if (data) {
        runInAction(() => {
          this.users = JSON.parse(data)
        })
      }
    })

    AsyncStorage.getItem('@pending').then((data) => {
      if (data) {
        runInAction(() => {
          this.pendingInputs = JSON.parse(data)
        })
      }
    })
  }

  async loadUsers() {
    try {
      __DEV__ && console.log('fetching...', settings.event?.id)
      const project = settings.event?.id

      if (project) {
        const res = await query(settings.url, queries.users, { project })

        const users = res.data.scanningAppUsers

        runInAction(() => {
          this.users = users
        })

        AsyncStorage.setItem('@users', JSON.stringify(users))
      }
    } catch (error) {
      __DEV__ && console.warn(error.message)
    }
  }

  async scanUserTicket(registrationId: string, isConnected: boolean) {
    const user = this.users.find(
      (o) => o.badge.registrationId === registrationId,
    )

    if (!user) {
      return notification.show(Notification.CODE_NOT_RECOGNIZED)
    }

    const input: Input = {
      project: settings.event?.id,
      userId: user.id,
      date: new Date(),
      inOut: settings.checkState,
      device: settings.deviceName,
      reference: settings.event?.sideEventReference
        ? settings.event?.sideEventReference
        : null,
    }

    __DEV__ && console.log(registrationId, input)

    if (!isConnected) {
      this.pendingInputs.push(input)
      await AsyncStorage.setItem('@pending', JSON.stringify(this.pendingInputs))

      return notification.show(
        input.inOut === CheckState.CHECK_IN
          ? Notification.CHECK_IN
          : Notification.CHECK_OUT,
        user,
      )
    }

    // validate ticket on backend
    const notify = await this.consumeTicket(input)

    notification.show(notify, user)
  }

  async consumePending() {
    await Promise.all(
      this.pendingInputs.map(async (input) => {
        const notify = await this.consumeTicket(input)

        this.pendingInputs = this.pendingInputs.filter(
          (i) => i.userId !== input.userId,
        )
        await AsyncStorage.setItem(
          '@pending',
          JSON.stringify(this.pendingInputs),
        )
      }),
    )
  }

  async consumeTicket(input: Input): Promise<Notification> {
    try {
      const {
        data: { register, isExhibitor },
      } = await query(settings.url, queries.validateInput, { input })

      if (!register) {
        return input.reference
          ? Notification.NOT_REGISTER
          : isExhibitor
          ? Notification.REGISTER_FOR_DIFFERENT_DATE_EXHIBITOR
          : Notification.REGISTER_FOR_DIFFERENT_DATE
      }

      const { data } = await query(settings.url, queries.scanUser, { input })

      return input.inOut === CheckState.CHECK_IN
        ? Notification.CHECK_IN
        : Notification.CHECK_OUT
    } catch (error) {
      return Notification.CODE_NOT_RECOGNIZED
    }
  }
}

export type User = {
  id: string
  language: string
  name: string
  profileName: string
  companyName: string
  badge: Badge
}

export type Badge = {
  project: string
  registrationId: string
  days: string[]
  sideEvents: null | SideEvent[]
}

export type SideEvent = {
  reference: string
  date: string
}

export type Input = {
  project: string | undefined
  userId: string
  date: Date
  inOut: CheckState
  device: string
  reference: null | string
}
