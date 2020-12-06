console.log(
  (([l, b, a, x]) => ([...l, [a, b]]))(require('fs').readFileSync('./input').reduce(
    ([l, b, a, x, s], c) => c === 10
      ? s
        ? [[...l, [a, b]], ~0]
        : [l, b & x, a | x, , 1]
      : [l, b, a, 1 << (c-97) | x],
    [[], ~0]
  )).map(x =>
    x.map(y =>
      // Shorter:
      Array(26).fill(0).reduce((a, _, i) => a + !!((1 << i) & y), 0)
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
