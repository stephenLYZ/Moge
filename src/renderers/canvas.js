
class CanvasRenderer {
  constructor(width, height) {
    this.type = "canvas"
    this.dips = 1 // window.devicePixelRatio
    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('width', width * this.dips)
    this.canvas.setAttribute('height', height * this.dips)
    this.canvas.style.backgroundColor = "black"
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')
  }

  render(stage, lagOffset) {
    // clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    stage.children.forEach((sprite) => {
      this.displaySprite(sprite)
    })
    this.lagOffset = lagOffset
  }

  displaySprite(sprite) {
    if (sprite.visible &&
        sprite.gx < this.canvas.width + sprite.width &&
        sprite.gx + sprite.width >= -sprite.width && 
        sprite.gy < this.canvas.height + sprite.height &&
        sprite.gy + sprite.height >= -sprite.height) {
      
      this.ctx.save()
      if (sprite._previousX) {
        sprite.renderX = (sprite.x - sprite._previousX) * this.lagOffset + sprite._previousX
      } else {
        sprite.renderX = sprite.x
      }
      if (sprite._previousy) {
        sprite.renderY = (sprite.y - sprite._previousY) * this.lagOffset + sprite._previousY
      } else {
        sprite.renderY = sprite.y
      }
      this.ctx.translate(
        sprite.renderX + (sprite.width * sprite.pivotX),
        sprite.renderY + (sprite.height * sprite.pivotY)
      )
      this.ctx.globalAlpha = sprite.alpha
      this.ctx.rotate(sprite.rotation)
      this.ctx.scale(sprite.scaleX, sprite.scaleY)
      if (sprite.shadow) {
        this.ctx.shadowColor = sprite.shadowColor
        this.ctx.shadowOffsetX = sprite.shadowOffsetX
        this.ctx.shadowOffsetY = sprite.shadowOffsetY
        this.ctx.shadowBlur = sprite.shadowBlur
      }
      if (sprite.blendMode) this.ctx.globalCompositeOperation = sprite.blendMode
      if (sprite.canvasRender) sprite.canvasRender(this.ctx)
      if (sprite.children && sprite.children.length > 0) {
        this.ctx.translate(-sprite.width * sprite.pivotX, -sprite.height * sprite.pivotY)
        sprite.children.forEach(((child) => {
          this.displaySprite(child)
        }))
      }
      this.ctx.restore()
    }
  }
}

export default CanvasRenderer
