import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split`\n`.map((x) => x.split`-`)

const part1 = (rawInput) => {
  let input = parseInput(rawInput)
  input = input.concat(input.map(([from, to]) => [to, from]))
  function countPaths(history) {
    const here = history[history.length - 1]
    if (here === "end") {
      //      console.log(history.join`,`)
      return 1
    }
    const exits = [
      ...input.filter(
        ([from, to]) =>
          from === here && (/[A-Z]+/.test(to) || !history.includes(to)),
      ),
    ]
    return exits.reduce(
      (acc, [from, to]) => acc + countPaths([...history, to]),
      0,
    )
  }
  return countPaths(["start"])
}

const part2 = (rawInput) => {
  let input = parseInput(rawInput)
  input = input.concat(input.map(([from, to]) => [to, from]))
  function countPaths(history, haveDoubled = false) {
    const here = history[history.length - 1]
    if (here === "end") {
      // console.log(history.join`,`)
      return 1
    }
    const exits = [
      ...input.filter(
        ([from, to]) =>
          from === here &&
          to !== "start" &&
          (!haveDoubled || /[A-Z]+/.test(to) || !history.includes(to)),
      ),
    ]
    return exits.reduce(
      (acc, [from, to]) =>
        acc +
        countPaths(
          [...history, to],
          haveDoubled || (/[a-z]+/.test(to) && history.includes(to)),
        ),
      0,
    )
  }
  return countPaths(["start"])
}

run({
  part1: {
    tests: [
      {
        input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`,
        expected: 10,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `start-A
start-b
A-c
A-b
b-d
A-end
b-end`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
