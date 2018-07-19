
export const imageExtensions = ["png", "jpg", "gif", "webp"]
export const fontExtensions = ["ttf", "otf", "ttc", "woff"]
export const audioExtensions = ["mp3", "ogg", "wav", "webm"]
export const jsonExtensions = ["json"]

export default class Loader {
  constructor() {
    this.toLoad = 0
    this.loaded = 0
    this.assets = []
    this.loadedFunction = undefined
  }

  load(sources) {
    console.log("Loading assets...")
    this.toLoad = sources.length
    sources.forEach((source) => {
      let extension = source.split('.').pop()

      // Load Image
      if (imageExtensions.indexOf(extension) > -1) {
        let image = new Image()
        image.onLoad = () => {
          image.name = source
          this.assets[image.name] = {
            source: image,
            frame: {
              x: 0,
              y: 0,
              w: image.width,
              h: image.height
            }
          }
          this.loadHandler()
        }
        image.src = source
      } else if (fontExtensions.indexOf(extension) > -1) {
        let fontFamily = source.split("/").pop().split(".")[0]
        let newStyle = document.createElement('style')
        let fontFace = "@font-face {font-family: '" + fontFamily + "'; src: url('" + source + "');}"

        newStyle.appendChild(document.createTextNode(fontFace))
        document.head.appendChild(newStyle)
        this.loadHandler()
      } else if (audioExtensions.indexOf(extension) > -1) {
        // Todo
      } else if (jsonExtensions.indexOf(extension) > -1) {
        // Todo
      } else {
        throw new Error('File type not recognized: ' + source)
      }
    })
  }

  loadHandler() {
    this.loaded += 1
    if (this.toLoad === this.loaded) {
      this.toLoad = 0
      this.loaded = 0
      this.loadedFunction()
    }
  }
}