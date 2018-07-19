import BaseObject from './baseObject'

export default class Text extends BaseObject{
  constructor(content="hello world", font="12px sans-serif", fillStyle="red", x=0, y=0) {
    super()
    this.content = content
    this.font = font
    this.fillStyle = fillStyle
    this.x = x
    this.y = y
    this.textBaseline = "top"
  }

  canvasRender(ctx) {
    ctx.strokeStyle = this.strokeStyle
    ctx.lineWidth = this.lineWidth
    ctx.fillStyle = this.fillStyle

    if (this.width === 0) this.width = ctx.measureText(this.content).width
    if (this.height === 0) this.height = ctx.measureText("M").width
    ctx.translate(-this.width * this.pivotX, -this.height * this.pivotY)
    ctx.font = this.font
    ctx.textBaseline = this.textBaseline
    ctx.fillText(
      this.content,
      0,
      0
    )
  }
}