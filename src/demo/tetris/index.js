import Scene from '../../scene/dom'
import { Rectangle } from '../../shape'
import Thing from '../../thing'
import Move from '../../move'
import { Seven } from './shapes'

window.onload = () => {
  const scene = new Scene({ width: 400, height: 500 })
  scene.build()

  const position = { x: 100, y: 100 }
  const shape = new Seven({
    width: 50,
    height: 70,
    color: 'green'
  })
  const move = new Move({
    orientation: 'down',
    speed: 50
  })
  const thing = new Thing({ position, shape, move })

  scene.add(thing)

  document.body.appendChild(scene.domNode)

  const fps = document.createElement('span')
  setInterval(() => {
    console.log(scene.frames)
    fps.innerText = 'fps: ' + scene.fps
  }, 1000)
  document.body.appendChild(fps)

  scene.startLoop()
}
