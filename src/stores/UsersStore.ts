import { makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { queries, URL } from '../config'

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

  async loadUsers(project: string) {
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queries.users, variables: { project } }),
      })

      if (!res.ok) {
        throw new Error('Server Error')
      }

      const json = await res.json()
      const users = json.data.scanningAppUsers

      runInAction(() => {
        this.users = users
      })

      AsyncStorage.setItem('@users', JSON.stringify(users))
    } catch (error) {
      __DEV__ && console.warn(error.message)
    }
  }
}