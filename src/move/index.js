class Move {

  constructor (options) {
    this.orientation = options.orientation
    this.speed = options.speed
  }

  exec (time, position) {
    let { x, y } = position

    const offset = this.speed * time / 1000
    switch (this.orientation) {
      case 'down':
        y += offset
        break;
      case 'up':
        y -= offset
        break;
      case 'right':
        x += offset
        break;
      case 'left':
        x -= offset
        break;
    }

    // console.log(position, x, y)
    return { x, y }
  }
}

export default Move
