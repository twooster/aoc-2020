const T = 0
const R = 1
const B = 2
const L = 3
const TILE = 4

const fromBin = (acc, d) => (acc << 1) | d
const computeTile = t => ([
  t[0].reduce(fromBin, 0),
  t.map(l => l[l.length - 1]).reduce(fromBin, 0),
  t[t.length - 1].reduce(fromBin, 0),
  t.map(l => l[0]).reduce(fromBin, 0),
  t
])
const rotateClockwise =
  l => l.map((row, y) => row.map((_, x) => l[row.length - x - 1][y]))
const flipVert = a => a.map((_, y) => a[a.length - y - 1])
// a b c
// d e f
// g h i


/*
const a = ['abc'.split(''), 'hid'.split(''), 'gfe'.split('')]
console.log(a.map(x => x.join('')).join('\n'))
console.log()
console.log(rotateClockwise(a).map(x => x.join('')).join('\n'))
console.log()
console.log(rotateClockwise(rotateClockwise(a)).map(x => x.join('')).join('\n'))
console.log()
console.log(rotateClockwise(rotateClockwise(rotateClockwise(a))).map(x => x.join('')).join('\n'))
*/

const input = new Map(require('fs').readFileSync('./input', 'utf8').split('\n\n')
  .map(s => s.match(/^Tile (\d+):\n(.+)\n?$/sm))
  .map(([,id,lines]) => {
    id = parseInt(id, 10)
    lines = lines.split('\n').filter(x => x).map(s => s.split('').map(x => x === '.' ? 0 : 1))

    const permutations = []

    let last = lines
    let lastMirror = flipVert(lines)
    for (let i = 0; true; ++i) {
      permutations.push(computeTile(last))
      permutations.push(computeTile(lastMirror))
      if (i < 3) {
        last = rotateClockwise(last)
        lastMirror = rotateClockwise(lastMirror)
      } else {
        break
      }
    }
    return [id, permutations]
  }))


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

function findAllTheAnswersToAllTheThings(input) {
  const side = Math.sqrt(input.size)
  if (!Number.isInteger(side)) {
    throw new Error('oh no')
  }
  const corners = [0, side - 1, input.size - 1, input.size - side]

  const placements = findSquarePlacements(input, side)
  console.log('placements', placements)

  const part1Answer = placements
    .filter((_, i) => corners.includes(i))
    .map(([id]) => id)
    .reduce((a, b) => a * b, 1)

}



/*
01234567890123456789
..................#
#....##....##....###
.#..#..#..#..#..#
*/
// return b[o + 0] === 1 && b[o + 5] === 1 && b[o + 6] === 1 && b[o + 11] === 1 && b[o + 12] === 1 && b[o + 17] === 1 && b[o + 18] && b[o + 19] === 1
//   && c[o + 1] === 1 && c[o + 4] === 1 && c[o + 7] === 1 && c[o + 10] === 1 && c[o + 13] === 1 && c[o + 16] === 1
//   && a[o + 18] === 1
//

findAllTheAnswersToAllTheThings(input)
