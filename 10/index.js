const numbers = require('fs').readFileSync('./input', 'utf8')
  .split('\n').filter(x => x).map(x => +x)
  .sort((a, b) => a-b)

function part1(numbers) {
  return numbers.reduce(([s1, s3, l], n) =>
    [s1 + (n - l === 1 & 1), s3 + (n - l === 3 & 1), n],
    [0, 1, 0]
  ).slice(0,2).reduce((a, b) => a * b)
}

console.log(part1(numbers))

function part2(numbers, maxGap) {
  numbers = [0, ...numbers]
  const counts = Array(numbers.length)
  counts[counts.length - 1] = 1n
  for (let i = numbers.length - 2; i >= 0; --i) {
    const value = numbers[i]
    let count = 0n
    for (let j = i+1; j < numbers.length && numbers[j] - value <= maxGap; ++j) {
      count += counts[j]
    }
    counts[i] = count
  }
  return counts[0]
}

console.log(part2(numbers, 3))
