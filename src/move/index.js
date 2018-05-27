class Move {

  constructor (options) {
    this.orientation = options.orientation
    this.speed = options.speed
  }

  set orientation (value) {
    this.radian = 2 * Math.PI / 360 * value
  }

  exec (time, position) {
    let { x, y } = position

    const offset = this.speed * time / 1000
    x += Math.round(Math.cos(this.radian) * 100) / 100 * offset
    y -= Math.round(Math.sin(this.radian) * 100) / 100 * offset

    // console.log(position, x, y)
    return { x, y }
  }
}

export default Move
