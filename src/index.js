import Scene from './scene/dom'

window.onload = () => {
  const scene = new Scene({ width: 600, height: 600 })
  scene.build()
  document.body.appendChild(scene.domNode)
}
