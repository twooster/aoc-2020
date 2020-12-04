const fs = require('fs')

const input = fs.readFileSync('./input', 'utf8')

const lines = input.split('\n').filter(x => x)
const count = (slope, [dx, dy], tree = '#') =>
  slope.reduce(([c, x, ry], l) =>
    ry > 1
     ? [c, x, ry - 1]
     : [l[x] === tree ? c + 1 : c, (x + dx) % l.length, dy],
  [0, 0, 0])[0]

console.log(count(lines, [3, 1]))
console.log([[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].map(step => count(lines, step)).reduce((a, v) => a * v, 1))
