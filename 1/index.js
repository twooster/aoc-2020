const fs = require('fs')

const input = fs.readFileSync('./input', 'utf8')

const numbers = input.split('\n').filter(x => x).map(x => parseInt(x, 10))

function nwise(l, n, fn, s = 0, v = []) {
  for (let i = s; i < l.length; ++i) {
    const result = n === 1
      ? fn(...v, l[i])
      : nwise(l, n-1, fn, i + 1, [...v, l[i]])
    if (result !== undefined) {
      return result
    }
  }
}

console.log(nwise(numbers, 2, (a, b) => {
  if (a + b === 2020) {
    return a * b
  }
}))

console.log(nwise(numbers, 3, (a, b, c) => {
  if (a + b + c === 2020) {
    return a * b * c
  }
}))
