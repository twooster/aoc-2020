const input =
  require('fs').readFileSync('./input', 'utf8')
    .split('\n')
    .filter(x => x)
    .flatMap((row, y) => row.split('').map((state, x) => [y, x, state]))
    .filter(([y, x, state]) => state === '#')


function step3(activeSet) {
  const newActiveSet = new Map()
  const inactiveSet = new Map()

  for (const [s, loc] of activeSet) {
    let count = 0
    const [x, y, z] = loc
    for (let dx = -1; dx <= 1; ++dx) {
      for (let dy = -1; dy <= 1; ++dy) {
        for (let dz = -1; dz <= 1; ++dz) {
          if (dx === 0 && dy === 0 && dz === 0) {
            continue
          }
          const nx = x + dx
          const ny = y + dy
          const nz = z + dz
          const s = `${nx},${ny},${nz}`
          if (activeSet.has(s)) {
            ++count
          } else {
            const inactive = inactiveSet.get(s)
            if (!inactive) {
              inactiveSet.set(s, [1, [nx, ny, nz]])
            } else {
              ++inactive[0]
            }
          }
        }
      }
    }

    if (count === 2 || count === 3) {
      newActiveSet.set(s, loc)
    }
  }

  for (const [s, [cnt, loc]] of inactiveSet) {
    if (cnt === 3) {
      newActiveSet.set(s, loc)
    }
  }

  return newActiveSet
}

function step4(activeSet) {
  const newActiveSet = new Map()
  const inactiveSet = new Map()

  for (const [s, loc] of activeSet) {
    let count = 0
    const [x, y, z, w] = loc
    for (let dx = -1; dx <= 1; ++dx) {
      for (let dy = -1; dy <= 1; ++dy) {
        for (let dz = -1; dz <= 1; ++dz) {
          for (let dw = -1; dw <= 1; ++ dw) {
            if (dx === 0 && dy === 0 && dz === 0 && dw === 0) {
              continue
            }
            const nx = x + dx
            const ny = y + dy
            const nz = z + dz
            const nw = w + dw
            const s = `${nx},${ny},${nz},${nw}`
            if (activeSet.has(s)) {
              ++count
            } else {
              const inactive = inactiveSet.get(s)
              if (!inactive) {
                inactiveSet.set(s, [1, [nx, ny, nz, nw]])
              } else {
                ++inactive[0]
              }
            }
          }
        }
      }
    }

    if (count === 2 || count === 3) {
      newActiveSet.set(s, loc)
    }
  }

  for (const [s, [cnt, loc]] of inactiveSet) {
    if (cnt === 3) {
      newActiveSet.set(s, loc)
    }
  }

  return newActiveSet
}

console.log(step3(step3(step3(step3(step3(step3(
  new Map(input.map(([y, x]) => [`${x},${y},0`, [x, y, 0]]))
)))))).size)


console.log(step4(step4(step4(step4(step4(step4(
  new Map(input.map(([y, x]) => [`${x},${y},0,0`, [x, y, 0, 0]]))
)))))).size)
