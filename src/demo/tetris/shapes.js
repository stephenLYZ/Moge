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

class Stick extends Rectangle {

  constructor (options) {
    super(options)
    this.width = 20
    this.height = 80
  }

}

class Zaid extends Shape {
  constructor (options) {
    super(options)
    this.width = 40
    this.height = 60
  }

  toPoints (pixelSize) {
    const background = new Rectangle({ width: this.width, height: this.height })
    let points = background.toPoints(pixelSize)

    const rect = new Rectangle({ width: 20, height: 40, color: this.color })
    let rectPoints = offset(rect.toPoints(pixelSize), { y: 20 / pixelSize, x: 0 })
    points = merge(points, rectPoints)

    rectPoints = offset(rect.toPoints(pixelSize), { y: 0, x: 20 / pixelSize })
    points = merge(points, rectPoints)

    return points
  }
}

class Dust extends Shape {
  constructor (options) {
    super(options)
    this.width = 60
    this.height = 40
  }

  toPoints (pixelSize) {
    const background = new Rectangle({ width: this.width, height: this.height })
    let points = background.toPoints(pixelSize)

    let rect = new Rectangle({ width: 20, height: 20, color: this.color })
    let rectPoints = offset(rect.toPoints(pixelSize), { x: 20 / pixelSize, y: 0 })
    points = merge(points, rectPoints)

    rect = new Rectangle({ width: 60, height: 20, color: this.color })
    rectPoints = offset(rect.toPoints(pixelSize), { x: 0, y: 20 / pixelSize })
    points = merge(points, rectPoints)

    return points
  }
}

export { Seven, Tian, Stick, Zaid, Dust }
