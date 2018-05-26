import { Shape, Rectangle } from '../../shape'
import { merge, offset } from '../../shape/utils'

class Seven extends Shape {

  constructor (options) {
    super(options)
    this.width = 40
    this.height = 60
  }

  toPoints (pixelSize) {
    const background = new Rectangle({ width: this.width, height: this.height })
    let points = background.toPoints(pixelSize)

    const r1 = new Rectangle({ width: this.width, height: 20, color: this.color })
    points = merge(points, r1.toPoints(pixelSize))

    let r2 = new Rectangle({ width: 20, height: this.height, color: this.color })
    let x = Math.min((this.width / 2) / pixelSize, this.width - 20)
    r2 = offset(r2.toPoints(pixelSize), { x, y: 0 })
    points = merge(points, r2)

    return points
  }

}

class Tian extends Rectangle {

  constructor (options) {
    super(options)
    this.width = 40
    this.height = 40
  }

}

export { Seven, Tian }
