const { memo } = require('../util')
const [rules, inputs] = require('fs').readFileSync('./input', 'utf8').split('\n\n').map(x => x.split('\n').filter(y => y))

const rulesPart1 = new Map(rules.map(r => r.split(': ')))
const rulesPart2 = new Map(rulesPart1)
  .set('8', '42 | 42 8')
  .set('11', '42 31 | 42 11 31')

const TERMINAL = /^"([^"]+)"$/
function makeParser(rules, part2) {
  const _parse = memo(k => {
    const v = rules.get(k)
    if (v === undefined) {
      throw new Error(`oh no ${k}`)
    }

    const term = v.match(TERMINAL)
    if (term) {
      const t = term[1]
      return function * (s, i) {
        if (s[i] === t) {
          yield i + t.length
        }
      }
    }

    const parts = v.split('|').map(x => x.split(/\s+/).filter(x => x))
    return function * (s, i) {
      for (const pieces of parts) {
        const pf = pieces.map(p => _parse(p))
        const recur = function * (pi, j) {
          const f = pf[pi]
          if (!f) {
            yield j
          } else {
            for (const k of f(s, j)) {
              yield * recur(pi + 1, k)
            }
          }
        }
        yield * recur(0, i)
      }
    }
  })
  return r => s => {
    for (const j of _parse(r)(s, 0)) {
      if (j === s.length) {
        return true
      }
    }
    return false
  }
}

const part1 = makeParser(rulesPart1)('0')
console.log(inputs.reduce((acc, i) => acc + (part1(i) & 1), 0))
const part2 = makeParser(rulesPart2)('0')
console.log(inputs.reduce((acc, i) => acc + (part2(i) & 1), 0))

