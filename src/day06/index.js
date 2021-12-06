import run from "aocrunner"
import { memo } from "../utils/index.js"

const parseInput = (rawInput) => rawInput.trim().split`,`.map((x) => +x)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  for (let i = 0; i < 80; i++) {
    const length = input.length
    for (let j = 0; j < length; j++) {
      if (input[j]-- === 0) {
        input[j] = 6
        input.push(8)
      }
    }
  }
  return input.length
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const bins = new Array(9).fill(0)
  input.forEach((f) => bins[f]++)
  for (let i = 0; i < 256; i++) {
    const spawning = bins.shift()
    bins.push(spawning)
    bins[6] += spawning
  }
  return bins.reduce((acc, x) => acc + x, 0)
}

run({
  part1: {
    tests: [{ input: `3,4,3,1,2`, expected: 5934 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `3,4,3,1,2`, expected: 26984457539 }],
    solution: part2,
  },
  trimTestInputs: true,
})
