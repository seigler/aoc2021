import run from "aocrunner"

const parseInput = (rawInput) => {
  const [Sdots, Sfolds] = rawInput.trim().split`\n\n`
  return [
    new Set(Sdots.split`\n`),
    Sfolds.split`\n`.map((x) => x.split(/[ =]/).splice(2)),
  ]
}

function fold(dots, n, axis) {
  n = +n
  const nextSet = new Set()
  dots.forEach((dot) => {
    const [x, y] = dot.split`,`.map((x) => +x)
    if (axis == "x") {
      nextSet.add(x <= n ? dot : `${2 * n - x},${y}`)
    } else {
      nextSet.add(y <= n ? dot : `${x},${2 * n - y}`)
    }
  })
  return nextSet
}

const part1 = (rawInput) => {
  const [dots, folds] = parseInput(rawInput)
  let currentDots = dots
  folds.slice(0, 1).forEach(([axis, n]) => {
    currentDots = fold(currentDots, n, axis)
  })
  return currentDots.size
}

const part2 = (rawInput) => {
  const [dots, folds] = parseInput(rawInput)
  let currentDots = dots
  folds.forEach(([axis, n]) => {
    currentDots = fold(currentDots, n, axis)
  })
  const field = [...currentDots].map((d) => d.split`,`.map((x) => +x))
  const [maxX, maxY] = field.reduce(
    ([maxX, maxY], [x, y]) => [Math.max(x, maxX), Math.max(y, maxY)],
    [0, 0],
  )
  for (let y = 0; y <= maxY; y++) {
    let line = ""
    for (let x = 0; x <= maxX; x++) {
      line += currentDots.has(`${x},${y}`) ? "█" : " "
    }
    console.log(line)
  }
  return
}

run({
  part1: {
    tests: [
      {
        input: `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`,
        expected: 17,
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
