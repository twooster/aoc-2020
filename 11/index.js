const input = require('fs').readFileSync('./input', 'utf8').split('\n')
  .filter(x => x)
  .map(r => r.split(''))

function step(rows, limit, countSeats) {
  const outRows = Array(rows.length)
  for (let y = 0; y < rows.length; ++y) {
    const row = rows[y]
    const outRow = Array(row.length)
    outRows[y] = outRow
    for (let x = 0; x < row.length; ++x) {
      const state = row[x]

      const count = countSeats(y, x, rows)

      if (state === 'L' && count === 0) {
        outRow[x] = '#'
      } else if (state === '#' && count >= limit) {
        outRow[x] = 'L'
      } else {
        outRow[x] = state
      }
    }
  }
  return outRows
}

function countStable(seating, limit, countSeats) {
  let last = seating
  while (true) {
    const next = step(last, limit, countSeats)
    const same = next.every((row, y) =>
      row.every((spot, x) => spot === last[y][x])
    )
    if (same) {
      break
    }
    last = next
  }
  return last.reduce((acc, row) =>
    acc + row.reduce((acc, seat) => acc + (seat === '#' ? 1 : 0), 0), 0)
}

const adjacentCount = (y, x, rows) =>
  [-1, 0, 1].reduce(
    (ay, dy) => ay + [-1, 0, 1].reduce(
      (ax, dx) => ax + (
        dx === 0 && dy === 0
        ? 0
        : (((rows[y + dy] || [])[x + dx] === '#') & 1)
      ),
      0
    ),
    0
  )

const losCount = (y, x, rows) => {
  let count = 0
  for (let dy = -1; dy <= 1; ++ dy) {
    for (let dx = -1; dx <= 1; ++ dx) {
      if (dy === 0 && dx === 0) {
        continue
      }
      let y0 = y
      let x0 = x
      while (true) {
        y0 += dy
        x0 += dx
        const value = (rows[y0] || [])[x0]
        if (value === '.') {
          continue
        } else if (value === '#') {
          ++count
        }
        break
      }
    }
  }
  return count
}

console.log(countStable(input, 4, adjacentCount))
console.log(countStable(input, 5, losCount))
