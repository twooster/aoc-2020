const { memo } = require('../util')

let numbers = require('fs').readFileSync('./input', 'utf8')
  .split('\n').filter(x => x).map(x => +x)
  .sort((a, b) => a-b)

numbers = [0, 1, 2, 3]
const numbersList =numbers.reduceRight(
    (acc, value) => ({ next: acc, value }),
    null
  )

function part1(numbersList) {
  let step1 = 0
  let step3 = 1

  let cur = numbersList
  while (cur) {
    const { value, next } = cur
    if (next) {
      const diff = next.value - value
      if (diff === 3) {
        ++step3
      } else if (diff === 1) {
        ++step1
      }
    }
    cur = next
  }
  return step1 * step3
}

console.log(part1(numbersList))

function part2(head, maxGap) {
  const countRemaining = memo(elem => {
    // numbers = [0, 1, 2, 3] 6
    // [0, 1, 2, 3] 6
    // [0, 1, 3] 6
    // [0, 2, 3] 6
    // [0, 3] 6
    //
    //   1 * c([1, 2, 3])
    // + 1 * c([2, 3])
    // + 1 * c([3])
    const { value } = elem
    let count = 1
    let mul = 2

    elem = elem.next
    while (elem && elem.value - value <= maxGap) {
      count += mul * countRemaining(elem)
      mul <<= 1
      elem = elem.next
    }
    return count
  })
  return countRemaining(head)
}

// too low: 153055008

console.log(part2(numbersList, 3))
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
