const input = require('fs').readFileSync('./input', 'utf8').split('\n').filter(x=>x)

const MASK = /^mask = ([10X]+)$/
const MEM = /^mem\[(\d+)\] = (\d+)$/

function part1(input) {
  const mem = new Map()
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
  return Array.from(mem.values()).reduce((a, b) => a + b, 0n)
}

console.log(part1(input))

function part2(input) {
  const mem = new Map()

  let and = 0n
  let or = 0n
  let floating = 0n
  for (const l of input) {
    if (l.startsWith('mask')) {
      const m = l.match(MASK)
      if (!m) {
        throw new Error(`bad mask ${l}`)
      }
      or = 0n
      and = 0n
      floating = 0n
      for (const c of m[1]) {
        and <<= 1n
        or <<= 1n
        floating <<= 1n
        if (c === 'X') {
          floating |= 1n
        } else {
          and |= 1n
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

      const recurSet = (idx, val, floating) => {
        mem.set(idx, val)
        const lsb = floating & -floating
        if (lsb === 0n) {
          return
        }
        const nextFloating = floating ^ lsb
        recurSet(idx, val, nextFloating)
        recurSet(idx | lsb, val, nextFloating)
      }

      recurSet((idx & and) | or, val, floating)
    }
  }
  return Array.from(mem.values()).reduce((a, b) => a + b, 0n)
}

console.log(part2(input))
