import BaseObject from './baseObject'

export default class Circle extends BaseObject{
  constructor(radius=15, fillStyle="red", strokeStyle="none", lineWidth=0, x=0, y=0) {
    super()
    this.circle = true
    this.radius = radius
    this.width = radius * 2
    this.height = radius * 2
    this.fillStyle = fillStyle
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth
    this.x = x
    this.y = y
  }

  canvasRender(ctx) {
    ctx.strokeStyle = this.strokeStyle
    ctx.lineWidth = this.lineWidth
    ctx.fillStyle = this.fillStyle
    ctx.beginPath()
    ctx.arc(
      this.radius - this.radius * 2 * this.pivotX,
      this.radius - this.radius * 2 * this.pivotY,
      this.radius,
      0,
      2 * Math.PI,
      false
    )
    if (this.mask === true) {
      ctx.clip()
    } else {
      if (this.strokeStyle !== "none") ctx.stroke()
      if (this.fillStyle !== "none") ctx.fill()
    }
  }
}