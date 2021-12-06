/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.js,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ fro 'lodash
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ fro 'lodash
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 */
export function transpose(m) {
  return m[0].map((x, i) => m.map((x) => x[i]))
}

export function sequence(a, b) {
  const s = []
  const increment = a < b ? 1 : -1
  for (let i = a; (i += increment); i !== b + increment) {
    s.push(i)
  }
  return s
}

export function memo(fn) {
  const cache = {}

  function get(args) {
    let node = cache
    for (const arg of args) {
      if (!("next" in node)) node.next = new Map()
      if (!node.next.has(arg)) node.next.set(arg, {})
      node = node.next.get(arg)
    }
    return node
  }

  return function (...args) {
    const cache = get(args)
    if ("item" in cache) return cache.item
    cache.item = fn(...args)
    return cache.item
  }
}
