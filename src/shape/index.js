const defaultColor = 'transparent'

class Shape {

  constructor (options) {
    this.width = options.width
    this.height = options.height
    this.color = options.color || defaultColor
  }

  toPoints (pixelSize) {
    throw new Error('Need implement!')
  }

}

class Rectangle extends Shape {

  toPoints (pixelSize) {
    const rowCount = this.height / pixelSize
    const colCount = this.width / pixelSize
    
    const pixels = []

    for (let i = 0; i < rowCount; i++) {

      const rowPixels = []

      for (let j = 0; j < colCount; j++) {
        rowPixels.push(this.color)
      }

      pixels.push(rowPixels)
    }

    return pixels
  }

}

export { Shape, Rectangle }
