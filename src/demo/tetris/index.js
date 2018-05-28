import Scene from '../../scene/dom'
import { Rectangle } from '../../shape'
import Thing from '../../thing'
import Move from '../../move'
import { Seven, Tian, Stick, Zaid, Dust } from './shapes'

const colors = ['green', 'blue', 'red', 'pink', 'yellow', 'orange']
const shapes = [Seven, Tian, Stick, Zaid, Dust]

class Tetris extends Thing {
  constructor (options) {
    super(options)
  }

  update (time) {
    super.update(time)
    this.checkEdge()

    let collied = false

    let { collideThing, direction } = this._scene.collideX(this)
    if (collideThing) {
      switch(direction) {
        case 'right':
        case 'left':
          this.position.x = this.prevPosition.x
          collied = true
          break
      }     
    }

    let collideY = this._scene.collideY(this)
    if (collideY.collideThing) {
      direction = collideY.direction
      switch(collideY.direction) {
        case 'down':
          this.position.y = this.prevPosition.y
          collied = true
          break
      }     
    }

    if (collied) {
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

function randomInt (num) {
  return Math.floor(Math.random() * num)
}

function randomTetris () {
  const shape = new shapes[randomInt(shapes.length)]({ color: colors[randomInt(colors.length)] })
  const position = { x: Math.random() * (400 - shape.width), y: 0 }
  const move = new Move({ orientation: 270, speed: 200 })
  const tetris = new Tetris({ position, shape, move })
  return tetris
}

window.onload = () => {
  const scene = new Scene({ width: 400, height: 500 })

  let currentTetris = randomTetris()
  scene.add(currentTetris)

  document.body.appendChild(scene.domNode)

  scene.startLoop()

  const finished = {}
  scene.on('collide', ({ which, target }) => {
    if (finished[target.id] || which !== 'down') {
      return
    }
    
    target.orientation = 270
    finished[target.id] = true
    currentTetris = randomTetris()
    scene.add(currentTetris)
  })

  window.addEventListener('keydown', (evt) => {
    switch (evt.which) {
      case 37:
        currentTetris.orientation = 210
        break
      case 39:
        currentTetris.orientation = 330
        break
      case 40:
        currentTetris.speed = 10000000000
        break
    }
  })

  window.addEventListener('keyup', (evt) => {
    switch (evt.which) {
      case 37:
      case 39:
        currentTetris.orientation = 270
        break;
    }
  })

  const fps = document.createElement('span')
  setInterval(() => {
    fps.innerText = 'fps: ' + scene.fps
  }, 1000)
  document.body.appendChild(fps)
}
