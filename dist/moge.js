(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Moge"] = factory();
	else
		root["Moge"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/collision.js":
/*!*******************************!*\
  !*** ./src/core/collision.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nclass Collision {\n  constructor() {}\n\n  /**\n   * An universal collision method that works for rectangular and circular sprites.\n   * @param {*} a \n   * @param {*} b \n   * @param {*} react \n   * @param {*} bounce \n   * @param {*} global \n   * @param {*} extra \n   */\n  hit(a, b, react, bounce, global, extra) {\n    let collision;\n  }\n\n  // Boundary collisions\n  /**\n   * outsideBounds\n   * @param {*} s\n   * @param {*} bounds \n   * @param {*} extra \n   */\n  outsideBounds(s, bounds, extra) {\n    let x = bounds.x;\n    let y = bounds.y;\n    let width = bounds.width;\n    let height = bounds.height;\n    let collision;\n    if (s.x < x - s.width) collision = \"left\";\n    if (s.y < y - s.height) collision = \"top\";\n    if (s.x > width) collision = \"right\";\n    if (s.y > height) collision = \"bottom\";\n    if (collision && extra) extra(collision);\n    return collision;\n  }\n\n  /**\n   * outsideBounds\n   * @param {*} s\n   * @param {*} bounds\n   * @param {*} bounce \n   * @param {*} extra \n   */\n  contain(s, bounds, bounce = false, extra) {\n    let x = bounds.x;\n    let y = bounds.y;\n    let width = bounds.width;\n    let height = bounds.height;\n    let collision = undefined;\n    if (s.x < x) {\n      if (bounce) s.vx *= -1;\n      if (s.mass) s.vx /= s.mass;\n      s.x = x;\n      collision = \"left\";\n    }\n    if (s.y < y) {\n      if (bounce) s.vy *= -1;\n      if (s.mass) s.vy /= s.mass;\n      s.y = y;\n      collision = \"top\";\n    }\n    if (s.x + s.width > width) {\n      if (bounce) s.vx *= -1;\n      if (s.mass) s.vx /= s.mass;\n      s.x = width - s.width;\n      collision = \"right\";\n    }\n    if (s.y + s.height > height) {\n      if (bounce) s.vy *= -1;\n      if (s.mass) s.vy /= s.mass;\n      s.y = height - s.height;\n      collision = \"bottom\";\n    }\n    if (collision && extra) extra(collision);\n    return collision;\n  }\n  // Shape collisions\n\n  /**\n   * hitTestPoint 判断点是否和圆形或者矩形碰撞\n   * @param {*} point  An object with `x` and `y` properties\n   * @param {*} sprite A sprite object with `x`, `y`, `centerX` and `centerY` properties\n   * @returns {boolean}\n   */\n  hitTestPoint(point, sprite) {\n    let shape = sprite.radius ? \"circle\" : \"rectangle\";\n    let hit = false;\n    if (shape === \"circle\") {\n      let vx = point.x - sprite.centerX;\n      let vy = point.y - sprite.centerY;\n      let magnitude = Math.sqrt(vx * vx + vy * vy);\n      hit = magnitude < sprite.radius;\n    } else {\n      let left = sprite.x;\n      let right = sprite.x + sprite.width;\n      let top = sprite.y;\n      let bottom = sprite.y + sprite.height;\n      hit = point.x > left && point.x < right && point.y > top && point.y < bottom;\n    }\n    return hit;\n  }\n\n  /**\n   * hitTestCircle 判断圆形与圆形碰撞\n   * @param {*} c1 A sprite object with `centerX`, `centerY` and `radius` properties.\n   * @param {*} c2 A sprite object with `centerX`, `centerY` and `radius` properties.\n   * @param {*} global \n   */\n  hitTestCircle(c1, c2, global = false) {\n    let vx,\n        vy,\n        hit = false;\n    if (global) {\n      vx = c2.gx + c2.radius - (c1.gx + c1.radius);\n      vy = c2.gy + c2.radius - (c1.gy + c1.radius);\n    } else {\n      vx = c2.centerX - c1.centerX;\n      vy = c2.centerY - c1.centerY;\n    }\n    let magnitude = Math.sqrt(vx * vx + vy * vy);\n    let totalRadius = c1.radius + c2.radius;\n    hit = magnitude < totalRadius;\n    return hit;\n  }\n\n  /**\n   * hitTestRectangle 判断两矩形是否碰撞\n   * @param {*} r1 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.\n   * @param {*} r2 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.\n   * @param {*} global \n   */\n  hitTestRectangle(r1, r2, global = false) {\n    let vx,\n        vy,\n        hit = false;\n    if (global) {\n      vx = r2.gx + r2.halfWidth - (r1.gx + r1.halfWidth);\n      vy = r2.gy + r2.halfHeight - (r1.gy + r1.halfHeight);\n    } else {\n      vx = r2.centerX - r1.centerX;\n      vy = r2.centerY - r1.centerY;\n    }\n    let combinedHalfWidths = r1.halfWidth + r2.halfWidth;\n    let combinedHalfHeights = r1.halfHeight + r2.halfHeight;\n    if (Math.abs(vx) < combinedHalfWidths) {\n      if (Math.abs(vy) < combinedHalfHeights) {\n        hit = true;\n      } else {\n        hit = false;\n      }\n    } else {\n      hit = false;\n    }\n    return hit;\n  }\n\n  /**\n   * hitTestCircleRectangle 判断圆形是否和矩形碰撞\n   * @param {*} c1 A sprite object with `centerX`, `centerY` and `radius` properties.\n   * @param {*} r1 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.\n   * @param {*} global \n   */\n  hitTestCircleRectangle(c1, r1, global) {\n    let c1x,\n        c1y,\n        r1x,\n        r1y,\n        region = undefined,\n        collision = undefined;\n    if (global) {\n      c1x = c1.gx;\n      c1y = c1.gy;\n      r1x = r1.gx;\n      r1y = r1.gy;\n    } else {\n      c1x = c1.x;\n      c1y = c1.y;\n      r1x = r1.x;\n      r1y = r1.y;\n    }\n    if (c1y < r1y - r1.halfHeight) {\n      if (c1x < r1x - 1 - r1.halfWidth) {\n        region = \"topLeft\";\n      } else if (c1x > r1x + 1 + r1.halfWidth) {\n        region = \"topRight\";\n      } else {\n        region = \"topMiddle\";\n      }\n    } else if (c1y > r1y + r1.halfHeight) {\n      if (c1x < r1x - 1 - r1.halfWidth) {\n        region = \"bottomLeft\";\n      } else if (c1x > r1x + 1 + r1.halfWidth) {\n        region = \"bottomRight\";\n      } else {\n        region = \"bottomMiddle\";\n      }\n    } else {\n      if (c1x < r1x - r1.halfWidth) {\n        region = \"leftMiddle\";\n      } else {\n        region = \"rightMiddle\";\n      }\n    }\n    if (region === \"topMiddle\" || region === \"bottomMiddle\" || region === \"leftMiddle\" || region === \"rightMiddle\") {\n      collision = this.hitTestRectangle(c1, r1, global);\n    } else {\n      let point = {};\n      switch (region) {\n        case \"topLeft\":\n          point.x = r1x;\n          point.y = r1y;\n          break;\n        case \"topRight\":\n          point.x = r1x + r1.width;\n          point.y = r1y;\n          break;\n        case \"bottomLeft\":\n          point.x = r1x;\n          point.y = r1y + r1.height;\n          break;\n        case \"bottomRight\":\n          point.x = r1x + r1.width;\n          point.y = r1y + r1.height;\n      }\n      collision = this.hitTestCirclePoint(c1, point, global);\n    }\n    if (collision) {\n      return region;\n    } else {\n      return collision;\n    }\n  }\n}\nexports.default = Collision;\n\n//# sourceURL=webpack://Moge/./src/core/collision.js?");

/***/ }),

/***/ "./src/core/keyboard.js":
/*!******************************!*\
  !*** ./src/core/keyboard.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nclass Keyboard {\n  constructor() {\n    this.keyDown = false;\n    this.keyUp = true;\n  }\n\n  on(name, handler) {\n    if (name === 'keydown') {\n      document.body.addEventListener(\"keydown\", handler.bind(this), false);\n    } else if (name === 'keyup') {\n      document.body.addEventListener(\"keyup\", handler.bind(this), false);\n    }\n  }\n}\n\nexports.default = Keyboard;\nKeyboard.KeyMap = {\n  leftArrow: 37,\n  upArrow: 38,\n  rightArrow: 39,\n  downArrow: 40,\n  space: 32\n};\n\n//# sourceURL=webpack://Moge/./src/core/keyboard.js?");

/***/ }),

/***/ "./src/core/loader.js":
/*!****************************!*\
  !*** ./src/core/loader.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconst imageExtensions = exports.imageExtensions = [\"png\", \"jpg\", \"gif\", \"webp\"];\nconst fontExtensions = exports.fontExtensions = [\"ttf\", \"otf\", \"ttc\", \"woff\"];\nconst audioExtensions = exports.audioExtensions = [\"mp3\", \"ogg\", \"wav\", \"webm\"];\nconst jsonExtensions = exports.jsonExtensions = [\"json\"];\n\nclass Loader {\n  constructor() {\n    this.toLoad = 0;\n    this.loaded = 0;\n    this.assets = [];\n    this.loadedFunction = undefined;\n  }\n\n  load(sources) {\n    console.log(\"Loading assets...\");\n    this.toLoad = sources.length;\n    sources.forEach(source => {\n      let extension = source.split('.').pop();\n\n      // Load Image\n      if (imageExtensions.indexOf(extension) > -1) {\n        let image = new Image();\n        image.onLoad = () => {\n          image.name = source;\n          this.assets[image.name] = {\n            source: image,\n            frame: {\n              x: 0,\n              y: 0,\n              w: image.width,\n              h: image.height\n            }\n          };\n          this.loadHandler();\n        };\n        image.src = source;\n      } else if (fontExtensions.indexOf(extension) > -1) {\n        let fontFamily = source.split(\"/\").pop().split(\".\")[0];\n        let newStyle = document.createElement('style');\n        let fontFace = \"@font-face {font-family: '\" + fontFamily + \"'; src: url('\" + source + \"');}\";\n\n        newStyle.appendChild(document.createTextNode(fontFace));\n        document.head.appendChild(newStyle);\n        this.loadHandler();\n      } else if (audioExtensions.indexOf(extension) > -1) {\n        // Todo\n      } else if (jsonExtensions.indexOf(extension) > -1) {\n        // Todo\n      } else {\n        throw new Error('File type not recognized: ' + source);\n      }\n    });\n  }\n\n  loadHandler() {\n    this.loaded += 1;\n    if (this.toLoad === this.loaded) {\n      this.toLoad = 0;\n      this.loaded = 0;\n      this.loadedFunction && this.loadedFunction();\n    }\n  }\n}\nexports.default = Loader;\n\n//# sourceURL=webpack://Moge/./src/core/loader.js?");

/***/ }),

/***/ "./src/core/moge.js":
/*!**************************!*\
  !*** ./src/core/moge.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = undefined;\n\nvar _canvas = __webpack_require__(/*! ../renderers/canvas */ \"./src/renderers/canvas.js\");\n\nvar _canvas2 = _interopRequireDefault(_canvas);\n\nvar _dom = __webpack_require__(/*! ../renderers/dom */ \"./src/renderers/dom.js\");\n\nvar _dom2 = _interopRequireDefault(_dom);\n\nvar _table = __webpack_require__(/*! ../renderers/table */ \"./src/renderers/table.js\");\n\nvar _table2 = _interopRequireDefault(_table);\n\nvar _state = __webpack_require__(/*! ./state */ \"./src/core/state.js\");\n\nvar _state2 = _interopRequireDefault(_state);\n\nvar _loader = __webpack_require__(/*! ./loader */ \"./src/core/loader.js\");\n\nvar _loader2 = _interopRequireDefault(_loader);\n\nvar _keyboard = __webpack_require__(/*! ./keyboard */ \"./src/core/keyboard.js\");\n\nvar _keyboard2 = _interopRequireDefault(_keyboard);\n\nvar _collision = __webpack_require__(/*! ./collision */ \"./src/core/collision.js\");\n\nvar _collision2 = _interopRequireDefault(_collision);\n\nvar _index = __webpack_require__(/*! ../sprites/index */ \"./src/sprites/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Moge {\n  constructor(width = 50, height = 50, renderer = 'canvas', assetFilePaths) {\n    this.state = new _state2.default();\n    this.loader = new _loader2.default();\n    // this.keyboard = new Keyboard()\n\n    this.buttons = [];\n    this.pause = false;\n    this.draggableSprites = [];\n    this.dragAndDrop = false;\n    this.tweens = [];\n\n    this._fps = 60;\n    this._startTime = Date.now();\n    this._frameDuration = 1000 / this._fps;\n    this._lag = 0;\n\n    this.canvasRenderer = new _canvas2.default(width, height);\n    this.domRenderer = new _dom2.default(width, height);\n    this.tableRenderer = new _table2.default(width, height);\n    this.renderer = this.createRenderer(renderer);\n    this.assetFilePaths = assetFilePaths;\n\n    this.interpolate = true;\n    this.scale = 1;\n\n    this.updateFunctions = [];\n\n    // stage is the parent of all the other sprites and groups.\n    this.stage = new _index.Stage();\n  }\n\n  start() {\n    if (!this.state.stateMap.setup) {\n      throw new Error('Please supply the setup state function');\n    }\n    if (this.assetFilePaths) {\n      this.loader.loadedFunction = () => {\n        this.state.currentState = undefined;\n        this.state.start('setup');\n      };\n      this.loader.load(this.assetFilePaths);\n      if (this.state.stateMap.load) {\n        this.state.start('load');\n      }\n    } else {\n      this.state.start('setup');\n    }\n\n    //Start the game loop\n    gameLoop();\n  }\n\n  pause() {\n    this.pause = true;\n  }\n\n  resume() {\n    this.pause = false;\n  }\n\n  update() {\n    if (this.state.currentState && !this.pause) {\n      this.state.stateMap[this.state.currentState].call(this);\n    }\n    if (this.updateFunctions.length !== 0) {\n      for (let l = 0; l < this.updateFunctions.length; l++) {\n        this.updateFunctions[l].call(this);\n      }\n    }\n  }\n\n  gameLoop() {\n    requestAnimationFrame(gameLoop);\n    let current = Date.now();\n    let elapsed = current - this._startTime;\n    if (elapsed > 1000) elapsed = this._frameDuration;\n    this._startTime = current;\n    this._lag += elapsed;\n\n    while (this._lag >= this._frameDuration) {\n      this.capturePreviousSpritePositions();\n      this.update();\n      this._lag -= this._frameDuration;\n    }\n\n    let lagOffset = this._lag / this._frameDuration;\n    this.renderer.render(this.stage, lagOffset);\n  }\n\n  capturePreviousSpritePositions() {\n    this.stage.children.forEach(sprite => {\n      setPosition(sprite);\n    });\n\n    function setPosition(sprite) {\n      sprite._previousX = sprite.x;\n      sprite._previousY = sprite.y;\n      if (sprite.children && sprite.children.length > 0) {\n        sprite.children.forEach(child => {\n          setPosition(child);\n        });\n      }\n    }\n  }\n\n  createRenderer(r) {\n    let renderer;\n    switch (r) {\n      case 'canvas':\n        renderer = this.canvasRenderer;\n        break;\n      case 'dom':\n        renderer = this.domRenderer;\n        break;\n      case 'table':\n        renderer = this.tableRenderer;\n        break;\n      default:\n        throw new Error('no such this renderer!');\n    }\n    return renderer;\n  }\n\n  circle(radius, fillStyle, strokeStyle, lineWidth, x, y) {\n    let circle = new _index.Circle(radius, fillStyle, strokeStyle, lineWidth, x, y);\n    this.stage.addChild(circle);\n    return circle;\n  }\n\n  rectangle(width, height, fillStyle, strokeStyle, lineWidth, x, y) {\n    let rectangle = new _index.Rectangle(width, height, fillStyle, strokeStyle, lineWidth, x, y);\n    this.stage.addChild(rectangle);\n    return rectangle;\n  }\n\n  line(strokeStyle, lineWidth, x1, y1, x2, y2) {\n    let line = new _index.Line(strokeStyle, lineWidth, x1, y1, x2, y2);\n    this.stage.addChild(line);\n    return line;\n  }\n\n  text(content, font, fillStyle, x, y) {\n    let text = new _index.Text(content, font, fillStyle, x, y);\n    this.stage.addChild(text);\n    return text;\n  }\n\n  group(...sprites) {\n    let group = new _index.Group(sprites);\n    this.stage.addChild(group);\n    return group;\n  }\n\n  remove() {}\n}\n\nexports.default = Moge;\n\n//# sourceURL=webpack://Moge/./src/core/moge.js?");

/***/ }),

/***/ "./src/core/state.js":
/*!***************************!*\
  !*** ./src/core/state.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nclass State {\n  constructor() {\n    this.stateMap = {\n      load: undefined,\n      setup: undefined\n    };\n    this.currentState = undefined;\n  }\n\n  add(name, handle) {\n    this.stateMap[name] = handle;\n  }\n\n  remove(name) {\n    delete this.stateMap[name];\n  }\n\n  start(name) {\n    if (this.stateMap[name]) {\n      this.currentState = name;\n    } else {\n      throw new Error('no handle of this state ' + name);\n    }\n  }\n}\nexports.default = State;\n\n//# sourceURL=webpack://Moge/./src/core/state.js?");

/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconst byLayer = exports.byLayer = (a, b) => {\n  if (a.layer < b.layer) {\n    return -1;\n  } else if (a.layer > b.layer) {\n    return 1;\n  } else {\n    return 1;\n  }\n};\n\n//# sourceURL=webpack://Moge/./src/helpers/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _moge = __webpack_require__(/*! ./core/moge */ \"./src/core/moge.js\");\n\nvar _moge2 = _interopRequireDefault(_moge);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nwindow.Moge = _moge2.default;\n\n//# sourceURL=webpack://Moge/./src/index.js?");

/***/ }),

/***/ "./src/renderers/canvas.js":
/*!*********************************!*\
  !*** ./src/renderers/canvas.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nclass CanvasRenderer {\n  constructor(width, height) {\n    this.dips = 1; // window.devicePixelRatio\n    this.canvas = document.createElement('canvas');\n    this.canvas.setAttribute('width', width * dips);\n    this.canvas.setAttribute('height', height * dips);\n    this.canvas.style.backgroundColor = \"black\";\n    document.body.appendChild(this.canvas);\n    this.ctx = this.canvas.getContext('2d');\n  }\n\n  render(stage, lagOffset) {\n    // clear Canvas\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    stage.children.forEach(sprite => {\n      this.displaySprite(sprite);\n    });\n  }\n\n  displaySprite(sprite) {\n    if (sprite.visible && sprite.gx < this.canvas.width + sprite.width && sprite.gx + sprite.width >= -sprite.width && sprite.gy < this.canvas.height + sprite.height && sprite.gy + sprite.height >= -sprite.height) {\n\n      this.ctx.save();\n      if (sprite._previousX) {\n        sprite.renderX = (sprite.x - sprite._previousX) * lagOffset + sprite._previousX;\n      } else {\n        sprite.renderX = sprite.x;\n      }\n      if (sprite._previousy) {\n        sprite.renderY = (sprite.y - sprite._previousY) * lagOffset + sprite._previousY;\n      } else {\n        sprite.renderY = sprite.y;\n      }\n      this.ctx.translate(sprite.renderX + sprite.width * sprite.pivotX, sprite.renderY + sprite.height * sprite.pivotY);\n      this.ctx.globalAlpha = sprite.alpha;\n      this.ctx.rotate(sprite.rotation);\n      this.ctx.scale(sprite.scaleX, sprite.scaleY);\n      if (sprite.shadow) {\n        this.ctx.shadowColor = sprite.shadowColor;\n        this.ctx.shadowOffsetX = sprite.shadowOffsetX;\n        this.ctx.shadowOffsetY = sprite.shadowOffsetY;\n        this.ctx.shadowBlur = sprite.shadowBlur;\n      }\n      if (sprite.blendMode) this.ctx.globalCompositeOperation = sprite.blendMode;\n      if (sprite.render) sprite.canvasRender(this.ctx);\n      if (sprite.children && sprite.children.length > 0) {\n        this.ctx.translate(-sprite.width * sprite.pivotX, -sprite.height * sprite.pivotY);\n        sprite.children.forEach(child => {\n          this.displaySprite(child);\n        });\n      }\n      this.ctx.restore();\n    }\n  }\n}\n\nexports.default = CanvasRenderer;\n\n//# sourceURL=webpack://Moge/./src/renderers/canvas.js?");

/***/ }),

/***/ "./src/renderers/dom.js":
/*!******************************!*\
  !*** ./src/renderers/dom.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nclass DomRenderer {}\n\nexports.default = DomRenderer;\n\n//# sourceURL=webpack://Moge/./src/renderers/dom.js?");

/***/ }),

/***/ "./src/renderers/table.js":
/*!********************************!*\
  !*** ./src/renderers/table.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nclass TableRenderer {}\n\nexports.default = TableRenderer;\n\n//# sourceURL=webpack://Moge/./src/renderers/table.js?");

/***/ }),

/***/ "./src/sprites/baseObject.js":
/*!***********************************!*\
  !*** ./src/sprites/baseObject.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _helpers = __webpack_require__(/*! ../helpers */ \"./src/helpers/index.js\");\n\nclass BaseObject {\n  constructor() {\n    this.x = 0;\n    this.y = 0;\n\n    this.vx = 0;\n    this.vy = 0;\n\n    this.width = 0;\n    this.height = 0;\n\n    this.scaleX = 1;\n    this.scaleY = 1;\n\n    this.pivotX = 0.5;\n    this.pivotY = 0.5;\n\n    this.rotation = 0;\n    this.visible = true;\n    this.mask = false;\n\n    this.parent = undefined;\n\n    this.isStage = false;\n\n    this.shadow = false;\n    this.shadowColor = \"rgba(100, 100, 100, 0.5)\";\n    this.shadowOffsetX = 3;\n    this.shadowOffsetY = 3;\n    this.shadowBlur = 3;\n    this.blendMode = undefined;\n    this._alpha = 1;\n    this._draggable = undefined;\n\n    this._layer = 0;\n    this._previousX = undefined;\n    this._previousY = undefined;\n    this.children = [];\n  }\n\n  addChild(sprite) {\n    if (sprite.parent) {\n      sprite.parent.removeChild(sprite);\n    }\n    sprite.parent = this;\n    this.children.push(sprite);\n  }\n\n  removeChild(sprite) {\n    if (sprite.parent === this) {\n      this.children.splice(this.children.indexOf(sprite), 1);\n    } else {\n      throw new Error(sprite + \" is not a child of \" + this);\n    }\n  }\n\n  swapChildren(child1, child2) {\n    let index1 = this.children.indexOf(child1);\n    let index2 = this.children.indexOf(child2);\n    if (index1 !== -1 && index2 !== -1) {\n      child1.childIndex = index2;\n      child2.childIndex = index1;\n\n      this.children[index1] = child2;\n      this.children[index2] = child1;\n    } else {\n      throw new Error('Both objects must be a child of ' + this);\n    }\n  }\n\n  add(...sprites) {\n    if (sprites.length > 1) {\n      sprites.forEach(sprite => {\n        this.addChild(sprite);\n      });\n    } else {\n      this.addChild(sprites[0]);\n    }\n  }\n\n  remove(...sprites) {\n    if (sprites.length > 1) {\n      sprites.forEach(sprite => {\n        this.removeChild(sprite);\n      });\n    } else {\n      this.removeChild(sprites[0]);\n    }\n  }\n\n  setPosition(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  putCenter(b, xOffset = 0, yOffset = 0) {\n    b.x = this.x + this.halfWidth - b.halfWidth + xOffset;\n    b.y = this.y + this.halfHeight - b.halfHeight + yOffset;\n\n    this.compensateForParentPosition(this, b);\n  }\n\n  putTop(b, xOffset = 0, yOffset = 0) {\n    b.x = this.x + this.halfWidth - b.halfWidth + xOffset;\n    b.y = this.y - b.height + yOffset;\n\n    this.compensateForParentPosition(this, b);\n  }\n\n  putRight(b, xOffset = 0, yOffset = 0) {\n    b.x = this.x + this.width + xOffset;\n    b.y = this.y + this.halfHeight - b.halfHeight + yOffset;\n\n    this.compensateForParentPosition(this, b);\n  }\n\n  putBottom(b, xOffset = 0, yOffset = 0) {\n    b.x = this.x + this.halfWidth - b.halfWidth + xOffset;\n    b.y = this.y + this.height + yOffset;\n\n    this.compensateForParentPosition(this, b);\n  }\n\n  putLeft(b, xOffset = 0, yOffset = 0) {\n    b.x = this.x - b.width + xOffset;\n    b.y = this.y + this.halfHeight - b.halfHeight + yOffset;\n\n    this.compensateForParentPosition(this, b);\n  }\n\n  compensateForParentPosition(a, b) {\n    if (b.parent.gx !== 0 || b.parent.gy !== 0) {\n      b.x -= a.gx;\n      b.y -= a.gy;\n    }\n  }\n\n  // render in different renderers\n  canvasRender(ctx) {}\n\n  domRender() {}\n\n  tableRender() {}\n\n  // getter/setter\n  get gx() {\n    if (this.parent) {\n      return this.x + this.parent.gx;\n    } else {\n      return this.x;\n    }\n  }\n\n  get gy() {\n    if (this.parent) {\n      return this.y + this.parent.gx;\n    } else {\n      return this.y;\n    }\n  }\n\n  get position() {\n    return {\n      x: this.x,\n      y: this.y\n    };\n  }\n\n  get alpha() {\n    return this.parent._alpha * this._alpha;\n  }\n\n  set alpha(value) {\n    this._alpha = value;\n  }\n\n  get halfHeight() {\n    return this.height / 2;\n  }\n\n  get halfWidth() {\n    return this.width / 2;\n  }\n\n  get centerX() {\n    return this.x + this.halfWidth;\n  }\n\n  get centerY() {\n    return this.y + this.halfHeight;\n  }\n\n  get layer() {\n    return this._layer;\n  }\n\n  set layer(value) {\n    this._layer = value;\n    this.parent.children.sort(_helpers.byLayer);\n  }\n\n  get draggable() {\n    return this._draggable;\n  }\n\n  set draggable(value) {}\n\n  get localBounds() {\n    return {\n      x: 0,\n      y: 0,\n      width: this.width,\n      height: this.height\n    };\n  }\n\n  get globalBounds() {\n    return {\n      x: this.gx,\n      y: this.gy,\n      width: this.gx + this.width,\n      height: this.gy + this.height\n    };\n  }\n\n  get empty() {\n    if (this.children.length === 0) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n}\nexports.default = BaseObject;\n\n//# sourceURL=webpack://Moge/./src/sprites/baseObject.js?");

/***/ }),

/***/ "./src/sprites/circle.js":
/*!*******************************!*\
  !*** ./src/sprites/circle.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _baseObject = __webpack_require__(/*! ./baseObject */ \"./src/sprites/baseObject.js\");\n\nvar _baseObject2 = _interopRequireDefault(_baseObject);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Circle extends _baseObject2.default {\n  constructor(radius = 15, fillStyle = \"red\", strokeStyle = \"none\", lineWidth = 0, x = 0, y = 0) {\n    super();\n    this.circle = true;\n    this.radius = radius;\n    this.width = this.radius * 2;\n    this.height = this.radius * 2;\n  }\n\n  canvasRender(ctx) {\n    ctx.strokeStyle = this.strokeStyle;\n    ctx.lineWidth = this.lineWidth;\n    ctx.fillStyle = this.fillStyle;\n    ctx.beginPath();\n    ctx.arc(this.radius + -this.diameter * this.pivotX, this.radius + -this.diameter * this.pivotY, this.radius, 0, 2 * Math.PI, false);\n    if (this.mask === true) {\n      ctx.clip();\n    } else {\n      if (this.strokeStyle !== \"none\") ctx.stroke();\n      if (this.fillStyle !== \"none\") ctx.fill();\n    }\n  }\n}\nexports.default = Circle;\n\n//# sourceURL=webpack://Moge/./src/sprites/circle.js?");

/***/ }),

/***/ "./src/sprites/group.js":
/*!******************************!*\
  !*** ./src/sprites/group.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _baseObject = __webpack_require__(/*! ./baseObject */ \"./src/sprites/baseObject.js\");\n\nvar _baseObject2 = _interopRequireDefault(_baseObject);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Group extends _baseObject2.default {\n  constructor(...spritesToGroup) {\n    super();\n    if (spritesToGroup && spritesToGroup.length > 0) {\n      spritesToGroup.forEach(sprite => {\n        this.addChild(sprite);\n      });\n    }\n  }\n\n  addChild(sprite) {\n    if (sprite.parent) {\n      sprite.parent.removeChild(sprite);\n    }\n    sprite.parent = this;\n    this.children.push(sprite);\n    this.calculateSize();\n  }\n\n  removeChild(sprite) {\n    if (sprite.parent === this) {\n      this.children.splice(this.children.indexOf(sprite), 1);\n    } else {\n      throw new Error(sprite + ' is not a child of ' + this);\n    }\n    this.calculateSize();\n  }\n\n  calculateSize() {\n    if (this.children.length > 0) {\n      this._newWidth = 0;\n      this._newHeight = 0;\n      this.children.forEach(child => {\n        if (child.x + child.width > this._newWidth) {\n          this._newWidth = child.x + child.width;\n        }\n        if (child.y + child.height > this._newHeight) {\n          this._newHeight = child.y + child.height;\n        }\n      });\n      this.width = this._newWidth;\n      this.height = this._newHeight;\n    }\n  }\n}\nexports.default = Group;\n\n//# sourceURL=webpack://Moge/./src/sprites/group.js?");

/***/ }),

/***/ "./src/sprites/index.js":
/*!******************************!*\
  !*** ./src/sprites/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Stage = exports.Group = exports.Text = exports.Line = exports.Rectangle = exports.Circle = undefined;\n\nvar _circle = __webpack_require__(/*! ./circle */ \"./src/sprites/circle.js\");\n\nvar _circle2 = _interopRequireDefault(_circle);\n\nvar _rectangle = __webpack_require__(/*! ./rectangle */ \"./src/sprites/rectangle.js\");\n\nvar _rectangle2 = _interopRequireDefault(_rectangle);\n\nvar _line = __webpack_require__(/*! ./line */ \"./src/sprites/line.js\");\n\nvar _line2 = _interopRequireDefault(_line);\n\nvar _text = __webpack_require__(/*! ./text */ \"./src/sprites/text.js\");\n\nvar _text2 = _interopRequireDefault(_text);\n\nvar _group = __webpack_require__(/*! ./group */ \"./src/sprites/group.js\");\n\nvar _group2 = _interopRequireDefault(_group);\n\nvar _stage = __webpack_require__(/*! ./stage */ \"./src/sprites/stage.js\");\n\nvar _stage2 = _interopRequireDefault(_stage);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.Circle = _circle2.default;\nexports.Rectangle = _rectangle2.default;\nexports.Line = _line2.default;\nexports.Text = _text2.default;\nexports.Group = _group2.default;\nexports.Stage = _stage2.default;\n\n//# sourceURL=webpack://Moge/./src/sprites/index.js?");

/***/ }),

/***/ "./src/sprites/line.js":
/*!*****************************!*\
  !*** ./src/sprites/line.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _baseObject = __webpack_require__(/*! ./baseObject */ \"./src/sprites/baseObject.js\");\n\nvar _baseObject2 = _interopRequireDefault(_baseObject);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Line extends _baseObject2.default {\n  constructor(strokeStyle = \"red\", lineWidth = 1, x1 = 0, y1 = 0, x2 = 30, y2 = 30) {\n    super();\n    this.strokeStyle = strokeStyle;\n    this.lineWidth = lineWidth;\n    this.x1 = x1;\n    this.y1 = y1;\n    this.x2 = x2;\n    this.y2 = y2;\n    this.lineJoin = 'round';\n  }\n\n  canvasRender(ctx) {\n    ctx.strokeStyle = this.strokeStyle;\n    ctx.lineWidth = this.lineWidth;\n    ctx.lineJoin = this.lineJoin;\n    ctx.beginPath();\n    ctx.moveTo(this.x1, this.y1);\n    ctx.lineTo(this.x2, this.y2);\n    //ctx.closePath()\n    if (this.strokeStyle !== \"none\") ctx.stroke();\n  }\n}\nexports.default = Line;\n\n//# sourceURL=webpack://Moge/./src/sprites/line.js?");

/***/ }),

/***/ "./src/sprites/rectangle.js":
/*!**********************************!*\
  !*** ./src/sprites/rectangle.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _baseObject = __webpack_require__(/*! ./baseObject */ \"./src/sprites/baseObject.js\");\n\nvar _baseObject2 = _interopRequireDefault(_baseObject);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Rectangle extends _baseObject2.default {\n  constructor(width = 30, height = 30, fillStyle = \"red\", strokeStyle = \"none\", lineWidth = 0, x = 0, y = 0) {\n    super();\n    this.width = width;\n    this.height = height;\n    this.fillStyle = fillStyle;\n    this.strokeStyle = strokeStyle;\n    this.lineWidth = lineWidth;\n    this.x = x;\n    this.y = y;\n  }\n\n  canvasRender(ctx) {\n    ctx.strokeStyle = this.strokeStyle;\n    ctx.lineWidth = this.lineWidth;\n    ctx.fillStyle = this.fillStyle;\n    ctx.beginPath();\n    ctx.rect(-this.width * this.pivotX, -this.height * this.pivotY, this.width, this.height);\n    if (this.mask === true) {\n      ctx.clip();\n    } else {\n      if (this.strokeStyle !== \"none\") ctx.stroke();\n      if (this.fillStyle !== \"none\") ctx.fill();\n    }\n  }\n}\nexports.default = Rectangle;\n\n//# sourceURL=webpack://Moge/./src/sprites/rectangle.js?");

/***/ }),

/***/ "./src/sprites/stage.js":
/*!******************************!*\
  !*** ./src/sprites/stage.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _baseObject = __webpack_require__(/*! ./baseObject */ \"./src/sprites/baseObject.js\");\n\nvar _baseObject2 = _interopRequireDefault(_baseObject);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Stage extends _baseObject2.default {\n  constructor(width, height) {\n    super();\n    this.isStage = true;\n    this.width = width;\n    this.height = height;\n    this.x = 0;\n    this.y = 0;\n    this.parent = undefined;\n  }\n}\nexports.default = Stage;\n\n//# sourceURL=webpack://Moge/./src/sprites/stage.js?");

/***/ }),

/***/ "./src/sprites/text.js":
/*!*****************************!*\
  !*** ./src/sprites/text.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _baseObject = __webpack_require__(/*! ./baseObject */ \"./src/sprites/baseObject.js\");\n\nvar _baseObject2 = _interopRequireDefault(_baseObject);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Text extends _baseObject2.default {\n  constructor(content = \"hello world\", font = \"12px sans-serif\", fillStyle = \"red\", x = 0, y = 0) {\n    super();\n    this.content = content;\n    this.font = font;\n    this.fillStyle = fillStyle;\n    this.x = x;\n    this.y = y;\n    this.textBaseline = \"top\";\n  }\n\n  canvasRender(ctx) {\n    ctx.strokeStyle = this.strokeStyle;\n    ctx.lineWidth = this.lineWidth;\n    ctx.fillStyle = this.fillStyle;\n\n    if (this.width === 0) this.width = ctx.measureText(this.content).width;\n    if (this.height === 0) this.height = ctx.measureText(\"M\").width;\n    ctx.translate(-this.width * this.pivotX, -this.height * this.pivotY);\n    ctx.font = this.font;\n    ctx.textBaseline = this.textBaseline;\n    ctx.fillText(this.content, 0, 0);\n  }\n}\nexports.default = Text;\n\n//# sourceURL=webpack://Moge/./src/sprites/text.js?");

/***/ })

/******/ })["default"];
});