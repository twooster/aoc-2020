const { memo } = require('../util')
const [rules, inputs] = require('fs').readFileSync('./input', 'utf8').split('\n\n').map(x => x.split('\n').filter(y => y))

const rulesPart1 = new Map(rules.map(r => r.split(': ')))
const rulesPart2 = new Map(rulesPart1)
  .set('8', '42 | 42 8')
  .set('11', '42 31 | 42 11 31')

const TERMINAL = /^"([^"]+)"$/
function makeParser(rules, part2) {
  const _parse = memo(k => {
    /*
    if (part2) {
      if (k === '8') {
        const f = _parse('42')
        const r =  (s, i) => {
          let match, j
          ([match, i] = f(s, i))
          if (!match) {
            return [false]
          }
          while (true) {
            ([match, j] = r(s, i))
            if (!match) {
              return [true, i]
            }
            i = j
          }
        }
      } else if (k === '11') {
        const f42 = _parse('42')
        const f31 = _parse('31')
        const r = (s, i) => {
          let match, j
          ([match, i] = f42(s, i))
          if (!match) {
            return [false]
          }
          ([match, j] = r(s, i))
          if (match) {
            i = j
          }
          return f31(s, i)
        }
        return r
      }
    }
    */

    const v = rules.get(k)
    if (v === undefined) {
      throw new Error(`oh no ${k}`)
    }

    const term = v.match(TERMINAL)
    if (term) {
      const t = term[1]
      return (s, i) => s[i] === t ? [true, i + t.length] : [false]
    }

    const parts = v.split('|').map(x => x.split(/\s+/).filter(x => x))
    return (s, i) => {
      let match, j

      outer:
      for (const p of parts) {
        j = i
        for (const x of p) {
          const f = _parse(x);
          ([match, j] = f(s, j))
          if (!match) {
            continue outer
          }
        }
        return [true, j]
      }
      return [false]
    }
  })
  return r => s => {
    const [match, l] = _parse(r)(s, 0)
    return match && l === s.length
  }
}

const part1 = makeParser(rulesPart1)('0')
console.log(inputs.reduce((acc, i) => acc + (part1(i) & 1), 0))
const part2 = makeParser(rulesPart2, true)('0')
console.log(inputs.reduce((acc, i) => acc + (part2(i) & 1), 0))

