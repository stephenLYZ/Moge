import Scene from '../../scene/dom'
import { Rectangle } from '../../shape'
import Thing from '../../thing'
import Move from '../../move'
import { RotateShape, Seven, Tian, Stick, Zaid, Dust } from './shapes'

const colors = ['green', 'blue', 'red', 'pink', 'yellow', 'orange']
const shapes = [Seven, Tian, Stick, Zaid, Dust]

class Tetris extends Thing {
  constructor (options) {
    super(options)

    this.rotation = 0
  }

  rotate () {
    this.rotation += 1
  }

  update (time) {
    super.update(time)

    this.prevShape = this.shape

    if (this.rotation) {
      const rotation = this.rotation + this.shape.rotation
      this.shape = new RotateShape({ shape: this.shape.shape, rotation })
      this.rotation = 0
    }
  }

}

function randomInt (num) {
  return Math.floor(Math.random() * num)
}

function randomTetris () {
  const shape = new shapes[randomInt(shapes.length)]({ color: colors[randomInt(colors.length)] })
  const rotateShape = new RotateShape({ shape })
  const position = { x: Math.random() * (400 - shape.width), y: 0 }
  const move = new Move({ orientation: 270, speed: 200 })
  const tetris = new Tetris({ position, shape: rotateShape, move })
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
      case 38:
        currentTetris.rotate()
        break
    }
  })

  window.addEventListener('keyup', (evt) => {
    switch (evt.which) {
      case 37:
      case 39:
        currentTetris.orientation = 270
        break
    }
  })

  const fps = document.createElement('span')
  setInterval(() => {
    fps.innerText = 'fps: ' + scene.fps
  }, 1000)
  document.body.appendChild(fps)
}
