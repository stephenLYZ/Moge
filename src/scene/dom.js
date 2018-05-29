import EventEmitter from 'eventemitter3'

class DomScene extends EventEmitter {

  constructor (options) {
    super()
    this.width = options.width
    this.height = options.height
    this.pixelSize = options.pixelSize || 20
    this.borderWidth = 1
    this.rowCount = this.height / this.pixelSize
    this.colCount = this.width / this.pixelSize

    this.thingMap = {}
    this.things = []
    this.frames = []
    this.build()

    this.paused = false
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

  remove (thing) {
    this.things = _.without(this.things, [thing])
    delete this.thingMap[thing.id]
  }

  get (id) {
    return this.thingMap[id]
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

  pause () {
    this.paused = !this.paused
  }

  loop () {
    const time = +new Date()

    if (!this.paused) {
      try {
        // 渲染物体
        this.things.forEach((thing) => {
          // 移动物体
          const deltaTime = this.prevLoopTime ? time - this.prevLoopTime : 0
          thing.update(deltaTime)
          // 清除原来的渲染
          this.clear(thing)
          this.render(thing)
        })
      } catch (err) {
        console.error(err)
        this.paused = true
      }

      // fps 统计
      if (this.frames.length > 10) {
        this.frames.shift()
      }
      this.frames.push(time)
    }

    this.prevLoopTime = time
  }

  get fps () {
    return this.frames.length / ((this.frames[this.frames.length - 1] - this.frames[0]) / 1000)
  }

  clear (thing) {
    this.render(thing, true)
  }

  collideY (thing) {
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

  collideX (thing) {
    if (!thing.prevPosition) {
      return {}
    }

    const { position: { x, y }, shape: { width, height } } = thing
    const { y: prevY } = thing.prevPosition
    const points = thing.shape.toPoints(this.pixelSize)
    let collideThing, direction
    points.forEach((row, rowIndex) => {
      row.forEach((color, colIndex) => {
        if (color === 'transparent') {
          return
        }

        const cell = this.cells[this.toIndex(prevY) + rowIndex][this.toIndex(x) + colIndex]
        const tid = +cell.getAttribute('tid')
        const col = +cell.getAttribute('col')
        const row = +cell.getAttribute('row')
        if (tid && tid !== thing.id) {
          collideThing = this.thingMap[tid]
          if (col > this.toIndex(thing.prevPosition.x)) {
            direction = 'right'
          } else if (col < this.toIndex(thing.prevPosition.x)) {
            direction = 'left'
          }
        }
      })
    })

    return {collideThing, direction}
  }

  toIndex (value) {
    return Math.round(value / this.pixelSize)
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

        const cell = _.get(this.cells, `[${y + rowIndex}][${x + colIndex}]`)
        if (!cell) {
          if (points.length === 0) {
            return
          }
          console.log('IndexOutOfBound: ', thing, y, rowIndex, x, colIndex)
          throw new Error()
        }
        if (clear) {
          cell.style.background = null
          cell.setAttribute('tid', 0)
        } else {
          cell.style.background = color
          // cell.style.border = '1px solid gray'
          cell.setAttribute('tid', thing.id)
        }
      })
    })
  }
}

export default DomScene
