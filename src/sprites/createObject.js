import { byLayer } from '../helpers'

export default class createObject {
  constructor() {
    this.x = 0
    this.y = 0

    this.vx = 0
    this.vy = 0

    this.width = 0
    this.height = 0

    this.scaleX = 1
    this.scaleY = 1

    this.rotation = 0
    this.visible = true

    this.parent = undefined

    this.isStage = false

    this.shadow = false
    this.shadowColor = "rgba(100, 100, 100, 0.5)"
    this.shadowOffsetX = 3
    this.shadowOffsetY = 3
    this.shadowBlur = 3
    this.blendMode = undefined
    this._alpha = 1
    this._draggable = undefined

    this._layer = 0
    this._circular = false
    this._interactive = false
    this._previousX = undefined
    this._previousY = undefined
    this.children = []
  }

  addChild(sprite) {
    if (sprite.parent) {
      sprite.parent.removeChild(sprite)
    }
    sprite.parent = this
    this.children.push(sprite)
  }

  removeChild(sprite) {
    if (sprite.parent === this) {
      this.children.splice(this.children.indexOf(sprite), 1)
    } else {
      throw new Error(sprite + " is not a child of " + this)
    }
  }

  swapChildren(child1, child2) {
    let index1 = this.children.indexOf(child1)
    let index2 = this.children.indexOf(child2)
    if (index1 !== -1 && index2 !== -1) {
      child1.childIndex = index2
      child2.childIndex = index1

      this.children[index1] = child2
      this.children[index2] = child1
    } else {
      throw new Error('Both objects must be a child of ' + this)
    }
  }

  add(...sprites) {
    if(sprites.length > 1) {
      sprites.forEach((sprite) => {
        this.addChild(sprite)
      })
    } else {
      this.addChild(sprites[0])
    }
  }

  remove(...sprites) {
    if(sprites.length > 1) {
      sprites.forEach((sprite) => {
        this.removeChild(sprite)
      })
    } else {
      this.removeChild(sprites[0])
    }
  }

  setPosition(x, y) {
    this.x = x
    this.y = y
  }

  putCenter(b, xOffset=0, yOffset=0) {
    b.x = (this.x + this.halfWidth - b.halfWidth) + xOffset;
    b.y = (this.y + this.halfHeight - b.halfHeight) + yOffset;

    this.compensateForParentPosition(this, b);
  }

  putTop(b, xOffset=0, yOffset=0) {
    b.x = (this.x + this.halfWidth - b.halfWidth) + xOffset;
    b.y = (this.y - b.height) + yOffset;

    this.compensateForParentPosition(this, b);
  }

  putRight(b, xOffset=0, yOffset=0) {
    b.x = (this.x + this.width) + xOffset;
    b.y = (this.y + this.halfHeight - b.halfHeight) + yOffset;

    this.compensateForParentPosition(this, b);
  }

  putBottom(b, xOffset=0, yOffset=0) {
    b.x = (this.x + this.halfWidth - b.halfWidth) + xOffset;
    b.y = (this.y + this.height) + yOffset;

    this.compensateForParentPosition(this, b);
  }

  putLeft(b, xOffset=0, yOffset=0) {
    b.x = (this.x - b.width) + xOffset;
    b.y = (this.y + this.halfHeight - b.halfHeight) + yOffset;

    this.compensateForParentPosition(this, b);
  }

  compensateForParentPosition(a, b) {
    if (b.parent.gx !== 0 || b.parent.gy !== 0) {
      b.x -= a.gx;
      b.y -= a.gy;
    }
  }

  get gx() {
    if (this.parent) {
      return this.x + this.parent.gx
    } else {
      return this.x
    }
  }

  get gy() {
    if (this.parent) {
      return this.y + this.parent.gx
    } else {
      return this.y
    }
  }

  get position() {
    return {
      x: this.x,
      y: this.y
    }
  }

  get alpha() {
    return this.parent._alpha * this._alpha
  }

  set alpha(value) {
    this._alpha = value
  }

  get halfHeight() {
    return this.height / 2
  }

  get halfWidth() {
    return this.width / 2
  }

  get centerX() {
    return this.x + this.halfWidth
  }

  get centerY() {
    return this.y + this.halfHeight
  }

  get layer() {
    return this._layer
  }

  set layer(value) {
    this._layer = value
    this.parent.children.sort(byLayer)
  }

  get circular() {
    return this._circular
  }

  set circular(value) {

  }

  get interactive() {
    return this._interactive
  }

  set interactive(value) {

  }

  get draggable() {
    return this._draggable
  }

  set draggable(value) {

  }

  get localBounds() {
    return {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height
    }
  }

  get globalBounds() {
    return {
      x: this.gx,
      y: this.gy,
      width: this.gx + this.width,
      height: this.gy + this.height
    }
  }

  get empty() {
    if (this.children.length === 0) {
      return true
    } else {
      return false
    }
  }
}
