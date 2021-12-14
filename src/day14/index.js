import run from "aocrunner"

const parseInput = (rawInput) => {
  const [start, insertions] = rawInput.trim().split`\n\n`
  return [start, new Map(insertions.split`\n`.map((i) => i.split` -> `))]
}

const part1 = (rawInput) => {
  // const [start, insertions] = parseInput(rawInput)
  // let p = start
  // for (let i = 0; i < 10; i++) {
  //   let q = ""
  //   p.split("").forEach((c, j) => {
  //     if (j > 0) {
  //       const pair = p[j - 1] + p[j]
  //       q += insertions.get(pair) || ""
  //     }
  //     q += p[j]
  //   })
  //   p = q
  // }

  // let counts = {}
  // p.split``.map((c) => (counts[c] = 1 + (counts[c] ?? 0)))
  // counts = Object.entries(counts).sort((a, b) => a[1] - b[1])
  // return counts[counts.length - 1][1] - counts[0][1]
  return part2(rawInput, 10)
}

const part2 = (rawInput, steps = 40) => {
  let [start, insertions] = parseInput(rawInput)
  let pairCounts = {}
  start.split("").map((c, i) => {
    if (i > 0) {
      const pair = start[i - 1] + start[i]
      pairCounts[pair] = 1 + (pairCounts[pair] ?? 0)
    }
  })
  for (let step = 0; step < steps; step++) {
    const nextPairCount = {}
    for (const [pair, count] of Object.entries(pairCounts)) {
      const insertion = insertions.get(pair)
      if (insertion !== undefined) {
        const A = pair[0] + insertion,
          B = insertion + pair[1]
        nextPairCount[A] = (nextPairCount[A] ?? 0) + count
        nextPairCount[B] = (nextPairCount[B] ?? 0) + count
      } else {
        nextPairCount[pair] = count
      }
    }
    pairCounts = nextPairCount
  }

  let counts = {}
  Object.entries(pairCounts).map(([pair, count]) => {
    const A = pair[0],
      B = pair[1]
    counts[A] = (counts[A] ?? 0) + count
    counts[B] = (counts[B] ?? 0) + count
  })
  /*
  Since each pair overlaps with a neighbor, each letter will be
  counted twice. To make the doubling perfect, the first and 
  last characters (which are unchanged) must be incremented as
  well.
  */
  counts[start[0]]++
  counts[start[start.length - 1]]++
  counts = Object.entries(counts).sort((a, b) => a[1] - b[1])
  return (counts[counts.length - 1][1] - counts[0][1]) / 2
}

run({
  part1: {
    tests: [
      {
        input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`,
        expected: 1588,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`,
        expected: 2188189693529,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
