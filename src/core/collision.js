

export default class Collision {
  constructor() {

  }

  /**
   * An universal collision method that works for rectangular and circular sprites.
   * @param {*} a 
   * @param {*} b 
   * @param {*} react 
   * @param {*} bounce 
   * @param {*} global 
   * @param {*} extra 
   */
  hit(a, b, react, bounce, global, extra) {
    let collision
    
  }

  // Boundary collisions
  /**
   * outsideBounds
   * @param {*} s
   * @param {*} bounds 
   * @param {*} extra 
   */
  outsideBounds(s, bounds, extra) {
    let x = bounds.x
    let y = bounds.y
    let width = bounds.width
    let height = bounds.height
    let collision
    if (s.x < x - s.width) collision = "left"
    if (s.y < y - s.height) collision = "top"
    if (s.x > width) collision = "right"
    if (s.y > height) collision = "bottom"
    if (collision && extra) extra(collision)
    return collision
  }

  /**
   * outsideBounds
   * @param {*} s
   * @param {*} bounds
   * @param {*} bounce 
   * @param {*} extra 
   */
  contain(s, bounds, bounce=false, extra) {
    let x = bounds.x
    let y = bounds.y
    let width = bounds.width
    let height = bounds.height
    let collision = undefined
    if (s.x < x) {
      if (bounce) s.vx *= -1
      if (s.mass) s.vx /= s.mass
      s.x = x
      collision = "left"
    }
    if (s.y < y) {
      if (bounce) s.vy *= -1
      if (s.mass) s.vy /= s.mass
      s.y = y
      collision = "top"
    }
    if (s.x + s.width > width) {
      if (bounce) s.vx *= -1
      if (s.mass) s.vx /= s.mass
      s.x = width - s.width
      collision = "right"
    }
    if (s.y + s.height > height) {
      if (bounce) s.vy *= -1
      if (s.mass) s.vy /= s.mass
      s.y = height - s.height
      collision = "bottom"
    }
    if (collision && extra) extra(collision)
    return collision
  }
  // Shape collisions

  /**
   * hitTestPoint 判断点是否和圆形或者矩形碰撞
   * @param {*} point  An object with `x` and `y` properties
   * @param {*} sprite A sprite object with `x`, `y`, `centerX` and `centerY` properties
   * @returns {boolean}
   */
  hitTestPoint(point, sprite) {
    let shape = sprite.radius ? "circle" : "rectangle"
    let hit = false
    if (shape === "circle") {
      let vx = point.x - sprite.centerX
      let vy = point.y - sprite.centerY
      let magnitude = Math.sqrt(vx * vx + vy * vy)
      hit = magnitude < sprite.radius
    } else {
      let left = sprite.x
      let right = sprite.x + sprite.width
      let top = sprite.y
      let bottom = sprite.y + sprite.height
      hit = point.x > left && point.x < right && point.y > top && point.y < bottom
    }
    return hit
  }

  /**
   * hitTestCircle 判断圆形与圆形碰撞
   * @param {*} c1 A sprite object with `centerX`, `centerY` and `radius` properties.
   * @param {*} c2 A sprite object with `centerX`, `centerY` and `radius` properties.
   * @param {*} global 
   */
  hitTestCircle(c1, c2, global=false) {
    let vx, vy, hit = false
    if (global) {
      vx = (c2.gx + c2.radius) - (c1.gx + c1.radius)
      vy = (c2.gy + c2.radius) - (c1.gy + c1.radius)
    } else {
      vx = c2.centerX - c1.centerX
      vy = c2.centerY - c1.centerY
    }
    let magnitude = Math.sqrt(vx * vx + vy * vy)
    let totalRadius = c1.radius + c2.radius
    hit = magnitude < totalRadius
    return hit
  }

  /**
   * hitTestRectangle 判断两矩形是否碰撞
   * @param {*} r1 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
   * @param {*} r2 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
   * @param {*} global 
   */
  hitTestRectangle(r1, r2, global=false) {
    let vx, vy, hit = false
    if (global) {
      vx = (r2.gx + r2.halfWidth) - (r1.gx + r1.halfWidth)
      vy = (r2.gy + r2.halfHeight) - (r1.gy + r1.halfHeight)
    } else {
      vx = r2.centerX - r1.centerX
      vy = r2.centerY - r1.centerY
    }
    let combinedHalfWidths = r1.halfWidth + r2.halfWidth
    let combinedHalfHeights = r1.halfHeight + r2.halfHeight
    if (Math.abs(vx) < combinedHalfWidths) {
      if (Math.abs(vy) < combinedHalfHeights) {
        hit = true
      } else {
        hit = false
      }
    } else {
      hit = false
    }
    return hit
  }

  /**
   * hitTestCircleRectangle 判断圆形是否和矩形碰撞
   * @param {*} c1 A sprite object with `centerX`, `centerY` and `radius` properties.
   * @param {*} r1 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
   * @param {*} global 
   */
  hitTestCircleRectangle(c1, r1, global) {
    let c1x, c1y, r1x, r1y, region= undefined, collision = undefined
    if (global) {
      c1x = c1.gx
      c1y = c1.gy
      r1x = r1.gx
      r1y = r1.gy
    } else {
      c1x = c1.x
      c1y = c1.y
      r1x = r1.x
      r1y = r1.y
    }
    if (c1y < r1y - r1.halfHeight) {
      if (c1x < r1x - 1 - r1.halfWidth) {
        region = "topLeft"
      } else if (c1x > r1x + 1 + r1.halfWidth) {
        region = "topRight"
      } else {
        region = "topMiddle"
      }
    } else if (c1y > r1y + r1.halfHeight) {
      if (c1x < r1x - 1 - r1.halfWidth) {
        region = "bottomLeft"
      }
      else if (c1x > r1x + 1 + r1.halfWidth) {
        region = "bottomRight"
      }
      else {
        region = "bottomMiddle"
      }
    } else {
      if (c1x < r1x - r1.halfWidth) {
        region = "leftMiddle"
      }
      else {
        region = "rightMiddle"
      }
    }
    if (region === "topMiddle" || region === "bottomMiddle" || region === "leftMiddle" || region === "rightMiddle") {
      collision = this.hitTestRectangle(c1, r1, global)
    } else {
      let point = {}
      switch (region) {
        case "topLeft":
          point.x = r1x
          point.y = r1y
          break
        case "topRight":
          point.x = r1x + r1.width
          point.y = r1y
          break
        case "bottomLeft":
          point.x = r1x
          point.y = r1y + r1.height
          break
        case "bottomRight":
          point.x = r1x + r1.width
          point.y = r1y + r1.height
      }
      collision = this.hitTestCirclePoint(c1, point, global)
    }
    if (collision) {
      return region
    } else {
      return collision
    }
  }
} 