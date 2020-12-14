const { memo } = require('../util')

let numbers = require('fs').readFileSync('./input', 'utf8')
  .split('\n').filter(x => x).map(x => +x)
  .sort((a, b) => a-b)

const numbersList = {
  next: numbers.reduceRight(
    (acc, value) => ({ next: acc, value }),
    null
  ),
  value: 0
}

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

function part2(head) {
  const countRemaining = memo(elem => {
    if (!elem || !elem.next) {
      return 1n
    }
    const { value } = elem
    let count = 0n
    for (elem = elem.next; elem && elem.value - value <= 3; elem = elem.next) {
      count += countRemaining(elem)
    }
    return count
  })
  return countRemaining(head)
}

console.log(part2(numbersList))
