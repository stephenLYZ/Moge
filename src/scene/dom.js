class DomScene {

  constructor (options) {
    this.width = options.width
    this.height = options.height
    this.pixelWidth = 5
    this.borderWidth = 1
    this.rowCount = this.height / this.pixelWidth
    this.colCount = this.width / (this.pixelWidth + this.borderWidth)
  }

  build () {
    if (!this.domNode) {
      const table = document.createElement('table')
      table.setAttribute('cellspacing', 0)
      table.setAttribute('cellpadding', 0)

      for (let i = 0; i < this.rowCount; i++) {

        const row = document.createElement('tr')
        row.setAttribute('index', i)

        for (let j = 0; j < this.colCount; j++) {

          const cell = document.createElement('td')
          cell.setAttribute('width', this.pixelWidth)
          cell.setAttribute('height', this.pixelWidth)
          cell.setAttribute('row', i)
          cell.setAttribute('col', j)
          row.appendChild(cell)

        }

        table.appendChild(row)
      }

      this.domNode = table
    }
  }
}

export default DomScene
