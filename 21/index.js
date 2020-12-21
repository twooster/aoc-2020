const input = require('fs').readFileSync('./input', 'utf8')
  .split('\n').filter(x => x).map(x => x.match(/^([\w\s]+)(?:\s\(contains ([^)]+)\))?$/))
  .map(([, ings, alls]) => [
    new Set(ings.split(/\s+/).filter(x => x)),
    new Set(alls.split(/,\s+/).filter(x => x))
  ])

const allIngs = new Set()
const allAllergins = new Set()

for (const [ings, alls] of input) {
  for (const i of ings) {
    allIngs.add(i)
  }
  for (const a of alls) {
    allAllergins.add(a)
  }
}

const alMap = new Map(Array.from(allAllergins).map(
  a => [a, new Set(allIngs)]
  ))

for (const [ings, alls] of input) {
  for (const ing of ings) {
    allIngs.add(ing)
  }

  const ingSet = new Set(ings)
  for (const al of alls) {
    const alSet = alMap.get(al)
    if (!alSet) {
      alMap.set(al, ingSet)
    } else {
      for (const ing of alSet) {
        if (!ingSet.has(ing)) {
          alSet.delete(ing)
        }
      }
    }
  }
}

console.log(Array.from(allIngs).reduce((acc, ing) => {
  for (const [, als] of alMap) {
    if (als.has(ing)) {
      return acc
    }
  }
  const cnt = input.reduce((acc, [ings]) => acc + (ings.has(ing) & 1), 0)
  return acc + cnt
}, 0))

while(true) {
  let reloop = false
  for (const [a, ings] of alMap) {
    if (ings.size === 1) {
      const ing = [...ings][0]
      for (const [b, ings] of alMap) {
        if (a !== b) {
          ings.delete(ing)
        }
      }
    } else {
      reloop = true
    }
  }
  if (!reloop) {
    break
  }
}

console.log([...alMap.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([,s]) => [...s][0]).join(','))
