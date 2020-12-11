const numbers = require('fs').readFileSync('./input', 'utf8')
  .split('\n').filter(x => x).map(x => +x)
  .sort((a, b) => a-b)

const numbersListWithoutEnd =
      numbers.reduce(
        (acc, value) => ({ prev: acc ? acc : { value: 0 }, value }),
        null
      )
const numbersList = { prev: numbersListWithoutEnd, value: numbersListWithoutEnd.value + 3 }

function part1(elem) {
  let step1 = 0
  let step3 = 0

  let cur = elem
  while (cur) {
    const { value, prev } = cur
    if (prev) {
      const diff = value - prev.value
      if (diff === 3) {
        ++step3
      } else if (diff === 1) {
        ++step1
      }
    }
    cur = prev
  }
  return step1 * step3
}

console.log(part1(numbersList))

function part2(e) {
 }

/*
function memo1(fn) {
  const memo = new WeakMap()
  return v => {
    const memoVal = memo.get(v)
    if (memoVal !== undefined) {
      return memoVal
    }
    const ret = fn(v)
    memoVal.set(v, ret)
    return ret
  }
}

function part2(numbersList) {

  const fn = memo1(l => {
    const { next, value } = l
    if (!next) {
      return 1
    }
    let { next: nextNext } = next
    if (!nextNext) {
      return 1
    }
    let count = 1
    while (nextNext && nextNext.value - value <= 3) {
      nextNext = nextNext.next
    }
    if (nextNext.value - value <= 3) {
    }
  })
}
/*
console.log(
  numbers.sort((a, b) => a - b).reduce(
    ([last, step1, step2, step3], v) => [v, step1 + ((v - last === 1) & 1), step2 + ((v - last === 2) & 1), step3 + ((v - last === 3) & 1)],
    [0, 0, 0, 1]
  )
)
*/

/*
[2, 4, 5, 6]

function fn(a, i) {
  const n = a[i]
  if (i < n.length - 2 && a[n+2] - n < 3) {

  }
  */
