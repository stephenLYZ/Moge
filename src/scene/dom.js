import EventEmitter from 'eventemitter3'

class DomScene extends EventEmitter {

  constructor (options) {
    super()
    this.width = options.width
    this.height = options.height
    this.pixelSize = options.pixelSize || 20
    this.borderWidth = 0
    this.rowCount = this.height / this.pixelSize
    this.colCount = this.width / this.pixelSize

    this.things = []

    this.frames = []
    this.emitted = {}
  }

  build () {
    if (!this.domNode) {
      const table = document.createElement('table')
      table.setAttribute('cellspacing', 0)
      table.setAttribute('cellpadding', 0)

      const cells = []

      for (let i = 0; i < this.rowCount; i++) {

        const rowCells = []
        const row = document.createElement('tr')
        row.setAttribute('index', i)

        for (let j = 0; j < this.colCount; j++) {

          const cell = document.createElement('td')
          const width = Math.max(this.pixelSize - this.borderWidth, 1)
          cell.setAttribute('width', width)
          cell.setAttribute('height', this.pixelSize)
          cell.setAttribute('row', i)
          cell.setAttribute('col', j)
          cell.style.borderWidth = this.borderWidth

          rowCells.push(cell)
          row.appendChild(cell)

        }

        cells.push(rowCells)
        table.appendChild(row)
      }

      this.domNode = table
      this.cells = cells
    }
  }

  add (thing) {
    this.things.push(thing)
  }

  startLoop () {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.loop()
      }, 30)
    }
  }

  stopLoop () {
    clearInterval(this.timer)
  }

  loop () {
    const time = +new Date()

    if (this.prevLoopTime) {
      // 移动物体
      const deltaTime = time - this.prevLoopTime
      this.things.forEach((thing) => {
        if (thing.moveable) {
          // 清除原来的渲染
          this.clear(thing.position, thing.shape)
          thing.move(deltaTime)
        }
      })
    }

    // 检测碰撞
    this.things.forEach((thing) => {
      const { position: { x, y}, shape: { width, height } } = thing
      if (y + height > this.height) {
        thing.position.y = this.height - height
      }
      if (!this.emitted[thing.id]) {
        if (thing.position.y + height === this.height) {
          this.emit('edge', { which: 'bottom', target: thing })
          this.emitted[thing.id] = true
        }
      }
    })

    // 渲染物体
    this.things.forEach((thing) => {
      this.render(thing.position, thing.shape)
    })

    // fps 统计
    if (this.frames.length > 10) {
      this.frames.shift()
    }
    this.frames.push(time)

    this.prevLoopTime = time
  }

  get fps () {
    return this.frames.length / ((this.frames[this.frames.length - 1] - this.frames[0]) / 1000)
  }

  clear (pos, shape) {
    this.render(pos, shape, true)
  }

  render (pos, shape, clear = false) {
    let { x, y } = pos
    x = Math.round(x / this.pixelSize)
    y = Math.round(y / this.pixelSize)

    const points = shape.toPoints(this.pixelSize)

    points.forEach((row, rowIndex) => {
      row.forEach((color, colIndex) => {
        if (color === 'transparent') {
          return
        }

        const cell = this.cells[y + rowIndex][x + colIndex]
        if (clear) {
          cell.style.background = 'transparent'
          cell.style.border = 0
        } else {
          cell.style.background = color
          cell.style.border = '1px solid gray'
        }
      })
    })
  }

}

export default DomScene
