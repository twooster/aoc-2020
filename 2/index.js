console.log(
  require('fs').readFileSync('./input', 'utf8').split('\n').filter(x => x)
    .map(x => /^(?<m>\d+)-(?<M>\d+) (?<C>.): (?<p>.*)$/.exec(x).groups)
    .map(({ m, M, ...x }) => ({ ...x, m: parseInt(m, 10), M: parseInt(M, 10) }))
    .reduce(([c1, c2], { m, M, C, p }) =>
    [
      (c => c1 + ((c >= m && c <= M) & 1))(Array.from(p).reduce((a, c) => a + (c === C & 1), 0)),
      c2 + ((p[m-1] === C) ^ (p[M-1] === C) & 1),
    ],
    [0, 0]
  )
)
