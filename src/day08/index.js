import run from "aocrunner"

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((x) =>
      x
        .split(" | ")
        .map((x) => x.split(" ").map((x) => [...x].sort().join(""))),
    )

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  return input.reduce(
    (acc, [samples, outputs]) =>
      acc + outputs.filter((x) => [2, 4, 3, 7].includes(x.length)).length,
    0,
  )
}

const part2 = (rawInput) => {
  function frequencies(str) {
    return str.split("").reduce((total, letter) => {
      total[letter] ? total[letter]++ : (total[letter] = 1)
      return total
    }, {})
  }
  const input = parseInput(rawInput)
  return input.reduce((acc, [samples, outputs]) => {
    const freq = Object.entries(frequencies(samples.join("")))
    const segments = Array(7)
    segments[4] = freq.find((x) => x[1] == 4)[0]
    const one = samples.find((x) => x.length == 2)
    const four = samples.find((x) => x.length == 4)
    const seven = samples.find((x) => x.length == 3)
    const eight = samples.find((x) => x.length == 7)
    segments[0] = [...seven].filter((x) => one.indexOf(x) < 0)[0]
    const two = samples.find(
      (x) => x.length == 5 && x.indexOf(segments[4]) >= 0,
    )
    segments[2] = freq.find((x) => x[1] == 8 && x[0] != segments[0])[0]
    const five = samples.find(
      (x) => x.length == 5 && x.indexOf(segments[2]) < 0,
    )
    const three = samples.find((x) => x.length == 5 && x != two && x != five)
    const six = samples.find((x) => x.length == 6 && x.indexOf(segments[2]) < 0)
    const nine = samples.find(
      (x) => x.length == 6 && x.indexOf(segments[4]) < 0,
    )
    const zero = samples.find((x) => x.length == 6 && x != six && x != nine)

    const key = [zero, one, two, three, four, five, six, seven, eight, nine]
    return (
      acc +
      parseInt(
        outputs.reduce((acc, digit) => acc + key.indexOf(digit), ""),
        10,
      )
    )
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
        expected: 26,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`,
        expected: 61229,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})

/*
number of segments
0: 6
1: 2
2: 5
3: 5
4: 4
5: 5
6: 6
7: 3
8: 7
9: 6

segment # usage count
0: 8
1: 6
2: 8
3: 7
4: 4
5: 9
6: 7
*/
