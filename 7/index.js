const bags = require('fs').readFileSync('./input', 'utf8').split('\n')
  .map(s => s.split(/ bags?(?:, | contain (?:no other bags\.)?|\.)/).slice(0, -1))
  .reduce(([P, C], [p, ...t]) =>
    (C[p] = t.map(s => /(\d+) (.*)/.exec(s))
      .map(([,n,c]) => [c, +n])
      .map(([c, n]) => (P[c] = [...(P[c] || []), p], [c, n])), [P, C]),
    [{}, {}]
  )

console.log(bags[0])
console.log(bags[1])

const [parents, children] = bags
let search = parents['shiny gold']
let found = new Set()
while (search.length) {
  const [name, c] = search.pop()
  if (!found.has(name)) {
    found.add(name)
    search.push(...parents[name] || [])
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
