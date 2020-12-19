const { memo } = require('../util')
const [rules, inputs] = require('fs').readFileSync('./input', 'utf8').split('\n\n').map(x => x.split('\n').filter(y => y))

const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const TERMINAL = /^"([^"]+)"$/
function makeParser(rules, part2) {
  const map = new Map(rules.map(r => r.split(': ')))
  const _parse = memo(k => {
    if (part2) {
      if (k === '8') {
        return `(${_parse('42')}+)`
      } else if (k === '11') {
        const a = _parse('42')
        const b = _parse('31')
        // Special technique: cheesing the solution for the clock
        return `(${Array(5).fill(0).map((_, i) =>
          `(${a.repeat(i+1)}${b.repeat(i+1)})`).join('|')})`
      }
    }
    const v = map.get(k)
    if (v === undefined) {
      throw new Error(`oh no ${k}`)
    }
    const term = v.match(TERMINAL)
    if (term) {
      return escape(term[1])
    }
    return '(' + v.split('|').map(part => `(${part.split(/\s+/).filter(x=>x).map(p => _parse(p)).join('')})`).join('|') + ')'
  })
  return _parse
}

const part1Rx = new RegExp(`^${makeParser(rules)('0')}$`)
console.log(inputs.reduce((acc, i) => acc + (part1Rx.test(i) & 1), 0))
const part2Rx = new RegExp(`^${makeParser(rules, true)('0')}$`)
console.log(inputs.reduce((acc, i) => acc + (part2Rx.test(i) & 1), 0))

