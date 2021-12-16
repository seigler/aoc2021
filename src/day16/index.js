import run from "aocrunner"

const parseInput = (rawInput) =>
  rawInput
    .trim()
    .split("")
    .map((c) => ("0000" + parseInt(c, 16).toString(2)).substr(-4))
    .join("")

function b2d(binaryString) {
  return parseInt(binaryString, 2)
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let cursor = 0,
    ans = 0
  function read(n) {
    cursor += n
    return input.substr(cursor - n, n)
  }
  const stack = [{ count: 1 }]
  while (stack.length) {
    const thisLimit = stack[0]
    if (thisLimit.count !== undefined) {
      --thisLimit.count
      if (thisLimit.count == 0) {
        stack.shift()
      }
    }
    if (thisLimit.cursor !== undefined) {
      if (cursor >= thisLimit.cursor) {
        stack.shift()
      }
    }
    const version = b2d(read(3))
    const typeId = b2d(read(3))
    if (typeId === 4) {
      // literal value
      ans += version
      let acc = ""
      for (let more = 1; more; ) {
        more = +read(1)
        acc += read(4)
      }
    } else {
      // operator type
      const lengthTypeId = +read(1)
      if (lengthTypeId == 0) {
        const subpacketLength = b2d(read(15))
        ans += version
        stack.unshift({ cursor: cursor + subpacketLength })
      } else {
        const subpacketCount = b2d(read(11))
        ans += version
        stack.unshift({ count: subpacketCount })
      }
    }
  }
  return ans
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      { input: `D2FE28`, expected: 6 },
      // { input: `8A004A801A8002F478`, expected: 16 },
      // { input: `620080001611562C8802118E34`, expected: 12 },
      // { input: `C0015000016115A2E0802F182340`, expected: 23 },
      // { input: `A0016C880162017C3686B18A3D4780`, expected: 31 },
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
