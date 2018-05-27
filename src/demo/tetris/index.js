import Scene from '../../scene/dom'
import { Rectangle } from '../../shape'
import Thing from '../../thing'
import Move from '../../move'
import { Seven, Tian, Stick } from './shapes'

const colors = ['green', 'blue', 'red', 'pink', 'yellow', 'orange', 'gray']
const shapes = [Seven, Tian, Stick]

function randomInt (num) {
  return Math.floor(Math.random() * num)
}

function randomThing () {
  const shape = new shapes[randomInt(shapes.length)]({ color: colors[randomInt(colors.length)] })
  const position = { x: Math.random() * (400 - shape.width), y: 0 }
  const orientation = 270
  const move = new Move({ orientation, speed: 200 })
  const thing = new Thing({ position, shape, move })

  return thing
}

window.onload = () => {
  const scene = new Scene({ width: 400, height: 500 })
  scene.build()

  let currentThing = randomThing()
  scene.add(currentThing)

  document.body.appendChild(scene.domNode)

  scene.startLoop()

  const finished = {}
  scene.on('edge', ({ target }) => {
    if (finished[target.id]) {
      return
    }
    
    target.orientation = 270
    finished[target.id] = true
    currentThing = randomThing()
    scene.add(currentThing)
  })

  window.addEventListener('keydown', (evt) => {
    switch (evt.which) {
      case 37:
        currentThing.orientation = 210
        break
      case 39:
        currentThing.orientation = 330
        break
      case 40:
        currentThing.speed = 10000000000
        break
    }
  })

  window.addEventListener('keyup', (evt) => {
    switch (evt.which) {
      case 37:
      case 39:
        currentThing.orientation = 270
        break;
    }
  })

  const fps = document.createElement('span')
  setInterval(() => {
    fps.innerText = 'fps: ' + scene.fps
  }, 1000)
  document.body.appendChild(fps)
}
