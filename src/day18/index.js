import run from "aocrunner"

const parseInput = (rawInput) => rawInput.trim().split`\n`.map(JSON.parse)

/**
 * @returns [exploded, toAddLeft, newValue, toAddRight]
 */
function explode(p, maxDepth = 4) {
  if (typeof p === "number") return [false, undefined, p, undefined]
  const [left, right] = p
  if (maxDepth == 0) return [true, left, 0, right]
  let [exploded, toAddLeft, newValue, toAddRight] = explode(left, maxDepth - 1)
  if (exploded) {
    return [true, toAddLeft, [newValue, addRight(right, toAddRight)], undefined]
  }
  ;[exploded, toAddLeft, newValue, toAddRight] = explode(right, maxDepth - 1)
  if (exploded) {
    return [true, undefined, [addLeft(left, toAddLeft), newValue], toAddRight]
  }
  return [false, undefined, p, undefined]
}

function addRight(v, n) {
  // to the right means expanding the left side
  if (n === undefined) return v
  if (typeof v === "number") return v + n
  return [addRight(v[0], n), v[1]]
}

function addLeft(v, n) {
  // to the left means expanding the right side
  if (n === undefined) return v
  if (typeof v === "number") return v + n
  return [v[0], addLeft(v[1], n)]
}

/** @returns [changed, newValue] */
function split(v) {
  if (typeof v === "number") {
    if (v > 9) return [true, [Math.floor(v / 2), Math.ceil(v / 2)]]
    return [false, v]
  }
  let [left, right] = v
  let [changed, newValue] = split(left)
  if (changed) {
    return [true, [newValue, right]]
  }
  ;[changed, newValue] = split(right)
  if (changed) {
    return [true, [left, newValue]]
  }
  return [false, v]
}

function add(a, b) {
  let changed,
    p = [a, b]
  while (true) {
    ;[changed, , p] = explode(p)
    if (changed) continue
    ;[changed, p] = split(p)
    if (changed) continue
    break
  }
  return p
}

function magnitude(v) {
  return typeof v === "number" ? v : 3 * magnitude(v[0]) + 2 * magnitude(v[1])
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  return magnitude(input.reduce(add))
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let best = -Infinity
  for (let i = 0; i < input.length; i++)
    for (let j = i + 1; j < input.length; j++)
      best = Math.max(
        best,
        magnitude(add(input[i], input[j])),
        magnitude(add(input[j], input[i])),
      )
  return best
}

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
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
