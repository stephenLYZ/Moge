import BaseObject from './baseObject'

export default class Sprite extends BaseObject {
  constructor(source, loader, w, h) {
    super()
    this.source = source
    this.frames = []
    this.loop = true
    this.currentFrame = 0
    this.loader = loader
    this.width = w
    this.height = h
    this.x = 0
    this.y = 0
    this.setTexture(source)

    // state player
    this.frameCounter = 0
    this.numberOfFrames = 0
    this.startFrame = 0
    this.endFrame = 0
    this.timerInterval = undefined
    this.playing = false
  }

  setTexture(source) {
    if (!source.image) {
      if (!Array.isArray(source)) {
        this.tilesetFrame = this.loader.assets[source]
        this.source = this.tilesetFrame.source
        this.sourceX = this.tilesetFrame.frame.x
        this.sourceY = this.tilesetFrame.frame.y
        this.width = this.tilesetFrame.frame.w
        this.height = this.tilesetFrame.frame.h
        this.sourceWidth = this.tilesetFrame.frame.w
        this.sourceHeight = this.tilesetFrame.frame.h
      } else {
        this.frames = source
        this.source = this.loader.assets[source[0]].source
        this.sourceX = this.loader.assets[source[0]].frame.x
        this.sourceY = this.loader.assets[source[0]].frame.y
        this.width = this.loader.assets[source[0]].frame.w
        this.height = this.loader.assets[source[0]].frame.h
        this.sourceWidth = this.loader.assets[source[0]].frame.w
        this.sourceHeight = this.loader.assets[source[0]].frame.h
      }
    } else if (source.image) {
      if (source.data) {
        this.source = this.loader.assets[source.image].source
        this.frames = source.data
        this.sourceX = this.frames[0][0]
        this.sourceY = this.frames[0][1]
        this.width = source.width
        this.height = source.height
        this.sourceWidth = source.width
        this.sourceHeight = source.height
      } else {
        this.source = this.loader.assets[source.image].source
        this.sourceX = source.x
        this.sourceY = source.y
        this.width = source.width
        this.height = source.height
        this.sourceWidth = source.width
        this.sourceHeight = source.height
      }
    }
  }

  gotoAndStop(frameNumber) {
    if (this.frames.length > 0) {
      if (Array.isArray(this.frames[0])) {
        this.sourceX = this.frames[frameNumber][0]
        this.sourceY = this.frames[frameNumber][1]
      } else if (this.loader.assets[this.frames[frameNumber]].frame) {
        this.source = this.loader.assets[this.frames[frameNumber]].source
        this.sourceX = this.loader.assets[this.frames[frameNumber]].frame.x
        this.sourceY = this.loader.assets[this.frames[frameNumber]].frame.y
        this.sourceWidth = this.loader.assets[this.frames[frameNumber]].frame.w
        this.sourceHeight = this.loader.assets[this.frames[frameNumber]].frame.h
        this.width = this.loader.assets[this.frames[frameNumber]].frame.w
        this.height = this.loader.assets[this.frames[frameNumber]].frame.h
      }
      this.currentFrame = frameNumber
    } else {
      throw new Error("Frame number " + frameNumber + "doesn't exist")
    }
  }

  // state player
  show(frameNumber) {
    this.reset()
    if (typeof frameNumber === 'number') {
      this.gotoAndStop(frameNumber)
    } else {
      this.gotoAndStop(this.frames.indexOf(frameNumber))
    }
  }

  play() {
    this.playSequence([0, this.frames.length - 1])
  }

  playSequence(sequenceArray) {
    this.reset()
    this.startFrame = sequenceArray[0]
    this.endFrame = sequenceArray[1]
    this.numberOfFrames = endFrame - startFrame
    if (startFrame === 0) {
      this.numberOfFrames += 1
      this.frameCounter += 1
    }
    if (numberOfFrames === 1) {
      this.numberOfFrames = 2
      this.frameCounter += 1
    }

    if (!this.fps) this.fps = 12
    const frameRate = 1000 / this.fps

    this.gotoAndStop(this.startFrame)

    if (!this.playing) {
      this.timerInterval = setInterval(this.advanceFrame.bind(this), frameRate)
      this.playing = true
    }
  }

  advanceFrame() {
    if (this.frameCounter < this.numberOfFrames) {
      this.gotoAndStop(this.currentFrame + 1)
      this.frameCounter += 1
    } else {
      if (this.loop) {
        this.gotoAndStop(startFrame)
        this.frameCounter = 1
      }
    }
  }

  stop() {
    this.reset()
    this.gotoAndStop(this.currentFrame)
  }

  reset() {
    if (this.timerInterval !== undefined && this.playing === true) {
      this.playing = false
      this.frameCounter = 0
      this.startFrame = 0
      this.endFrame = 0
      this.numberOfFrames = 0
      clearInterval(this.timerInterval)
    }
  }

  canvasRender(ctx) {
    ctx.drawImage(
      this.source,
      this.sourceX, 
      this.sourceY,
      this.sourceWidth, 
      this.sourceHeight, 
      -this.width * this.pivotX, 
      -this.height * this.pivotY,
      this.width, 
      this.height
    )
  }
} 