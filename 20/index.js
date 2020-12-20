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

const input = new Map(require('fs').readFileSync('./input', 'utf8').split('\n\n')
  .map(s => s.match(/^Tile (\d+):\n(.+)\n?$/sm))
  .map(([,id,lines]) => {
    id = parseInt(id, 10)
    lines = lines.split('\n').filter(x => x).map(s => s.split('').map(x => x === '#' ? 1 : 0))

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

  const part1Answer = placements
    .filter((_, i) => corners.includes(i))
    .map(([id]) => id)
    .reduce((a, b) => a * b, 1)

  const fullImage = []
  for (let y = 0; y < side; ++y) {
    const offset = y * side
    fullImage.push(...
      placements.slice(offset, offset + side)
        .map(tile => tile[1][TILE].slice(1, -1).map(x => x.slice(1, -1)))
        .reduce((acc, img) => acc.map((row, i) => row.concat(img[i])))
    )
  }

  const countSeaMonsters = img => {
    let seaMonsters = 0
    for (let y = 1; y < img.length - 1; ++y) {
      const a = img[y-1]
      const b = img[y]
      const c = img[y+1]
      for (let x = 0; x < b.length - 19; ++x) {
        seaMonsters +=
          b[x + 0] & b[x + 5] & b[x + 6] & b[x + 11] & b[x + 12] & b[x + 17] & b[x + 18] & b[x + 19]
          & c[x + 1] & c[x + 4] & c[x + 7] & c[x + 10] & c[x + 13] & c[x + 16]
          & a[x + 18]
      }
    }
    return seaMonsters
  }

  const seaMonsters = (() => {
    let last = fullImage
    let lastMirror = flipVert(fullImage)
    for (let i = 0; true; ++i) {
      let c = countSeaMonsters(last)
      if (c > 0) {
        return c
      }
      c = countSeaMonsters(lastMirror)
      if (c > 0) {
        return c
      }
      if (i < 3) {
        last = rotateClockwise(last)
        lastMirror = rotateClockwise(lastMirror)
      } else {
        break
      }
    }
    return 0
  })()

  const part2Answer =
    fullImage.reduce((acc, row) => acc + row.reduce((a, b) => a + b, 0), 0)
    - 15 * seaMonsters

  return [part1Answer, part2Answer]
}



/*
01234567890123456789
..................#
#....##....##....###
.#..#..#..#..#..#

15 # characters
*/

console.log(findAllTheAnswersToAllTheThings(input))
