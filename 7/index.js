const bags = require('fs').readFileSync('./input', 'utf8').split('\n')
  .map(s => s.split(/ bags?(?:, | contain (?:no other bags\.)?|\.)/).slice(0, -1))
  .reduce((a, [p, ...t]) =>
    (t.map(s => /(\d+) (.*)/.exec(s))
     .forEach(([,n,c]) => a[c] = [...(a[c] || []), [p, +n]]), a),
    {}
  )

let search = bags['shiny gold']
let found = new Set()
while (search.length) {
  const [name, c] = search.pop()
  if (!found.has(name)) {
    found.add(name)
    search.push(...bags[name] || [])
  }
}
console.log(found.size)
/*
const z = require('fs').readFileSync('./input', 'utf8').split('\n')
  .map(s => (s.split(/ bags?(?:, | contain (?:no other bags\.)?|\.)/).slice(0, -1)))
  .reduce((a, [p, ...t]) =>
    (t.map(s => /(\d+) (.*)/.exec(s))
     .forEach(([,n,c]) => a[c] = [...(a[c] || []), p]), a),
    {}
  )

const z = require('fs').readFileSync('./input', 'utf8').split('\n').map(
  s => (s.split(/ bags?(?:, | contain (?:no other bags)?|\.)/).slice(0, -1))
).map(([h, ...t]) =>
  t.map(s => /(\d+) (.*)/.exec(s))
   .reduce((l, [,n,b]) => [...l, [b, [h, +n]]], [])
).reduce((a, l) =>

  (l.forEach(([c, [p]]) => (a[c] = [...a[c] || [], p])), a), {}
)

console.log(JSON.stringify(z, null, 2))
*/
