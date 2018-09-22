
export default class Pointer {
  constructor(moge) {
    this.x = 0
    this.y = 0
    this.isDown = false
    this.isUp = true
    this.downTime = 0
    this.elapsedTime = 0
    this.press = undefined
    this.release = undefined
    this.tap = undefined
    this.dragSprite = null
    this.dragOffsetX = 0
    this.dragOffsetY = 0
    this.moge = moge
    this.bindEvents()
  }

  get position() {
    return { x: this.x, y: this.y }
  }

  get centerX() {
    return this.x
  }

  get centerY() {
    return this.y
  }

  bindEvents() {
    if (this.moge.renderer.type === 'canvas') {
      this.moge.renderer.canvas.addEventListener(
        "mousemove", this.handleMouseMove.bind(this), false
      )
      this.moge.renderer.canvas.addEventListener(
        "mousedown", this.handleMouseDown.bind(this), false
      )
      window.addEventListener(
        "mouseup", this.handleMouseUp.bind(this), false
      )
    }
  }

  handleMouseMove(e) {
    e.preventDefault()
    this.x = (e.pageX - e.target.offsetLeft)
    this.y = (e.pageY - e.target.offsetTop)
  }

  handleMouseDown(e) {
    e.preventDefault()
    this.x = (e.pageX - e.target.offsetLeft)
    this.y = (e.pageY - e.target.offsetTop)
    this.isDown = true
    this.isUp = false
    this.tapped = false
    this.downTime = Date.now()
    if (this.press) {
      this.press()
    }
  }

  handleMouseUp(e) {
    e.preventDefault()
    this.elapsedTime = Math.abs(this.downTime - Date.now())
    if (this.elapsedTime <= 200) {
      this.tapped = true
      if (this.tap) {
        this.tap()
      }
    }
    this.isDown = false
    this.isUp = true
    if (this.release) {
      this.release()
    }
  }

  // touch
  // todo

  hitTestSprite(sprite) {
    let hit = false
    if (!sprite.circular) {
      const left = sprite.gx
      const right = sprite.gx + sprite.width
      const top = sprite.gy
      const bottom = sprite.gy + sprite.height
      hit = this.x > left && this.x < right && this.y > top && this.y < bottom
    } else {
      const vx = this.x - (sprite.gx + sprite.halfWidth)
      const vy = this.y - (sprite.gy + sprite.halfHeight)
      const magnitude = Math.sqrt(vx * vx + vy * vy)
      hit = magnitude < sprite.radius;
    }
    return hit
  }
}