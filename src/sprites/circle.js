import BaseObject from './baseObject'

export default class Circle extends BaseObject{
  constructor(radius=15, fillStyle="red", strokeStyle="none", lineWidth=0, x=0, y=0) {
    super()
    this.circle = true
    this.radius = radius
    this.width = this.radius * 2
    this.height = this.radius * 2
  }

  canvasRender(ctx) {
    ctx.strokeStyle = this.strokeStyle
    ctx.lineWidth = this.lineWidth
    ctx.fillStyle = this.fillStyle
    ctx.beginPath()
    ctx.arc(
      this.radius + (-this.diameter * this.pivotX),
      this.radius + (-this.diameter * this.pivotY),
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