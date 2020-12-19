const [rules, inputs] = require('fs').readFileSync('./input', 'utf8').split('\n\n').map(x => x.split('\n').filter(y => y))

const TERMINAL = /^"([^"]+)"$/
function makeParser(rules) {
  const parsers = new Map()

  for (const [k, v] of rules) {
    const term = v.match(TERMINAL)
    if (term) {
      const t = term[1]
      parsers.set(k, function * (s, i) {
        if (s.slice(i, i + t.length) === t) {
          yield i + t.length
        }
      })
    } else {
      const parts = v.split('|').map(x => x.split(/\s+/).filter(x => x))

      parsers.set(k, function * (s, i = 0) {
        for (const pieces of parts) {
          const pf = pieces.map(p => parsers.get(p))
          const recur = function * (pi, i) {
            const f = pf[pi]
            if (!f) {
              yield i
            } else {
              for (const j of f(s, i)) {
                yield * recur(pi + 1, j)
              }
            }
          }
          yield * recur(0, i)
        }
      })
    }
  }

  return r => s => {
    for (const j of parsers.get(r)(s)) {
      if (j === s.length) {
        return true
      }
    }
    return false
  }
}

const rulesPart1 = new Map(rules.map(r => r.split(': ')))
const rulesPart2 = new Map(rulesPart1)
  .set('8', '42 | 42 8')
  .set('11', '42 31 | 42 11 31')

const part1 = makeParser(rulesPart1)('0')
console.log(inputs.reduce((acc, i) => acc + (part1(i) & 1), 0))

const part2 = makeParser(rulesPart2)('0')
console.log(inputs.reduce((acc, i) => acc + (part2(i) & 1), 0))

