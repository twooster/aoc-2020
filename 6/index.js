console.log(
  require('fs').readFileSync('./input').reduce(
    ([l, b, a, x, s], c, i, u) => c === 10
      ? s || i+1 === u.length
        ? [[...l, [a, b]], ~0]
        : [l, b & x, a | x, , 1]
      : [l, b, a, 1 << (c-97) | x],
    [[], ~0]
  )[0].map(x =>
    x.map(y =>
      // Shorter:
      Array(26).fill().reduce((a, _, i) => a + !!(1 << i & y), 0)
      // Bit-bangy:
      /*
      (c => (((c + (c >> 4)) & 0xF0F0F0F) * 0x1010101) >> 24)(
        (b => (b & 0x33333333) + ((b >> 2) & 0x33333333))(
          a - ((a >> 1) & 0x55555555),
        )
      )
      */
    )
  ).reduce(([a, b], [x, y]) => [a + x, b + y])
)
