import CanvasRenderer from '../renderers/canvas'
import DomRenderer from '../renderers/dom'
import State from './state'
import Loader from './loader'
import Keyboard from './keyboard'
import Pointer from './pointer'
import Collision from '../plugins/collision'
import Utils from '../plugins/utils'
import {
  Circle,
  Rectangle,
  Line,
  Text,
  Group,
  Stage,
  Sprite
} from '../sprites'
import { interactiveObjects } from '../hoc/interactive'

class Moge {
  constructor(width=50, height=50, assets, renderer='canvas') {
    this.width = width
    this.height = height
    this.pause = false
    this.draggableSprites = []
    this.dragAndDrop = false
    this.tweens = []

    this.fps = 60
    this.startTime = Date.now()
    this.frameDuration = 1000 / this.fps
    this.lag = 0

    this.renderer = this.createRenderer(renderer)
    this.assets = assets

    this.interpolate = true
    this.scale = 1
    

    this.updateFunctions = []

    this.state = new State()
    this.loader = new Loader()
    this.pointer = new Pointer(this)
    // this.keyboard = new Keyboard()

    // stage is the parent of all the other sprites and groups.
    this.stage = new Stage(width, height)

    // plugins
    this.utils = new Utils()

    this.gameLoop = this.gameLoop.bind(this)
  }


  start() {
    if (!this.state.stateMap.setup) {
      throw new Error('Please supply the setup state function')
    }
    if (this.assets) {
      this.loader.loadedFunction = () => {
        this.state.currentState = undefined
        this.state.start('setup')
      }
      this.loader.load(this.assets)
      if (this.state.stateMap.load) {
        this.state.start('load')
      }
    } else {
      this.state.start('setup')
    }

    this.gameLoop()
  }

  pause() {
    this.pause = true
  }

  resume() {
    this.pause = false
  }

  update() {
    if (interactiveObjects.length > 0) {
      interactiveObjects.map((o) => {
        o.update(this.pointer, this.renderer)
      })
    }
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
    requestAnimationFrame(this.gameLoop)
    let current = Date.now()
    let elapsed = current - this.startTime
    if (elapsed > 1000) elapsed = this.frameDuration
    this.startTime = current
    this.lag += elapsed

    while(this.lag >= this.frameDuration) {
      this.capturePreviousSpritePositions()
      this.update()
      this.lag -= this.frameDuration
    }

    let lagOffset = this.lag / this.frameDuration
    this.renderer.render(this.stage, lagOffset)
  }

  capturePreviousSpritePositions() {
    this.stage.children.forEach((sprite) => {
      setPosition(sprite)
    })

    function setPosition(sprite) {
      sprite._previousX = sprite.x
      sprite._previousY = sprite.y
      if (sprite.children && sprite.children.length > 0) {
        sprite.children.forEach((child) => {
          setPosition(child)
        })
      }
    }
  }

  createRenderer(r) {
    let renderer
    switch(r) {
      case 'canvas':
        renderer = new CanvasRenderer(this.width, this.height)
        break
      case 'dom':
        renderer = new DomRenderer(this.width, this.height)
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

  sprite(source, w, h) {
    let sprite = new Sprite(source, this.loader, w, h)
    this.stage.addChild(sprite)
    return sprite
  }
  
  frame(source, x, y, width, height) {
    return {
      image: source,
      x,
      y,
      width,
      height
    }
  }

  frames(source, arrayOfPositions, width, height) {
    return {
      image: source,
      data: arrayOfPositions,
      width,
      height
    }
  }

  filmstrip(imageName, frameWidth, frameHeight, spacing) {
    const image = this.loader.assets[imageName].source
    const positions = []
    const columns = image.width / frameWidth
    const rows = image.height / frameHeight
    const numberOfFrames = columns * rows

    for (var i = 0; i < numberOfFrames; i++) {

      let x, y
      x = (i % columns) * frameWidth
      y = Math.floor(i / columns) * frameHeight

      if (spacing && spacing > 0) {
        x += spacing + (spacing * i % columns)
        y += spacing + (spacing * Math.floor(i / columns))
      }
      positions.push([x, y])
    }

    return this.frames(imageName, positions, frameWidth, frameHeight)
  }

  remove(spritesToRemove) {
    if (Array.isArray(spritesToRemove)) {
      spritesToRemove.map((sprite) => {
        sprite.parent.removeChild(sprite)
        spritesToRemove.splice(spritesToRemove.indexOf(sprite), 1)
      })
    } else {
      spritesToRemove.parent.removeChild(spritesToRemove)
    }
  }
}



export { Moge as default }
