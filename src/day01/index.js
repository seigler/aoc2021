import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(Number)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  return input.reduce((acc, current, index) => acc + (current > input[index-1] ? 1 : 0), 0)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let increases = 0
  for (let i = 0; i < input.length; i++) {
    if (i > 2 && input[i] > input[i-3]) {
      increases++
    }
  }

  return increases
}

run({
  part1: {
    tests: [
      { input: `199
200
208
210
200
207
240
269
260
263`, expected: 7 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `199
200
208
210
200
207
240
269
260
263`, expected: 5 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
