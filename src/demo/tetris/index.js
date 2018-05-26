import Scene from '../../scene/dom'
import { Rectangle } from '../../shape'
import Thing from '../../thing'
import Move from '../../move'
import { Seven, Tian } from './shapes'

const colors = ['green', 'blue', 'red', 'pink', 'yellow', 'orange', 'gray']
const shapes = [Seven, Tian]

function randomInt (num) {
  return Math.floor(Math.random() * num)
}

function randomThing () {
  const shape = new shapes[randomInt(2)]({ color: colors[randomInt(7)] })
  const position = { x: Math.random() * (400 - shape.width), y: 0 }
  const move = new Move({ orientation: 'down', speed: 200 })
  const thing = new Thing({ position, shape, move })

  return thing
}

window.onload = () => {
  const scene = new Scene({ width: 400, height: 500 })
  scene.build()

  scene.add(randomThing())

  document.body.appendChild(scene.domNode)

  scene.startLoop()

  const finished = {}
  scene.on('edge', ({ target }) => {
    console.log(target)
    if (finished[target.id]) {
      return
    }
    
    finished[target.id] = true
    scene.add(randomThing())
  })

  const fps = document.createElement('span')
  setInterval(() => {
    fps.innerText = 'fps: ' + scene.fps
  }, 1000)
  document.body.appendChild(fps)
}
