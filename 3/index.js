console.log(
  (I =>
    [
      [[3, 1]],
      [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
    ].map(s =>
      s.map(([dx, dy]) =>
        I.reduce(
          ([c, x, ry], l) =>
            ry > 1
             ? [c, x, ry - 1]
             : [c + (l[x] === '#' & 1), (x + dx) % l.length, dy],
          [0, 0, 0]
        )[0]
      ).reduce((a, v) => a * v)
    )
  )(require('fs').readFileSync('./input', 'utf8').split('\n').filter(x => x))
)
