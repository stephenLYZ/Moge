

export default class Keyboard {
  constructor() {
    this.keyDown = false
    this.keyUp = true
  }

  on(name, handler) {
    if (name === 'keydown') {
      document.body.addEventListener(
        "keydown", handler.bind(this), false
      )
    } else if (name === 'keyup') {
      document.body.addEventListener(
        "keyup", handler.bind(this), false
      )
    }
  }
}

Keyboard.KeyMap = {
  leftArrow: 37,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  space: 32
}
