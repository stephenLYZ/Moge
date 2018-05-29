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

    this.moveDownCount = 0
  }

  rotate () {
    this.rotation += 1
  }

  update (time) {
    this.prevShape = _.cloneDeep(this.shape)

    if (this.rotation) {
      const rotation = this.rotation + this.shape.rotation
      this.shape = new RotateShape({ shape: this.shape.shape, rotation, pixelSize: this.pixelSize })
      this.rotation = 0
    }

    super.update(time)

    if (this.disappeared.length) {
      this.disappeared.map((index) => {
        this.shape.disappeared.forEach((item) => {
          if (index >= item) {
            index += 1
          }
        })
        return index
      }).forEach((index) => {
        this.shape.disappear(index, this._scene.pixelSize)
      })

      this.position.y += this.shape.pixelSize * this.disappeared.length

      this.disappeared = []
    }

    if (this.moveDownCount > 0) {
      this.position.y += this.shape.pixelSize * this.moveDownCount

      this.moveDownCount = 0
    }
  }

  disappear (rowIndex) {
    const index = rowIndex - this._scene.toIndex(this.position.y)
    if (index < 0 || index >= this.shape.rowCount) {
      return
    }

    this.disappeared.push(index)
  }

  moveDown () {
    this.moveDownCount += 1
  }

}

function randomInt (num) {
  return Math.floor(Math.random() * num)
}

function randomTetris (sceneWidth, pixelSize) {
  const shape = new shapes[randomInt(shapes.length)]({ color: colors[randomInt(colors.length)] })
  const rotateShape = new RotateShape({ shape, pixelSize })
  const position = { x: Math.random() * (sceneWidth - shape.width), y: 0 }
  const move = new Move({ orientation: 270, speed: 200 })
  const tetris = new Tetris({ position, shape: rotateShape, move })
  return tetris
}

window.onload = () => {
  const pixelSize = 20
  const scene = new Scene({ width: 200, height: 500, pixelSize })
  window.scene = scene

  let currentTetris = randomTetris(scene.width, pixelSize)
  scene.add(currentTetris)

  document.body.appendChild(scene.domNode)

  let $score = document.createElement('div')
  let score = 0;
  $score.innerHTML = '当前分数:' + score
  document.body.appendChild($score)
  // scene.startLoop()
  const finished = {}
  scene.on('collide', ({ which, target }) => {
    if (finished[target.id] || which !== 'down') {
      return
    }
    let lineCount = 0

    target.orientation = 270
    target.speed = 0
    finished[target.id] = true

    // scene.things.forEach((thing) => {
    //   thing.disappear(23)
    //   thing.disappear(24)
    // })
    // 检测消除
    const rowStart = scene.toIndex(target.position.y)
    const rowLength = scene.toIndex(target.shape.height)
    R.forEach((index) => {
      const rowIndex = rowStart + index
      const filled = Array.from(scene.domNode.querySelectorAll(`tr[index='${rowIndex}'] td[style*='background']`))
      console.log(scene.toIndex(scene.width), filled.length)
      if (filled.length === scene.colCount) {
        console.log('bang!', rowIndex)
        lineCount++
        R.pipe(
          R.map((cell) => +cell.getAttribute('tid')),
          R.uniq,
          R.map((id) => scene.get(id)),
          R.forEach((thing) => thing.disappear(rowIndex))
        )(filled)

        // 将所有上层 thing 往下位移
        scene.things.forEach((thing) => {
          const endRow = scene.toIndex(thing.position.y) + scene.toIndex(thing.shape.height) - 1
          if (endRow < rowIndex) {
            thing.moveDown()
          }
        })
      }
    }, R.range(0, rowLength))

    // 得分
    score += lineCount * 200
    $score.innerHTML = '当前分数:' + score

    // 游戏结束判断
    if (scene.cells[0].some((cell) => {
      if (+cell.getAttribute('tid')) return true
    })) {
      scene.pause()
      scene.things.forEach((thing) => {
        scene.clear(thing)
      })
      alert('游戏结束')
    } else {
      // 降落新的方块
      currentTetris = randomTetris(scene.width, pixelSize)
      scene.add(currentTetris)
    }
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
        // currentTetris.speed = 10000000000
        scene.pause()
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

  const fps = document.createElement('div')
  setInterval(() => {
    fps.innerText = 'fps: ' + scene.fps
  }, 1000)
  document.body.appendChild(fps)

  const button = document.createElement('button')
  button.innerHTML = '开始游戏'
  button.addEventListener('click', () => {
    scene.startLoop()
    button.style.display = "none"
  })
  document.body.appendChild(button)

  // const pause = document.createElement('button')
  // pause.innerText = 'pause'
  // pause.addEventListener('click', () => {
  //   scene.pause()
  // })
  // document.body.appendChild(pause)
}
