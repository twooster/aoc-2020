const input = require('fs').readFileSync('./input', 'utf8')
  .split('\n').filter(x => x)

const earliestTime = parseInt(input[0], 10)
const buses = input[1].split(',').map(x => x === 'x' ? x : parseInt(x, 10))

console.log(
  buses.reduce(([t, B], b) =>
    b === 'x' || b - (earliestTime % b) > t
      ? [t, B]
      : [b - (earliestTime % b), b],
    [Infinity, Infinity]
  ).reduce((x, y) => x * y, 1)
)

function makeCongruences(buses) {
  return buses.map(x => x === 'x' ? x : +x).reduce(
    (acc, x, i) => x === 'x'
      ? acc
      : (acc.push([(x + ((x - i) % x)) % x, x]), acc),
    []
  )
}

function crt(con) {
  let sum = 0n

  const prod = con.reduce((acc, [_a, n]) => BigInt(n) * acc, 1n)

  for (const [a, n] of con) {
		const p = prod / BigInt(n)
    const addSum = BigInt(a) * mulInv(p, BigInt(n)) * p
		sum += addSum
	}

  while (sum < 0) {
    sum += prod
  }
	return sum % prod
}

function mulInv(a, b) {
  if (b === 1) {
    return 1
  }

  let b0 = b
  let x0 = 0n
  let x1 = 1n
  while (a > 1n) {
    let q = a / b;
    ([a, b] = [b, a%b]);
    ([x0, x1] = [x1 - q * x0, x0]);
  }
  if (x1 < 0n) {
    x1 += b0
  }
  return x1
}

console.log(crt(makeCongruences(buses)))
