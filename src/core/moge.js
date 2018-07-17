import Stage from '../sprites/stage'
import CanvasRenderer from '../renderers/canvas'
import DomRenderer from '../renderers/dom'
import TableRenderer from '../renderers/table'

class Moge {
  static get Version() {
    return '0.0.1'
  }
  static get Plugins() {
    return undefined
  }
  static get Custom() {
    return undefined
  }
  constructor(width=50, height=50, renderer='canvas', setup, assetsToLoad, load) {
    this.state = undefined

    this.buttons = []
    this.pause = false
    this.draggableSprites = []
    this.dragAndDrop = false
    this.tweens = []

    this._fps = 60
    this._startTime = Date.now()
    this._frameDuration = 1000 / this._fps
    this._lag = 0

    this.canvasRenderer = new CanvasRenderer(width, height)
    this.domRenderer = new DomRenderer(width, height)
    this.tableRenderer = new TableRenderer(width, height)
    this.renderer = this.createRenderer(renderer)
    this.setup = setup
    this.load = load
    this.assetFilePaths = assetsToLoad
    this.interpolate = true
    this.scale = 1
    

    this.updateFunctions = []

    this.stage = new Stage()
  }

  start() {
    if (this.assetFilePaths) {
      this.assets.whenLoaded = () => {
        this.state = undefined
        this.setup()
      };
      this.assets.load(this.assetFilePaths)
      if (this.load) {
        this.state = this.load
      }
    } else {
      this.setup()
    }

    //Start the game loop
    gameLoop();
  }

  pause() {
    this.pause = true
  }

  resume() {
    this.pause = false
  }

  update() {
    if (this.state && !this.pause) {
      this.state()
    }
    if (this.updateFunctions.length !== 0) {
      for (let l = 0; l < this.updateFunctions.length; l++) {
        this.updateFunctions[l].call(this)
      }
    }
  }

  gameLoop() {
    requestAnimationFrame(gameLoop)
    let current = Date.now()
    let elapsed = current - this._startTime
    if (elapsed > 1000) elapsed = this._frameDuration;
    this._startTime = current
    this._lag += elapsed

    while(this._lag >= this._frameDuration) {
      this.capturePreviousSpritePositions()
      this.update()
      this._lag -= this._frameDuration
    }

    let lagOffset = this._lag / this._frameDuration
    this.renderer.render(lagOffset)
  }

  capturePreviousSpritePositions() {
    this.stage.children.forEach((sprite) => {
      setPosition(sprite)
    })

    function setPosition(sprite) {
      sprite._previousX = sprite.x;
      sprite._previousY = sprite.y;
      if (sprite.children && sprite.children.length > 0) {
        sprite.children.forEach((child) => {
          setPosition(child);
        });
      }
    }
  }

  createRenderer(r) {
    let renderer
    switch(r) {
      case 'canvas':
        renderer = this.canvasRenderer
        break
      case 'dom':
        renderer = this.domRenderer
        break
      case 'table':
        renderer = this.tableRenderer
        break
      default: 
        throw new Error('no such this renderer!')
    }
    return renderer
  }

  remove() {

  }
}



export { Moge as default }
