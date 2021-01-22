import { makeAutoObservable } from 'mobx'

import { AlertType } from '../components/shared/Alert/Alert'

export class NotificationStore {
  title: string = ''
  message: string = ''
  fullName: string = ''
  isVisible: boolean = false
  type: AlertType = 'success'

  constructor() {
    makeAutoObservable(this)
  }

  show(type: AlertType, title: string, message = '', fullName = '') {
    this.isVisible = true
    this.type = type
    this.title = title
    this.message = message
    this.fullName = fullName
  }

  dismiss() {
    this.isVisible = false
  }
}