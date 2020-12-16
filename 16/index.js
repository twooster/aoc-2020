function parse() {
  const input = require('fs').readFileSync('./input', 'utf8').split('\n\n')

  const rules = input[0].split('\n').filter(x=>x).map(r => {
    const [name, rhs] = r.split(':')
    const rules = []
    for (const [, min, max] of rhs.matchAll(/(\d+)-(\d+)/g)) {
      rules.push([+min, +max])
    }
    return [name, rules]
  })

  const myTicket = input[1].split('\n')[1].split(',').map(x => +x)

  const otherTickets = input[2].split('\n').slice(1, -1).map(
    t => t.split(',').map(x => +x)
  )

  return { rules, myTicket, otherTickets }
}

const { rules, myTicket, otherTickets } = parse()

const computeValidity = t => t.map(v =>
  [v, rules.map(([, subrules]) =>
    subrules.some(([min, max]) => v >= min && v <= max))
  ])

const validity = otherTickets.map(computeValidity)

const [validTickets, errSum] =
  validity.reduce(([vt, es], vals) => {
    const e = vals.reduce((a, [v, fieldValidity]) =>
        a + (fieldValidity.includes(true) ? 0 : v),
        0)
    if (e === 0) {
      vt.push(vals)
    }
    return [vt, es + e]
  },
  [[], 0])

console.log(errSum)

//  tickets -> fields -> rule checks
const allValidTickets = [computeValidity(myTicket), ...validTickets]
  .map(x => x.map(x => x[1])) // drop field values

const validRuleForField = new Map(allValidTickets[0].map((r, i) => [i, new Set(r.map((_, i) => i))]))
allValidTickets.forEach(fields =>
  fields.forEach((rules, i) =>
    rules.forEach((rule, j) => rule || validRuleForField.get(i).delete(j))))

const ruleToField = new Map()
while (validRuleForField.size) {
  let foundRule
  for (const [fieldId, rules] of validRuleForField) {
    if (rules.size === 1) {
      foundRule = Array.from(rules)[0]
      ruleToField.set(foundRule, fieldId)
      validRuleForField.delete(fieldId)
      break
    }
  }
  for (const [fieldId, rules] of validRuleForField) {
    rules.delete(foundRule)
  }
}

console.log(rules
  .map(([name], i) => [name, i])
  .filter(([name]) => name.startsWith('departure'))
  .map(([, i]) => i)
  .reduce((acc, ruleId) => acc * myTicket[ruleToField.get(ruleId)], 1)
)


//const rotate2dMatrix = a => a[0].map((_, i) => a.map(bx => bx[i]))

// const fieldToReducedRuleChecks =
//   rotate2dMatrix(
//     rotate2dMatrix(allValidTickets).map(x =>
//       x.reduce((acc, y) => y.map((v, i) => v && acc[i])))
//   ).map((a, i) => [i, a.reduce((acc, v) => acc + (v & 1)), a])
