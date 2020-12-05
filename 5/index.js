console.log(
  require('fs').readFileSync('./input', 'utf8').split('\n').filter(x => x).map(s =>
    Buffer.from(s).reduce((a, c) =>
      !(c & 12) | a << 1,
      0
    )
  ).sort((a, b) => a - b).reduce(([x, m], v, i, a) =>
    [
      v,
      m || v+1 === a[i+1] ? m : v+1
    ],
    [0, 0]
  )
)
