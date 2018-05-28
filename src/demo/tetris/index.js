import Scene from '../../scene/dom'
import { Rectangle } from '../../shape'
import Thing from '../../thing'
import Move from '../../move'
import { RotateShape, Seven, Tian, Stick, Zaid, Dust } from './shapes'
import * as R from 'ramda'
import _ from 'lodash'

const colors = ['green', 'blue', 'red', 'pink', 'yellow', 'orange']
const shapes = [Seven, Tian, Stick, Zaid, Dust]
// const shapes = [Dust]

class Tetris extends Thing {
  constructor (options) {
    super(options)

    this.rotation = 0
    this.disappeared = []
  }

  rotate () {
    this.rotation += 1
  }

  update (time) {
    this.prevShape = this.shape

    if (this.rotation) {
      const rotation = this.rotation + this.shape.rotation
      this.shape = new RotateShape({ shape: this.shape.shape, rotation, pixelSize: this.pixelSize })
      this.rotation = 0
    }

    if (this.disappeared.length) {
      this.prevShape = _.cloneDeep(this.shape)

      this.disappeared.forEach((index) => {
        this.shape.disappear(index, this._scene.pixelSize)
      })

      this.prevPosition = _.clone(this.position)
      this.position.y += this.shape.pixelSize * this.disappeared.length

      this.disappeared = []
    }
  }

  disappear (rowIndex) {
    const index = rowIndex - this._scene.toIndex(this.position.y)
    if (index < 0 || index >= this.shape.rowCount) {
      return
    }

    this.disappeared.push(index)
  }

}

function randomInt (num) {
  return Math.floor(Math.random() * num)
}

function randomTetris () {
  const shape = new shapes[randomInt(shapes.length)]({ color: colors[randomInt(colors.length)] })
  const rotateShape = new RotateShape({ shape, pixelSize: 20 })
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

    // scene.things.forEach((thing) => {
    //   thing.disappear(24)
    // })
    // currentTetris.disappear(24)
    // 检测消除
    const rowStart = scene.toIndex(target.position.y)
    const rowLength = scene.toIndex(target.shape.height)
    R.forEach((index) => {
      const rowIndex = rowStart + index
      const filled = Array.from(scene.domNode.querySelectorAll(`tr[index='${rowIndex}'] td[style*='background']`))
      console.log(scene.toIndex(scene.width), filled.length)
      if (filled.length === scene.colCount) {
        console.log('bang!', rowIndex)
        R.pipe(
          R.map((cell) => +cell.getAttribute('tid')),
          R.uniq,
          R.map((id) => scene.get(id)),
          R.forEach((thing) => thing.disappear(rowIndex))
        )(filled)
      }
    }, R.range(0, rowLength))

    // 降落新的方块
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
