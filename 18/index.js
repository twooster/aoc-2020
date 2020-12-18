const input = require('fs').readFileSync('./input', 'utf8').split('\n').filter(x => x)

const WS = /^\s$/
const NUMERIC = /^\d$/

function * lex(line) {
  for (let i = 0; i < line.length; ++i) {
    let c = line[i]
    if (c === '(') {
      yield ({ type: '(' })
    } else if (c === ')') {
      yield ({ type: ')' })
    } else if (c === '+') {
      yield ({ type: '+' })
    } else if (c === '-') {
      yield ({ type: '-' })
    } else if (c === '*') {
      yield ({ type: '*' })
    } else if (c.match(NUMERIC)) {
      let value = 0
      for (; i < line.length && c.match(NUMERIC); ++i, c = line[i]) {
        value *= 10
        value += parseInt(c, 10)
      }
      --i
      yield ({ type: 'num', value: value })
    } else if (c.match(WS)) {
      continue
    } else {
      throw new Error(`Unknown token: ${c}`)
    }
  }
}

function makeParseFns(line) {
  const iter = lex(line)
  let cur = iter.next()
  let val

  function accept(expType) {
    if (cur.done) {
      return expType === 'done'
    }
    const { type, value } = cur.value
    if (type !== expType) {
      return false
    }
    cur = iter.next()
    val = value
    return true
  }

  function expect([ok, v]) {
    if (!ok) {
      throw new Error('oh no')
    }
    return v
  }

  function getVal() {
    return val
  }

  return { accept, expect, getVal }
}


const add = (lhs, rhs) => lhs + rhs
const sub = (lhs, rhs) => lhs - rhs
const mul = (lhs, rhs) => lhs * rhs
const num = (val) => val
// For debugging:
/*
const add = (lhs, rhs) => ['add', lhs, rhs]
const sub = (lhs, rhs) => ['sub', lhs, rhs]
const mul = (lhs, rhs) => ['mul', lhs, rhs]
const num = (val) => ['val', val]
*/

function part1(lineIter) {
  const { accept, expect, getVal } = makeParseFns(lineIter)

  function term() {
    if (accept('(')) {
      const result = expect(expr())
      expect([accept(')')])
      return [true, result]
    } else if (accept('num')) {
      return [true, num(getVal())]
    }
    return [false]
  }

  function expr() {
    let [ok, lhs] = term()
    if (!ok) {
      return [false]
    }
    while (true) {
      if (accept('+')) {
        lhs = add(lhs, expect(term()))
      } else if (accept('-')) {
        lhs = sub(lhs, expect(term()))
      } else if (accept('*')) {
        lhs = mul(lhs, expect(term()))
      } else {
        break
      }
    }
    return [true, lhs]
  }

  const result = expect(expr())
  expect([accept('done')])
  return result
}


function part2(line) {
  const { accept, expect, getVal } = makeParseFns(line)

  function factor() {
    if (accept('num')) {
      return [true, getVal()]
    } else if (accept('(')) {
      const res = expect(expr())
      expect([accept(')')])
      return [true, res]
    } else {
      return [false]
    }
  }

  function term() {
    let [ok, res] = factor()
    if (!ok) {
      return [false]
    }
    while (accept('+')) {
      res = add(res, expect(factor()))
    }
    return [true, res]
  }

  function expr() {
    let [ok, res] = term()
    if (!ok) {
      return [false]
    }
    while (true) {
      if (accept('*')) {
        res = mul(res, expect(term()))
      } else if (accept('-')) {
        res = sub(res, expect(term()))
      } else {
        break
      }
    }
    return [true, res]
  }

  const result = expect(expr())
  expect([accept('done')])
  return result
}

console.log(input.map(l => part1(l)).reduce((acc, x) => acc + x, 0))
console.log(input.map(l => part2(l)).reduce((acc, x) => acc + x, 0))
