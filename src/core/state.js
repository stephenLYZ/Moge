export default class State {
  constructor() {
    this.stateMap = {
      load: undefined,
      setup: undefined
    }
    this.currentState = undefined
  }

  add(name, handle) {
    this.stateMap[name] = handle
  }

  remove(name) {
    delete this.stateMap[name]
  }

  start(name) {
    if (this.stateMap[name]) {
      this.currentState = name
    } else {
      throw new Error('no handle of this state ' + name)
    }
  }
}