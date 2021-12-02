import run from "aocrunner"

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((l) => l.split(" "))
    .map((i) => [i[0], +i[1]])

const actions = {
  forward: ([h, v], x) => [h + x, v],
  down: ([h, v], x) => [h, v + x],
  up: ([h, v], x) => [h, v - x],
}
const actions2 = {
  forward: ([h, v, a], x) => [h + x, v + a * x, a],
  down: ([h, v, a], x) => [h, v, a + x],
  up: ([h, v, a], x) => [h, v, a - x],
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const pos = input.reduce(
    (acc, [command, val]) => actions[command](acc, val),
    [0, 0],
  )
  return pos[0] * pos[1]
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const pos = input.reduce(
    (acc, [command, val]) => actions2[command](acc, val),
    [0, 0, 0],
  )
  return pos[0] * pos[1]
}

run({
  part1: {
    tests: [
      {
        input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
        expected: 150,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
