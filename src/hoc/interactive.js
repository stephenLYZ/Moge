export const interactiveObjects = []

export const makeInteractived = (ObjectClass) => {
  return class extends ObjectClass {
    constructor() {
      super()
      this._interactive = false
    }

    get interactive() {
      return this._interactive
    }
  
    set interactive(value) {
      if (value) {
        this.state = 'up'
        this.action = ''
        this.pressed = false
        this.enabled = true
        this.hoverOver = false
        interactiveObjects.push(this)
        this._interactive = true
      } else {
        this._interactive = false
      }
    }

    update(pointer, renderer) {
      if (this.enabled) {
        const hit = pointer.hitTestSprite(this)
        if (pointer.isUp) {
          this.state = 'up'
          if (this.subtype === 'button') {
            this.show(this)
          }
        }
        if (hit) {
          this.state = 'over'
          if (this.frames && this.frames.length === 3 && this.subtype === "button") {
            this.show(1)
          }
          if (pointer.isDown) {
            this.state = "down"
            if (this.subtype === "button") {
              if (this.frames.length === 3) {
                this.show(2)
              } else {
                this.show(1)
              }
            }
          }
        }
        if (this.state === "down") {
          if (!this.pressed) {
            if (this.press) this.press()
            this.pressed = true
            this.action = "pressed"
          }
        }
        if (this.state === "over") {
          if (this.pressed) {
            if (this.release) this.release()
            this.pressed = false
            this.action = "released"

            if (pointer.tapped && this.tap) this.tap()
          }
          if (!this.hoverOver) {
            if (this.over) this.over()
            this.hoverOver = true
          }
        }

        if (this.state === "up") {
          if (this.pressed) {
            if (this.release) this.release()
            this.pressed = false
            this.action = "released"
          }
          if (this.hoverOver) {
            if (this.out) this.out()
            this.hoverOver = false
          }
        }
      }
    }
  }
}