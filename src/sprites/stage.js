import BaseObject from './baseObject'

export default class Stage extends BaseObject {
  constructor(width, height) {
    super()
    this.isStage = true
    this.width = width
    this.height = height
    this.x = 0
    this.y = 0
    this.parent = undefined
  }
}