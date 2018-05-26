import Scene from '../../scene/dom'
import { Rectangle } from '../../shape'
import { Seven } from './shapes'

window.onload = () => {
  const scene = new Scene({ width: 600, height: 600 })
  scene.build()

  const shape = new Seven({
    width: 50,
    height: 70,
    color: 'green'
  })
  scene.render({ x: 100, y: 100 }, shape)

  document.body.appendChild(scene.domNode)
}
