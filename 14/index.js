const input = require('fs').readFileSync('./input', 'utf8').split('\n').filter(x=>x)

const mem = new Map()
const MASK = /^mask = ([10X]+)$/
const MEM = /^mem\[(\d+)\] = (\d+)$/
let and = 0n
let or = 0n
for (const l of input) {
  if (l.startsWith('mask')) {
    const m = l.match(MASK)
    if (!m) {
      throw new Error(`bad mask ${l}`)
    }
    and = 0n
    or = 0n
    for (const c of m[1]) {
      and <<= 1n
      or <<= 1n
      if (c === 'X') {
        and |= 1n
      } else {
        or |= c === '1' ? 1n : 0n
      }
    }
  } else if (l.startsWith('mem')) {
    const m = l.match(MEM)
    if (!m) {
      throw new Error(`bad mem ${l}`)
    }
    const idx = BigInt(parseInt(m[1], 10))
    const val = BigInt(parseInt(m[2], 10))
    mem.set(idx, (val & and) | or)
  }
}
//console.log(mem)
console.log(Array.from(mem.values()).reduce((a, b) => a + b, 0n))
// too low: 35546157461
