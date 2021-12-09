import run from "aocrunner"

const parseInput = (rawInput) =>
  rawInput.trim().split`\n`.map((y) => [...y].map((x) => +x))

function risk(x, y, map) {
  let base = map[y][x]
  if (map[y - 1] && map[y - 1][x] <= base) return undefined
  if (map[y + 1] && map[y + 1][x] <= base) return undefined
  if (map[y][x - 1] <= base) return undefined
  if (map[y][x + 1] <= base) return undefined
  return base
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let lowSum = 0
  for (const y in input) {
    for (const x in input[y]) {
      const r = risk(+x, +y, input)
      lowSum += r + 1 || 0
    }
  }
  return lowSum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const basinSizes = []
  for (const Y in input) {
    for (const X in input[Y]) {
      const x = +X,
        y = +Y
      const r = risk(x, y, input)
      if (r !== undefined) {
        const basin = []
        function spread(y, x) {
          const key = `${y},${x}`
          if (input[y][x] === 9 || basin.includes(key)) return
          basin.push(key)
          if (input[y - 1]) spread(y - 1, x)
          if (input[y + 1]) spread(y + 1, x)
          if (input[y][x - 1] !== undefined) spread(y, x - 1)
          if (input[y][x + 1] !== undefined) spread(y, x + 1)
        }
        spread(y, x)
        basinSizes.push(basin.length)
      }
    }
  }
  basinSizes.sort((a, b) => b - a)
  return basinSizes[0] * basinSizes[1] * basinSizes[2]
}

run({
  part1: {
    tests: [
      {
        input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2199943210
3987894921
9856789892
8767896789
9899965678`,
        expected: 1134,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
