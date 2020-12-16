const input = `16,11,15,0,1,7`.split(',').map((x, i) => [+x, i+1])

function nthSpoken(input, n) {
  const mem = Array(n)
  for (const [m, i] of input) {
    mem[m] = i
  }

  let lastSpokenTurn = 0
  let turn = input.length + 1
  let toSpeak = 0
  while (true) {
    lastSpokenTurn = mem[toSpeak] || 0

    mem[toSpeak] = turn

    toSpeak = lastSpokenTurn === 0 ? 0 : (turn - lastSpokenTurn)

    ++turn

    if (turn === n) {
      return toSpeak
    }
  }
}

console.log(nthSpoken(input, 2020))
console.log(nthSpoken(input, 30000000))
