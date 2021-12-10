import run from "aocrunner"

const parseInput = (rawInput) => rawInput.trim().split`\n`

const match = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
}
const push = Object.values(match)
const pop = Object.keys(match)

const part1 = (rawInput) => {
  const errorScores = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  }
  const input = parseInput(rawInput)
  let score = 0
  for (const line of input) {
    const stack = []
    check: for (let i = 0; i < line.length; i++) {
      const c = line[i]
      if (push.includes(c)) {
        stack.push(c)
      } else if (pop.includes(c)) {
        if (match[c] === stack[stack.length - 1]) {
          stack.pop()
        } else {
          score += errorScores[c]
          break check
        }
      }
    }
  }
  return score
}

const part2 = (rawInput) => {
  const autocompleteScores = {
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4,
  }
  const input = parseInput(rawInput)
  const scores = []
  for (const line of input) {
    const stack = []
    let error = false
    let score = 0
    check: for (let i = 0; i < line.length; i++) {
      const c = line[i]
      if (push.includes(c)) {
        stack.push(c)
      } else if (pop.includes(c)) {
        if (match[c] === stack[stack.length - 1]) {
          stack.pop()
        } else {
          error = true
          break check
        }
      }
    }
    if (!error) {
      while (stack.length !== 0) {
        score = score * 5 + autocompleteScores[stack.pop()]
      }
      scores.push(score)
    }
  }
  scores.sort((a, b) => a - b)
  return scores[(scores.length - 1) / 2]
}

run({
  part1: {
    tests: [
      {
        input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 26397,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`,
        expected: 288957,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
