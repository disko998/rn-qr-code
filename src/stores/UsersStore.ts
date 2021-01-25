import { makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import _ from 'lodash'

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
        const res = await query(queries.users, { project })

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

  async validateScan(registrationId: string, isConnected: boolean) {
    const user = _.find(
      this.users,
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
      reference: null,
    }
    __DEV__ && console.log(registrationId, input)

    if (isConnected) {
      try {
        const res = await this.consumeInput(input)

        notification.show(
          input.inOut === CheckState.CHECK_IN
            ? Notification.CHECK_IN
            : Notification.CHECK_OUT,
          user,
        )

        console.log('Success', res)
      } catch (error) {
        return notification.show(Notification.CODE_NOT_RECOGNIZED)
      }
    } else {
      this.pendingInputs.push(input)
      await AsyncStorage.setItem('@pending', JSON.stringify(this.pendingInputs))

      notification.show(Notification.CHECK_IN, user)
    }
  }

  consumePending() {
    this.pendingInputs.map((input) => {
      this.consumeInput(input, true)
    })
  }

  async consumeInput(input: Input, isPending?: boolean) {
    const res = await query(queries.scanUser, { input })

    if (isPending) {
      const filtered = this.pendingInputs.filter(
        (i) => i.userId !== input.userId,
      )
      await AsyncStorage.setItem('@pending', JSON.stringify(filtered))
    }

    return res
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
  reference: null
}
