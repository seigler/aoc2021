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

function readPacket1(s) {
  if (/^0+$/.test(s)) return [0, ""]
  let cursor = 0
  function read(n) {
    cursor += n
    return s.substr(cursor - n, n)
  }
  const version = b2d(read(3))
  const typeId = b2d(read(3))
  if (typeId === 4) {
    // literal value
    let acc = ""
    for (let more = 1; more; ) {
      more = +read(1)
      acc += read(4)
    }
    return [version, s.substr(cursor)]
  } else {
    // operator type
    const lengthTypeId = +read(1)
    if (lengthTypeId == 0) {
      const subpacketLength = b2d(read(15))
      let nextV, nextS = read(subpacketLength)
      let versionSum = version
      while (nextS.length > 0) {
        [nextV, nextS] = readPacket1(nextS)
        versionSum += nextV
      }
      return [versionSum, s.substr(cursor)]
    } else {
      const subpacketCount = b2d(read(11))
      let nextV, nextS = s.substr(cursor)
      let versionSum = version
      for (let i = 0; i < subpacketCount; i++) {
        [nextV, nextS] = readPacket1(nextS)
        versionSum += nextV
      }
      return [versionSum, nextS]
    }
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  return readPacket1(input)[0]
}

const operators = [
  (...args) => args.reduce((a,c) => a+c, 0), // sum,
  (...args) => args.reduce((a,c) => a*c, 1), // product
  Math.min, // minimum,
  Math.max, // maximum,
  null, // omitted
  (a,b) => a > b ? 1 : 0, // greater than
  (a,b) => a < b ? 1 : 0, // less than
  (a,b) => a == b ? 1 : 0, // equals
]

function readPacket2(s) {
  if (/^0+$/.test(s)) return [undefined, ""]
  let cursor = 0
  function read(n) {
    cursor += n
    return s.substr(cursor - n, n)
  }
  read(3) // version, read and discard
  const typeId = b2d(read(3))
  if (typeId === 4) {
    // literal value
    let acc = ""
    for (let more = 1; more; ) {
      more = +read(1)
      acc += read(4)
    }
    return [parseInt(acc, 2), s.substr(cursor)]
  } else {
    // operator type
    const lengthTypeId = +read(1)
    if (lengthTypeId == 0) {
      const subpacketLength = b2d(read(15))
      const values = []
      let nextValue, nextS = read(subpacketLength)
      while (nextS.length > 0) {
        [nextValue, nextS] = readPacket2(nextS)
        values.push(nextValue)
      }
      return [operators[typeId](...values), s.substr(cursor)]
    } else {
      const subpacketCount = b2d(read(11))
      const values = []
      let nextValue, nextS = s.substr(cursor)
      for (let i = 0; i < subpacketCount; i++) {
        [nextValue, nextS] = readPacket2(nextS)
        values.push(nextValue)
      }
      return [operators[typeId](...values), nextS]
    }
  }
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  return readPacket2(input)[0]
}

run({
  part1: {
    tests: [
      { input: `D2FE28`, expected: 6 },
      { input: `8A004A801A8002F478`, expected: 16 },
      { input: `620080001611562C8802118E34`, expected: 12 },
      { input: `C0015000016115A2E0802F182340`, expected: 23 },
      { input: `A0016C880162017C3686B18A3D4780`, expected: 31 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `C200B40A82`, expected: 3 },
      { input: `04005AC33890`, expected: 54 },
      { input: `880086C3E88112`, expected: 7 },
      { input: `CE00C43D881120`, expected: 9 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
