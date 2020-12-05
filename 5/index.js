console.log(
  require('fs').readFileSync('./input', 'utf8').split('\n').filter(x => x).map(s =>
    Array.from(s).reduce((a, c) =>
      a << 1 | (c === 'B' || c === 'R' & 1),
      0
    ),
  ).sort((a, b) => a - b).reduce(([x, m], v, i, a) =>
    [
      v,
      m === 0 && v+1 !== a[i+1] ? v+1 : m
    ],
    [0, 0]
  )
)
