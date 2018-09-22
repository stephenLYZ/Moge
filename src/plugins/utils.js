
export default class Utils {
  move(sprites) {
    if (Array.isArray(sprites)) {
      sprites.forEach((sprite) => {
        sprite.x += sprite.vx | 0
        sprite.y += sprite.vy | 0
      })
    } else {
      sprite.x += sprite.vx | 0
      sprite.y += sprite.vy | 0
    }
  }

  distance(a1, a2) {
    const vx = a1.centerX - a2.centerX
    const vy = a1.centerY - a2.centerY
    return Math.sqrt(vx * vx + vy * vy)
  }

  followEase(follower, leader, speed) {
    const vx = leader.centerX - follower.centerX
    const vy = leader.centerY - follower.centerY
    const distance = Math.sqrt(vx * vx + vy * vy)
    if (distance > 1) {
      follower.x += vx * speed
      follower.y += vy * speed
    }
  }

  rotateAroundSprite(rotatingSprite, centerSprite, distance, angle) {
    rotatingSprite.x = centerSprite.centerX - rotatingSprite.parent.x + (distance * Math.cos(angle)) - rotatingSprite.halfWidth
    rotatingSprite.y = centerSprite.centerY - rotatingSprite.parent.y + (distance * Math.sin(angle)) - rotatingSprite.halfWidth
  }

  rotateAroundPoint(pointX, pointY, distanceX, distanceY, angle) {
    let point = {}
    point.x = pointX + Math.cos(angle) * distanceX
    point.y = pointY + Math.sin(angle) * distanceY
    return point
  }

  angle(a1, a2) {
    return Math.atan2(a2.centerY - a1.centerY, a2.centerX - a1.centerX)
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  randomFloat(min, max) {
    return min + Math.random() * (max - min)
  }

  wait(duration, callback) {
    return setTimeout(callback, duration)
  }
}