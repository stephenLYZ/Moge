
class CanvasRenderer {
  constructor() {
    this.dips = 1 // window.devicePixelRatio
    this.canvas = document.createElement('canvas')
    this.canvas.setAttribute('width', width * dips)
    this.canvas.setAttribute('height', height * dips)
    this.canvas.style.backgroundColor = "black"
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')
  }
}

export default CanvasRenderer