const fs = require('fs')

const input = fs.readFileSync('./input', 'utf8')

const passwords = input.split('\n').filter(x => x)
  .map(x => /^(?<min>\d+)-(?<max>\d+) (?<char>.): (?<password>.*)$/.exec(x).groups)
  .map(x => ({ ...x, min: parseInt(x.min, 10), max: parseInt(x.max, 10) }))

let valid = 0
for (const { char, min, max, password }  of passwords) {
  let count = 0
  for (const c of password) {
    if (c === char) {
      ++count
    }
  }
  if (count >= min && count <= max) {
    ++valid
  }
}

console.log(valid)

valid = 0
for (const { char, min, max, password } of passwords) {
  if ((password[min-1] === char) ^ (password[max-1] === char)) {
    ++valid
  }
}
console.log(valid)
