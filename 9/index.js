const input = require('fs').readFileSync('./input', 'utf8').split('\n').filter(x => x).map(x => +x)

const buildSums = list =>
  list.reduce((acc, v, i, l) =>
    (acc.push(l.slice(i+1).map(x => v + x)), acc), [])

function shiftInValue(values, sums, v, offset) {
  const len = values.length
  for (let i = 0; i < len - 1; ++i) {
    const offsetI = (i + offset + 1) % len
    sums[offsetI].push(values[offsetI] + v)
  }
  const offsetI = (len - 1 + offset + 1) % len
  values[offsetI] = v
  sums[offsetI] = []
}

const isValid = (sums, v) => sums.some(arr => arr.includes(v))

const values = input.slice(0, 25)
const remaining = input.slice(25)
const sums = buildSums(values)

const firstInvalid =
  remaining.find((v, i) => !isValid(sums, v) || shiftInValue(values, sums, v, i))

console.log(firstInvalid)

function findContigSumMinMax(values, searchSum) {
  let i = 0
  let j = 0
  let sum = values[i]
  while (j < values.length) {
    while (sum < firstInvalid && ++j < values.length) {
      sum += values[j]
    }
    if (j < values.length) {
      for (; sum > firstInvalid && i <= j; ++i) {
        sum -= input[i]
      }
    }
    if (sum === searchSum) {
      let min = Infinity
      let max = -Infinity
      for (;i <= j; ++i) {
        const v = values[i]
        if (v < min) {
          min = v
        }
        if (v > max) {
          max = v
        }
      }
      return [min, max]
    }
  }
}

console.log(findContigSumMinMax(input, firstInvalid).reduce((a, v) => a+v))
