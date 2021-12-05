import run from "aocrunner"
import { sequence } from "../utils/index.js"

const parseInput = (rawInput) =>
  rawInput.split`\n`.map((l) => l.split(/ -> |,/).map((x) => +x))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const visited = new Map()
  input.forEach(([ax, ay, bx, by]) => {
    const dx = Math.sign(bx - ax)
    const dy = Math.sign(by - ay)
    if (dx == 0 || dy == 0) {
      for (let x = ax, y = ay; x != bx + dx || y != by + dy; x += dx, y += dy) {
        const key = `${x},${y}`
        const value = visited.get(key) || 0
        visited.set(key, value + 1)
      }
    }
  })

  return [...visited.values()].filter((x) => x > 1).length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const visited = new Map()
  input.forEach(([ax, ay, bx, by]) => {
    const dx = Math.sign(bx - ax)
    const dy = Math.sign(by - ay)
    for (let x = ax, y = ay; x != bx + dx || y != by + dy; x += dx, y += dy) {
      const key = `${x},${y}`
      const value = visited.get(key) || 0
      visited.set(key, value + 1)
    }
  })

  return [...visited.values()].filter((x) => x > 1).length
}

run({
  part1: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
