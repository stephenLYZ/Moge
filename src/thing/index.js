import _ from 'lodash'

let id = 1

export default class Thing {

  constructor (options) {
    this.id = id++
    this.position = options.position
    this.shape = options.shape
    this.mover = options.move
    this.prevPosition = this.position
    this.prevShape = this.shape
    this.collied = false
  }

  set orientation (value) {
    this.mover.orientation = value
  }

  set speed (value) {
    this.mover.speed = value
  }

  move (time) {
    if (!this.mover) return

    this.prevPosition = _.clone(this.position)

    this.position = this.mover.exec(time, this.position)
  }

  get moveable () {
    return !!this.mover
  }

  update (time) {
    this.move(time)
    this.checkEdge()
    this.checkCollide()
  }

  checkCollide () {
    this.collied = false

    let { collideThing, direction } = this._scene.collideX(this)
    if (collideThing) {
      switch(direction) {
        case 'right':
        case 'left':
          this.position.x = this.prevPosition.x
          this.shape = _.cloneDeep(this.prevShape)
          this.collied = true
          break
      }     
    }

    let collideY = this._scene.collideY(this)
    if (collideY.collideThing) {
      direction = collideY.direction
      switch(collideY.direction) {
        case 'down':
          this.position.y = this.prevPosition.y
          this.shape = _.cloneDeep(this.prevShape)
          this.collied = true
          break
      }     
    }

    if (this.collied) {
      this._scene.emit('collide', { which: direction, target: this })
    }
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
        this._scene.emit('collide', { which: 'down', target: this })
        this.reachEdge = true
      }
    }
  }
}