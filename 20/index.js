const T = 0
const R = 1
const B = 2
const L = 3

const input = new Map(require('fs').readFileSync('./input', 'utf8').split('\n\n')
  .map(s => s.match(/^Tile (\d+):\n(.+)\n?$/sm))
  .map(([,id,lines]) => {
    id = parseInt(id, 10)
    lines = lines.replace(/\./g, '0').replace(/#/g, '1').split('\n').filter(x => x)

    const a = lines[0].split('')
    const b = lines.map(l => l[l.length - 1])
    const c = lines[lines.length - 1].split('').reverse()
    const d = lines.map(l => l[0]).reverse()

    const edgeValues = [a, b, c, d]
      .map(e => [parseInt(e.join(''), 2), parseInt(Array.from(e).reverse().join(''), 2)])

    const permutations = Array.from(permutationsOf(edgeValues))
    return [id, permutations]
  }))

function * permutationsOf (e) {
  for (let i = 0; i < 4; ++i) {
    const [t, r, b, l] = [
      e[(0 + i)%4][0],
      e[(1 + i)%4][0],
      e[(2 + i)%4][1],
      e[(3 + i)%4][1],
    ]
    yield [t, r, b, l]
    yield [l, b, r, t]
  }
}

function findSquarePlacements(input, side) {
  function recur(arr, unused, l, t) {
    if (!unused.size) {
      return arr
    }
    for (const id of Array.from(unused)) {
      unused.delete(id)
      const perms = input.get(id)
      const matchPerms = perms.filter(p => (l === undefined || p[L] === l) && (t === undefined || p[T] === t))
      const nextAtTopEdge = (arr.length + 1) >= side
      const nextAtLeftEdge = (arr.length + 1) % side === 0
      const nt = nextAtTopEdge ? arr[arr.length - side + 1][1][B] : undefined
      // side === 3
      // [1, 2, 3]
      for (const perm of matchPerms) {
        arr.push([id, perm])
        const nl = nextAtLeftEdge ? undefined : perm[R]
        if (recur(arr, unused, nl, nt)) {
          return arr
        }
        arr.pop()
      }
      unused.add(id)
    }
  }

  return recur([], new Set(input.keys()))
}

function part1(input) {
  const side = Math.sqrt(input.size)
  if (!Number.isInteger(side)) {
    throw new Error('oh no')
  }
  const corners = [0, side - 1, input.size - 1, input.size - side]
  return findSquarePlacements(input, side)
    .filter((_, i) => corners.includes(i))
    .map(([id]) => id)
}

console.log(part1(input).reduce((a, b) => a * b, 1))
