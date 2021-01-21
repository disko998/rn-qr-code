import { makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { queries, query } from '../config'
import { settings } from './AppStore'

export class UsersStore {
  users: any[] = []

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

  async scanUser(registrationId: string) {
    try {
      const input = {
        project: settings.event?.id,
        userId: '9a2b7294-832e-4793-ba64-50be43093d2b',
        date: new Date(),
        inOut: settings.checkState,
        device: settings.deviceName,
        reference: null,
      }
      console.log('registrationId', input)

      //   const res = await query(queries.scanUser, { input })

      //   console.log(res)

      //   runInAction(() => {
      //     this.users = users
      //   })

      //   AsyncStorage.setItem('@users', JSON.stringify(users))
    } catch (error) {
      __DEV__ && console.warn(error.message)
    }
  }
}
