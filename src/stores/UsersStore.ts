import { action, makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import _ from 'lodash'

import { queries, query } from '../config'
import { settings } from './AppStore'
import { CheckState } from './SettingsStore'
import { AlertType, AlertProps } from '../components/shared/Alert/Alert'

const defaultAlertState: AlertProps = {
  title: '',
  message: '',
  isVisible: false,
  type: 'success',
}

export class UsersStore {
  users: User[] = []
  alertState: AlertProps = defaultAlertState

  constructor() {
    makeAutoObservable(this)

    AsyncStorage.getItem('@users').then((data) => {
      if (data) {
        runInAction(() => {
          this.users = JSON.parse(data)
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

  async validateScan(registrationId: string) {
    try {
      const user = _.find(
        this.users,
        (o) => o.badge.registrationId === registrationId,
      )

      if (!user) {
        return this.showAlert('error', 'Code not recognized')
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

      this.showAlert(
        'success',
        `Welcome ${user.name}`,
        "Market Franchising - ﻿Brasserie de l'abbaye du Val-dieu",
      )

      //   const res = await query(queries.scanUser, { input })

      //   console.log(res)

      //   runInAction(() => {
      //     this.users = users
      //   })

      //   AsyncStorage.setItem('@users', JSON.stringify(users))
    } catch (error) {
      __DEV__ && console.error(error.message)
    }
  }

  @action
  showAlert(type: AlertType, title: string, message?: string) {
    this.alertState = {
      isVisible: true,
      type,
      title,
      message,
    }
  }

  @action
  dismissAlert() {
    this.alertState = defaultAlertState
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
