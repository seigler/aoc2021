import run from "aocrunner"
import Heap from "heap"

const parseInput = (rawInput) =>
  rawInput.trim().split`\n`.map((l) => [...l].map((x) => +x))

const part1 = (rawInput) => {
  return part2(rawInput, 1)
  /* ONLY WORKS FOR SOME INPUTS*/
  // const input = parseInput(rawInput)
  // const h = input.length,
  //   w = input[0].length
  // const costs = new Map()
  // function solve(r, c) {
  //   const key = `${r},${c}`
  //   if (r === h - 1 && c === w - 1) {
  //     return input[r][c]
  //   }
  //   if (c < 0 || c >= w || r < 0 || r >= h) {
  //     return Infinity
  //   }
  //   if (costs.has(key)) {
  //     return costs.get(key)
  //   }
  //   const ans = input[r][c] + Math.min(solve(r + 1, c), solve(r, c + 1))
  //   costs.set(key, ans)
  //   return ans
  // }
  // return solve(0, 0) - input[0][0]
}

const part2 = (rawInput, mult = 5) => {
  const input = parseInput(rawInput)
  const h = input.length,
    w = input[0].length,
    Q = new Heap(([a], [b]) => a - b)
  Q.push([0, 0, 0])
  const costs = []
  for (let i = 0; i < mult * h; i++) {
    costs[i] = new Array(mult * w)
    costs[i].fill(Infinity)
  }
  const dr = [-1, 0, 1, 0]
  const dc = [0, -1, 0, 1]
  while (Q.size()) {
    const [totalRisk, r, c] = Q.pop() // take off the lowest distance point
    if (c < 0 || c >= mult * w || r < 0 || r >= mult * h) continue // out of bounds
    const tileDistance = Math.floor(r / h) + Math.floor(c / w)
    const riskHere = 1 + ((input[r % h][c % w] - 1 + tileDistance) % 9)
    if (costs[r][c] <= totalRisk + riskHere) {
      continue // wasting time
    } else {
      costs[r][c] = totalRisk + riskHere // we found a cheaper path here
    }
    if (r === mult * h - 1 && c === mult * w - 1) break // yay we finished
    for (let i = 0; i < 4; i++) {
      Q.push([costs[r][c], r + dr[i], c + dc[i]]) // queue all the neighbors
    }
  }
  return costs[mult * h - 1][mult * w - 1] - costs[0][0]
}

run({
  part1: {
    tests: [
      {
        input: `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`,
        expected: 40,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`,
        expected: 315,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
