import BaseObject from './baseObject'

export default class Rectangle extends BaseObject{
  constructor(width=30, height=30, fillStyle="red", strokeStyle="none", lineWidth=0, x=0, y=0) {
    super()
    this.width = width
    this.height = height
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
    ctx.rect(
      -this.width * this.pivotX,
      -this.height * this.pivotY,
      this.width,
      this.height
    )
    if (this.mask === true) {
      ctx.clip()
    } else {
      if (this.strokeStyle !== "none") ctx.stroke()
      if (this.fillStyle !== "none") ctx.fill()
    }
  }
}