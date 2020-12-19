const val = s => [s]
const cat = (a, b) => [`${a}${b}`]
const num = (s) => [parseInt(s, 10)]
const mul = (a, b) => [a * b]
const add = (a, b) => [a + b]
const sub = (a, b) => [a - b]
const eat = () => []

const rules = new Map([
  ['digit',  '0123456789'.split('').map(d => [val, `"${d}"`])],
  ['space',  [[eat, '" "']]],
  ['none',   [[eat, '""']]],
  ['_',      [[eat, 'space _'], [eat, 'space'], [eat, 'none']]],
  ['plus',   [[eat, '"+"']]],
  ['times',  [[eat, '"*"']]],
  ['minus',  [[eat, '"-"']]],
  ['lparen', [[eat, '"("']]],
  ['rparen', [[eat, '")"']]],
  ['numstr', [[cat, 'digit numstr'], [val, 'digit']]],
  ['num',    [[num, 'numstr']]],
  ['factor', [[val, 'num'], [val, 'lparen _ expr _ rparen']]],
  ['term',   [[add, 'factor _ plus _ term'], [val, 'factor']]],
  ['expr',   [[mul, 'term _ times _ expr'], [sub, 'term _ minus _ expr'], [val, 'term']]],
  ['stmt',   [[val, '_ expr _']]],
])

const TERMINAL = /^\s*"([^"]*)"\s*$/
function makeParser(productions) {
  const parsers = new Map()
  const parseMemo = new Map()

  for (const [k, rules] of productions) {
    const subRules = rules.map(([fn, rule]) => {
      const term = rule.match(TERMINAL)
      if (term) {
        const t = term[1]
        const f = function * (s, i) {
          if (s.slice(i, i + t.length) === t) {
            yield [i + t.length, fn(t)]
          }
        }
        f.rule = rule
        return f
      }

      const atoms = rule.split(/\s+/).filter(x => x)
      const f = function * (s, i) {

        const recur = function * (ai, i, v) {
          if (ai >= atoms.length) {
            yield [i, fn(...v)]
          } else {
            const atom = atoms[ai]
            const atomParser = parsers.get(atom)
            for (const [j, w] of atomParser(s, i)) {
              yield * recur(ai + 1, j, [...v, ...w])
            }
          }
        }

        yield * recur(0, i, [])
      }
      f.rule = rule

      return f
    })

    parsers.set(k, function * (s, i) {
      for (const subRule of subRules) {
        yield * subRule(s, i)
      }
    })
  }

  return r => s => {
    for (const [j, v] of parsers.get(r)(s, 0)) {
      if (j === s.length) {
        return [true, v]
      }
    }
    return false
  }
}

const testThing = makeParser(rules)('stmt')
console.log(testThing('(1 * 3 + 2)'))

