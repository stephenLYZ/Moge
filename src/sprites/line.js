import BaseObject from './baseObject'

export default class Line extends BaseObject{
  constructor(strokeStyle="red", lineWidth=1, x1=0, y1=0, x2=30, y2= 30) {
    super()
    this.strokeStyle = strokeStyle
    this.lineWidth = lineWidth
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.lineJoin = 'round'
  }

  canvasRender(ctx) {
    ctx.strokeStyle = this.strokeStyle
    ctx.lineWidth = this.lineWidth
    ctx.lineJoin = this.lineJoin
    ctx.beginPath()
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    //ctx.closePath()
    if (this.strokeStyle !== "none") ctx.stroke()
  }
}