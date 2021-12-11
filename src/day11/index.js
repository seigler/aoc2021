import run from "aocrunner"

const parseInput = (rawInput) =>
  rawInput.split`\n`.map((l) => l.split``.map((x) => +x))

const part1 = (rawInput, isPartTwo = false) => {
  const input = parseInput(rawInput)
  const h = input.length
  const w = input[0].length
  let flashes = 0,
    flashesThisRound
  for (let step = 0; step < 100 || isPartTwo; step++) {
    flashesThisRound = 0
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        input[y][x]++
      }
    }
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (input[y][x] > 9) {
          bump(y, x)
        }
      }
    }
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (isNaN(input[y][x])) {
          input[y][x] = 0
        }
      }
    }
    if (flashesThisRound === w * h && isPartTwo) {
      return step + 1
    }
  }
  function bump(y, x) {
    if (y < 0 || y >= h || x < 0 || x >= w) return
    if (++input[y][x] > 9) {
      input[y][x] = NaN
      flashes++
      flashesThisRound++
      bump(y - 1, x - 1)
      bump(y - 1, x)
      bump(y - 1, x + 1)
      bump(y, x - 1)
      bump(y, x + 1)
      bump(y + 1, x - 1)
      bump(y + 1, x)
      bump(y + 1, x + 1)
    }
  }
  return flashes
}

const part2 = (rawInput) => {
  return part1(rawInput, true)
}

run({
  part1: {
    tests: [
      {
        input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`,
        expected: 1656,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`,
        expected: 195,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
