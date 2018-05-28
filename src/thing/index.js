let id = 0

export default class Thing {

  constructor (options) {
    this.id = id++
    this.position = options.position
    this.shape = options.shape
    this.move = options.move
    this.prevPosition = this.position
    this.prevShape = this.shape
  }

  set orientation (value) {
    this.move.orientation = value
  }

  set speed (value) {
    this.move.speed = value
  }

  move (time) {
    if (!this.move) return

    const position = this.move.exec(time, this.position)
    this.prevPosition = this.position
    this.position = position

    return position
  }

  update (time) {
    this.move(time)
  }

  get moveable () {
    return !!this.move
  }
}