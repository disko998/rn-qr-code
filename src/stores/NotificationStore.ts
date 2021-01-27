import { makeAutoObservable } from 'mobx'
import Sound from 'react-native-sound'

import { User } from './UsersStore'
import { AlertType } from '../components/shared/Alert/Alert'

export class NotificationStore {
  title: string = ''
  message: string = ''
  fullName?: string = ''
  isVisible: boolean = false
  type: AlertType = 'success'
  description?: string = ''
  onYesPress?: () => void = undefined
  onNoPress?: () => void = undefined
  showActions: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  show(type: Notification, user?: User) {
    switch (type) {
      case Notification.CHECK_IN:
        this.isVisible = true
        this.type = 'success'
        this.title = `Welcome ${
          user?.name.split(' ').length ? user?.name.split(' ')[0] : user?.name
        }`
        this.message = `${user?.companyName} - ${user?.profileName}`
        this.fullName = user?.name
        this.showActions = false
        this.playSound('success')
        break
      case Notification.CHECK_OUT:
        this.isVisible = true
        this.type = 'info'
        this.title = `Goodbye ${
          user?.name.split(' ').length ? user?.name.split(' ')[0] : user?.name
        }`
        this.message = `${user?.companyName} - ${user?.profileName}`
        this.fullName = user?.name
        this.showActions = false
        this.playSound('success')
        break
      case Notification.CODE_NOT_RECOGNIZED:
        this.isVisible = true
        this.type = 'error'
        this.title = 'Code not recognized'
        this.showActions = false
        this.playSound('error')
        break
      case Notification.NOT_REGISTER:
        this.isVisible = true
        this.type = 'warn'
        this.title = "Attendee didn't register"
        this.message = `${user?.companyName} - ${user?.profileName}`
        this.fullName = user?.name
        this.showActions = true
        this.playSound('error')
        break
      case Notification.REGISTER_FOR_DIFFERENT_DATE:
        this.isVisible = true
        this.type = 'warn'
        this.title = 'Attendee registered for a different date'
        this.message = `${user?.companyName} - ${user?.profileName}`
        this.fullName = user?.name
        this.showActions = true
        this.playSound('error')
        break
      case Notification.REGISTER_FOR_DIFFERENT_DATE_EXHIBITOR:
        this.isVisible = true
        this.type = 'warn'
        this.title = 'Attendee registered for a different date'
        this.message = `${user?.companyName} - ${user?.profileName}`
        this.fullName = user?.name
        this.description =
          'Please update your registration at the reception desk.'
        this.playSound('error')
        break
      default:
        this.type = 'error'
        this.title = 'Code not recognized'
        this.showActions = false
        this.playSound('error')
        break
    }
  }

  dismiss() {
    this.isVisible = false
  }

  playSound(type: 'success' | 'error') {
    Sound.setCategory('Playback')

    const beep = new Sound(`${type}.mp3`, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        __DEV__ && console.log('failed to load the sound', error)
        return
      }

      // Play the sound with an onEnd callback
      beep.play((success) => {
        if (success) {
          __DEV__ && console.log('successfully finished playing')
        } else {
          __DEV__ && console.log('playback failed due to audio decoding errors')
        }
      })
    })
  }
}

export enum Notification {
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
  NOT_REGISTER = 'NOT_REGISTER',
  REGISTER_FOR_DIFFERENT_DATE = 'REGISTER_FOR_DIFFERENT_DATE',
  REGISTER_FOR_DIFFERENT_DATE_EXHIBITOR = 'REGISTER_FOR_DIFFERENT_DATE_EXHIBITOR',
  CODE_NOT_RECOGNIZED = 'CODE_NOT_RECOGNIZED',
}
