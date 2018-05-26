class DomScene {

  constructor (options) {
    this.width = options.width
    this.height = options.height
    this.pixelSize = 10
    this.borderWidth = 1
    this.rowCount = this.height / this.pixelSize
    this.colCount = this.width / this.pixelSize

    this.things = []

    this.frames = []
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
      }, 50)
    }
  }

  stopLoop () {
    clearInterval(this.timer)
  }

  loop () {
    const time = +new Date()

    if (this.prevLoopTime) {
      const deltaTime = time - this.prevLoopTime
      this.things.forEach((thing) => {
        if (thing.moveable) {
          this.clear(thing.position, thing.shape)
        }
        thing.move(deltaTime)
      })
    }
    this.prevLoopTime = time

    this.things.forEach((thing) => {
      this.render(thing.position, thing.shape)
    })

    if (this.frames.length > 10) {
      this.frames.shift()
    }
    this.frames.push(time)
  }

  get fps () {
    return this.frames.length / ((this.frames[this.frames.length - 1] - this.frames[0]) / 1000)
  }

  clear (pos, shape) {
    this.render(pos, shape, 'transparent')
  }

  render (pos, shape, forceColor) {
    let { x, y } = pos
    x = Math.round(x / this.pixelSize)
    y = Math.round(y / this.pixelSize)

    const points = shape.toPoints(this.pixelSize)

    points.forEach((row, rowIndex) => {
      row.forEach((color, colIndex) => {
        const cell = this.cells[y + rowIndex][x + colIndex]
        cell.style.background = forceColor || color
      })
    })
  }

}

export default DomScene
