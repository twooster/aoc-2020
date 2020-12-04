const fs = require('fs')

const input = fs.readFileSync('./input', 'utf8').split('\n')

console.log(
  input.reduce(([c, o], l) =>
  l === ''
    ? [c + ('byr iyr eyr hgt hcl ecl pid'.split(' ').every(k => o.includes(k)) & 1), []]
    : [c, o.concat(l.match(/(\w\w\w):[^\s]+/g).map(x => x.slice(0, 3)))],
  [0, []]
  )
)
