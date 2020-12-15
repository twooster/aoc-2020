const input = `16,11,15,0,1,7`.split(',').map((x, i) => [+x, i+1])

function nthSpoken(input, n) {
  const mem = new Map(input)

  let lastSpoken = input[input.length-1][0]
  let lastSpokenTurn = 0

  // Turns are 1-indexed
  for (let turn = input.length + 1; turn <= n; ++turn) {
    const toSpeak = lastSpokenTurn === 0 ? 0 : (turn - 1 - lastSpokenTurn)

    if (turn === n) {
      return toSpeak
    }

    lastSpoken = toSpeak
    lastSpokenTurn = mem.get(lastSpoken) || 0

    mem.set(toSpeak, turn)
  }
}

console.log(nthSpoken(input, 2020))
console.log(nthSpoken(input, 30000000))
