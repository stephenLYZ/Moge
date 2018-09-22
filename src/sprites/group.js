import BaseObject from './baseObject'

export default class Group extends BaseObject {
  constructor(...spritesToGroup) {
    super()
    if (spritesToGroup && spritesToGroup.length > 0 ) {
      spritesToGroup.forEach((sprite) => {
        this.addChild(sprite)
      })
    }
  }

  addChild(sprite) {
    if (sprite.parent) {
      sprite.parent.removeChild(sprite)
    }
    sprite.parent = this
    this.children.push(sprite)
    this.calculateSize()
  }

  removeChild(sprite) {
    if (sprite.parent === this) {
      this.children.splice(this.children.indexOf(sprite), 1)
    } else {
      throw new Error(sprite + ' is not a child of ' + this)
    }
    this.calculateSize()
  }

  calculateSize() {
    if (this.children.length > 0) {
      this._newWidth = 0
      this._newHeight = 0
      this.children.forEach((child) => {
        if (child.x + child.width > this._newWidth) {
          this._newWidth = child.x + child.width
        }
        if (child.y + child.height > this._newHeight) {
          this._newHeight = child.y + child.height
        }
      })
      this.width = this._newWidth
      this.height = this._newHeight
    }
  }
}