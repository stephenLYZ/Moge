import CanvasRenderer from '../renderers/canvas'
import DomRenderer from '../renderers/dom'
import TableRenderer from '../renderers/table'
import State from './state'
import Loader from './loader'
import Keyboard from './keyboard'
import Collision from './collision'
import {
  Circle,
  Rectangle,
  Line,
  Text,
  Group,
  Stage
} from '../sprites/index'

class Moge {
  constructor(width=50, height=50, renderer='canvas', assetFilePaths) {
    this.state = new State()
    this.loader = new Loader()
    // this.keyboard = new Keyboard()

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
    this.assetFilePaths = assetFilePaths

    this.interpolate = true
    this.scale = 1
    

    this.updateFunctions = []

    // stage is the parent of all the other sprites and groups.
    this.stage = new Stage()
  }


  start() {
    if (!this.state.stateMap.setup) {
      throw new Error('Please supply the setup state function')
    }
    if (this.assetFilePaths) {
      this.loader.loadedFunction = () => {
        this.state.currentState = undefined
        this.state.start('setup')
      }
      this.loader.load(this.assetFilePaths)
      if (this.state.stateMap.load) {
        this.state.start('load')
      }
    } else {
      this.state.start('setup')
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
    if (this.state.currentState && !this.pause) {
      this.state.stateMap[this.state.currentState].call(this)
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
    this.renderer.render(this.stage, lagOffset)
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

  circle(radius, fillStyle, strokeStyle, lineWidth, x, y) {
    let circle = new Circle(radius, fillStyle, strokeStyle, lineWidth, x, y)
    this.stage.addChild(circle)
    return circle
  }

  rectangle(width, height, fillStyle, strokeStyle, lineWidth, x, y) {
    let rectangle = new Rectangle(width, height, fillStyle, strokeStyle, lineWidth, x, y)
    this.stage.addChild(rectangle)
    return rectangle
  }

  line(strokeStyle, lineWidth, x1, y1, x2, y2) {
    let line = new Line(strokeStyle, lineWidth, x1, y1, x2, y2)
    this.stage.addChild(line)
    return line
  }

  text(content, font, fillStyle, x, y) {
    let text = new Text(content, font, fillStyle, x, y)
    this.stage.addChild(text)
    return text
  }

  group(...sprites) {
    let group = new Group(sprites)
    this.stage.addChild(group)
    return group
  }
  

  remove() {

  }
}



export { Moge as default }
