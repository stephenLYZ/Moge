let id = 0

export default class Thing {

  constructor (options) {
    this.id = id++
    this.position = options.position
    this.shape = options.shape
    this._move = options.move
  }

  set orientation (value) {
    this._move.orientation = value
  }

  move (time) {
    if (!this._move) return

    const position = this._move.exec(time, this.position)
    this.position = position
  }

  get moveable () {
    return !!this._move
  }
}