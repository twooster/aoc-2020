console.log(
  (([l, a]) => ([...l, a]))(require('fs').readFileSync('./input').reduce(
    ([l, a, s], c) => c === 10
      ? s === 1
        ? [[...l, a], 0, 0]
        : [l, a, 1]
      : [l, 1 << (c-97)|a],
    [[], 0, 0]
  )).map(a =>
    [
      i => i - ((i >> 1) & 0x55555555),
      i => (i & 0x33333333) + ((i >> 2) & 0x33333333),
      i => (((i + (i >> 4)) & 0xF0F0F0F) * 0x1010101) >> 24
    ].reduce((a, f) => f(a), a)
  ).reduce((a, v) => a + v)
            /**/
)
