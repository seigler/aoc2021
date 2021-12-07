import run from "aocrunner"

const parseInput = (rawInput) =>
  rawInput.trim().split`,`.map((x) => +x).sort((a, b) => a - b)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const median = input[Math.floor(input.length / 2)]
  return input.reduce((acc, cur) => acc + Math.abs(cur - median), 0)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const min = input[0],
    max = input[input.length - 1]
  const gas = (position) =>
    input.reduce(
      (acc, cur) =>
        acc + ((1 + Math.abs(cur - position)) * Math.abs(cur - position)) / 2,
      0,
    )
  let bestGas = Infinity
  for (let pos = min; pos <= max; pos++) {
    const thisGas = gas(pos)
    if (thisGas < bestGas) {
      bestGas = thisGas
    }
  }
  return bestGas
}

run({
  part1: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 }],
    solution: part2,
  },
  trimTestInputs: true,
})
