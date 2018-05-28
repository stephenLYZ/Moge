let id = 1

export default class Thing {

  constructor (options) {
    this.id = id++
    this.position = options.position
    this.shape = options.shape
    this.mover = options.move
    this.prevPosition = this.position
    this.prevShape = this.shape
  }

  set orientation (value) {
    this.mover.orientation = value
  }

  set speed (value) {
    this.mover.speed = value
  }

  move (time) {
    if (!this.mover) return

    const position = this.mover.exec(time, this.position)
    this.prevPosition = this.position
    this.position = position
  }

  update (time) {
    this.move(time)
  }

  get moveable () {
    return !!this.mover
  }
}