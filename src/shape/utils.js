import * as R from 'ramda'

function merge (pointsA, pointsB) {
  for (let i = 0; i < pointsB.length; i++) {
    const row = pointsB[i]
    for (let j = 0; j < row.length; j++) {
      const color = pointsB[i][j]
      if (color && color !== 'transparent') {
        pointsA[i][j] = color
      }
    }
  }

  return pointsA
}

function offset (points, position) {
  const newPoints = []

  const { x, y } = position

  // 补齐空的行
  R.forEach(() => {
    const row = R.map(() => 'transparent', R.range(0, points.length + x))
    newPoints.push(row)
  }, R.range(0, y))

  let emptyCells = x > 0 ? R.map(() => 'transparent', R.range(0, x)) : []

  R.forEach((rowIndex) => {
    // 补齐空的列
    const row = emptyCells.concat(points[rowIndex])
    newPoints.push(row)
  }, R.range(0, points.length))

  return newPoints
}

export { merge, offset }
