'use babel';

import {minutesToMilliseconds} from './time-helpers'

export default {
  intervalId: null,
  wasDay: null,

  activate() {
    let milliseconds = minutesToMilliseconds(this.getCheckIntervalInMinutes())
    this.intervalId = setInterval(this.changeTheme.bind(this), milliseconds)
    this.changeTheme()
  },

  deactivate() {
    clearInterval(this.intervalId)
    this.intervalId = null
  },

  // Changes between the Atom material and Atom material light syntax themes
  changeTheme() {
    let isDay = this.isDay()
    if (isDay === this.wasDay) return

    if (isDay) {
      this.scheduleThemeUpdate(['atom-material-ui',
        'atom-material-syntax-light'])
    } else {
      this.scheduleThemeUpdate(['atom-material-ui',
        'atom-material-syntax'])
    }

    this.wasDay = isDay
  },

  scheduleThemeUpdate(themes) {
    setTimeout(() => atom.config.set('core.themes', themes), 100)
  },

  // Returns whether it is day or night time depending on the time of the day
  // Day time: after 7am
  // Night time: after 9pm
  isDay() {
    let hours = new Date(Date.now()).getHours()
    return hours >= 7 && hours <= 21
  },

  // Sets interval for checking the day time
  getCheckIntervalInMinutes() {
    return 15
  }
};
