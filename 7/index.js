// I couldn't find a way to oneline this that didn't
// make me go insane. Sigh.
const bags =
    require('fs').readFileSync('./input', 'utf8').split('\n').filter(x => x)
      .map(s => s.split(/ bags?(?:, | contain (?:no other bags\.)?|\.)/).slice(0, -1))
      .map(([h, ...t]) =>
        [h, t.map(
          s => (([, c, n]) => [n, +c])(/(\d+) (.*)/.exec(s))
        )])


const bagMap = new Map()
for (const [b] of bags) {
  bagMap.set(b, { parents: [] })
}
for (const [parentName, children] of bags) {
  const parent = bagMap.get(parentName)
  parent.children = children.map(([childName, count]) => {
    const child = bagMap.get(childName)
    child.parents.push(parent)
    return { child, count }
  })
}

const shinyGold = bagMap.get('shiny gold')

console.log(
  (work => {
    const seen = new Set()
    let count = 0
    while (work.length) {
      for (const parent of work.pop()) {
        if (!seen.has(parent)) {
          seen.add(parent)
          work.push(parent.parents)
          ++count
        }
      }
    }
    return count
  })([shinyGold.parents])
)

console.log(
  (work => {
    let total = 0
    while (work.length) {
      const [mul, children] = work.pop()
      for (const { child, count } of children) {
        const n = count * mul
        total += n
        work.push([n, child.children])
      }
    }
    return total
  })([[1, shinyGold.children]])
)
