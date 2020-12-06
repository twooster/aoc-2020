console.log(
  (C =>
    require('fs').readFileSync('./input').reduce(
      ([l, b, a, x, s], c, i, u) => c === 10
        ? s || i+1 === u.length
          ? [[l[0] + C(a), l[1] + C(b)], ~0]
          : [l, b & x, a | x, , 1]
        : [l, b, a, 1 << (c-97) | x],
      [[0, 0], ~0]
    )
  )(y =>
      // Shorter:
      [...Array(26)].reduce((a, _, i) => a + (y >> i & 1), 0)
      // Bit-bangy:
      /*
      (c => (((c + (c >> 4)) & 0xF0F0F0F) * 0x1010101) >> 24)(
        (b => (b & 0x33333333) + ((b >> 2) & 0x33333333))(
          y - ((y >> 1) & 0x55555555),
        )
      )
      */
  )[0]
)
