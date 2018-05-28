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

    this.thingMap = {}
    this.things = []
    this.frames = []
    this.build()
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
          cell.setAttribute('tid', 0)
          cell.style.borderWidth = this.borderWidth

          rowCells.push(cell)
          row.appendChild(cell)
        }

        cells.push(rowCells)
        table.appendChild(row)
      }

      this.domNode = table
      this.cells = cells
      this.comfort = cells
    }
  }

  add (thing) {
    thing._scene = this
    this.things.push(thing)
    this.thingMap[thing.id] = thing
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

    // 渲染物体
    this.things.forEach((thing) => {
      // 移动物体
      const deltaTime = this.prevLoopTime ? time - this.prevLoopTime : 0
      thing.update(deltaTime)
      // 清除原来的渲染
      this.clear(thing)
      this.render(thing)
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

  clear (thing) {
    this.render(thing, true)
  }

  collide (thing) {
    const { position: { x, y }, shape: { width, height } } = thing
    const points = thing.shape.toPoints(this.pixelSize)
    let collideThing, direction
    points.forEach((row, rowIndex) => {
      row.forEach((color, colIndex) => {
        if (color === 'transparent') {
          return
        }

        const cell = this.cells[Math.round(y / this.pixelSize) + rowIndex][Math.round(x / this.pixelSize) + colIndex]
        const tid = +cell.getAttribute('tid')
        const col = +cell.getAttribute('col')
        const row = +cell.getAttribute('row')
        if (tid && tid !== thing.id) {
          collideThing = this.thingMap[tid]
          if (col > Math.round(thing.prevPosition.x / this.pixelSize)) {
            direction = 'right'
          } else if (col < Math.round(thing.prevPosition.x / this.pixelSize)) {
            direction = 'left'
          }
          if (row > Math.round(thing.prevPosition.y / this.pixelSize)) {
            direction = 'down'
          } else if (row < Math.round(thing.prevPosition.y / this.pixelSize)) {
            direction = 'up'
          } 
        }
      })
    })
    return {collideThing, direction}
  }

  render (thing, clear = false) {
    const pos = clear ? thing.prevPosition : thing.position
    const shape = clear ? thing.prevShape : thing.shape
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
          cell.setAttribute('tid', 0)
        } else {
          cell.style.background = color
          cell.style.border = '1px solid gray'
          cell.setAttribute('tid', thing.id)
        }
      })
    })
  }
}

export default DomScene
