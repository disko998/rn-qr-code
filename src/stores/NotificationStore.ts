import { makeAutoObservable } from 'mobx'
import Sound from 'react-native-sound'

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
