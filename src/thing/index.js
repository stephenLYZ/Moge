let id = 0

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

    this.checkEdge()
  }

  checkEdge () {
    // 检测碰撞
    const { position: { x, y}, shape: { width, height } } = this
    if (y + height > this._scene.height) {
      this.position.y = this._scene.height - height
    }
    if (x + width > this._scene.width) {
      this.position.x = this._scene.width - width
    } else if (x < 0) {
      this.position.x = 0
    }
    if (!this.reachEdge) {
      if (this.position.y + height === this._scene.height) {
        this._scene.emit('edge', { which: 'bottom', target: this })
        this.reachEdge = true
      }
    }
  }

  update (time) {
    this.move(time)
  }

  get moveable () {
    return !!this.mover
  }
}