import run from "aocrunner"

const parseInput = (rawInput) => rawInput.trim().split`\n`

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const ones = []
  input.forEach((l) => {
    ;[...l].forEach((x, i) => {
      if (x === "1") {
        ones[i] = (ones[i] || 0) + 1
      }
    })
  })
  const gamma = parseInt(
    ones.reduce((acc, p) => acc + (p >= input.length / 2 ? "1" : "0"), ""),
    2,
  )
  const epsilon = parseInt(
    ones.reduce((acc, p) => acc + (p < input.length / 2 ? "1" : "0"), ""),
    2,
  )
  return gamma * epsilon
}

function countOnes(input) {
  const ones = []
  input.forEach((l) => {
    ;[...l].forEach((x, i) => {
      if (x === "1") {
        ones[i] = (ones[i] || 0) + 1
      }
    })
  })
  return ones
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let oxyQueue = input.slice()
  for (let place = 0; oxyQueue.length !== 1; place++) {
    const ones = countOnes(oxyQueue)
    oxyQueue = oxyQueue.filter((val) => {
      const most = ones[place] >= oxyQueue.length / 2 ? "1" : "0"
      return val[place] === most
    })
  }
  const oxy = parseInt(oxyQueue[0], 2)

  let co2Queue = input.slice()
  for (let place = 0; co2Queue.length !== 1; place++) {
    const ones = countOnes(co2Queue)
    co2Queue = co2Queue.filter(
      (val) => val[place] === (ones[place] < co2Queue.length / 2 ? "1" : "0"),
    )
  }
  const co2 = parseInt(co2Queue[0], 2)

  return oxy * co2
}

run({
  part1: {
    tests: [
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
