import run from "aocrunner"

const parseInput = (rawInput) => {
  const [, , a, b, , c, d] = rawInput.trim().split(/[:,] |\.\.|=/)
  return [+a, +b, +c, +d]
}

const part1 = (rawInput, part1 = true) => {
  const [minX, maxX, minY, maxY] = parseInput(rawInput)

  function fire(startX, startY) {
    let dX = startX,
      dY = startY,
      x = 0,
      y = 0,
      highest = 0
    while (x <= maxX && y >= minY) {
      x += dX
      y += dY
      dX -= Math.sign(dX)
      dY -= 1
      if (y > highest) {
        highest = y
      }
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
        return highest
      }
    }
    return undefined
  }

  let bestY = 0
  let count = 0
  for (let dy = minY; dy < 1000; dy++) {
    for (let dx = 1; dx <= maxX; dx++) {
      const newY = fire(dx, dy)
      if (newY !== undefined) count++
      if (newY > bestY) bestY = newY
    }
  }
  if (part1) return bestY
  return count
}

const part2 = (rawInput) => {
  return part1(rawInput, false)
}

run({
  part1: {
    tests: [{ input: `target area: x=20..30, y=-10..-5`, expected: 45 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `target area: x=20..30, y=-10..-5`, expected: 112 }],
    solution: part2,
  },
  trimTestInputs: true,
})
