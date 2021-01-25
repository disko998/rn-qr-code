import { makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import _ from 'lodash'

import { queries, query } from '../config'
import { notification, settings } from './AppStore'
import { CheckState } from './SettingsStore'

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
      notification.playSound('error')
      return notification.show('error', 'Code not recognized')
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
          input.inOut === CheckState.CHECK_IN ? 'success' : 'info',
          `${input.inOut === CheckState.CHECK_IN ? 'Welcome' : 'Goodbye'} ${
            user.name.split(' ')[0]
          }`,
          `${user.companyName} - ${user.profileName}`,
          user.name,
        )
        notification.playSound('success')

        console.log('Success', res)
      } catch (error) {
        return notification.show('error', 'Code not recognized')
      }
    } else {
      this.pendingInputs.push(input)
      await AsyncStorage.setItem('@pending', JSON.stringify(this.pendingInputs))

      notification.show(
        input.inOut === CheckState.CHECK_IN ? 'success' : 'info',
        `${input.inOut === CheckState.CHECK_IN ? 'Welcome' : 'Goodbye'} ${
          user.name
        }`,
        `${user.companyName} - ﻿Brasserie de l'abbaye du Val-dieu`,
        user.profileName,
      )
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

type User = {
  id: string
  language: string
  name: string
  profileName: string
  companyName: string
  badge: Badge
}

type Badge = {
  project: string
  registrationId: string
  days: string[]
  sideEvents: null | SideEvent[]
}

type SideEvent = {
  reference: string
  date: string
}

type Input = {
  project: string | undefined
  userId: string
  date: Date
  inOut: CheckState
  device: string
  reference: null
}
