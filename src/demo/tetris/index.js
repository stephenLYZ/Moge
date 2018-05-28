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

  update () {
    super.update()
    
  }

  collide() {
    const { x, y } = this.position
    const { width, height } = this.shape
    if (y + height > this._scene.height) {
      this.position.y = this._scene.height - height
    }
    if (!this._scene.emitted[thing.id]) {
      const points = thing.shape.toPoints(this.pixelSize)
      points.forEach((row, rowIndex) => {
        row.forEach((color, colIndex) => {           
          const cell = this.status[Math.round(y / this.pixelSize) + rowIndex][Math.round(x / this.pixelSize) + colIndex]
            if (cell.style.background && cell.style.background != 'transparent') {
              console.log('booom!')
            }
        })
      })
      if (thing.position.y + height === this.height) {
        this.emit('edge', { which: 'bottom', target: thing })
        this.emitted[thing.id] = true
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
  scene.on('edge', ({ target }) => {
    if (finished[target.id]) {
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
