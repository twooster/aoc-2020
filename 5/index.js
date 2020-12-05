console.log(
  require('fs').readFileSync('./input').reduce(
    ([l, a], c) => c === 10
      ? [[...l, a], 0]
      : [l, !(c & 12) | a << 1],
    [[], 0]
  )[0].sort((a, b) => a - b).reduce(([x, m], v, i, a) =>
    [
      v,
      m || v+1 === a[i+1] ? m : v+1
    ],
    []
  )
)
