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

const [validValidity, errSum] =
  validity.reduce(([vv, es], vals) => {
    const e = vals.reduce((a, [v, validity]) =>
        a + (validity.includes(true) ? 0 : v),
        0)
    if (e === 0) {
      vv.push(vals)
    }
    return [vv, es + e]
  },
  [[], 0])

console.log(errSum)

const fullValidity = [computeValidity(myTicket), ...validValidity]

const convolve = a => a[0].map((_, i) => a.map(bx => bx[i]))
const fieldValidity = convolve(fullValidity.map(x => x.map(x => x[1])))


