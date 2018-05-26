class Move {

  constructor (options) {
    this.orientation = options.orientation
    this.speed = options.speed
  }

  set orientation (value) {
    this.radian = 2 * Math.PI / 360 * value
    console.log('set radian to: ' + this.radian)
  }

  exec (time, position) {
    let { x, y } = position

    const offset = this.speed * time / 1000
    x += Math.cos(this.radian) * offset
    y -= Math.sin(this.radian) * offset

    // console.log(position, x, y)
    return { x, y }
  }
}

export default Move
