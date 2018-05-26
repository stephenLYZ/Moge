class DomScene {

  constructor (options) {
    this.width = options.width
    this.height = options.height
    this.pixelSize = 10
    this.borderWidth = 1
    this.rowCount = this.height / this.pixelSize
    this.colCount = this.width / this.pixelSize
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

  render (pos, shape) {

    let { x, y } = pos
    x = x / this.pixelSize
    y = y / this.pixelSize

    const points = shape.toPoints(this.pixelSize)

    points.forEach((row, rowIndex) => {
      row.forEach((color, colIndex) => {
        const cell = this.cells[y + rowIndex][x + colIndex]
        cell.style.background = color
      })
    })

  }
}

export default DomScene
