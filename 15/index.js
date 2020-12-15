const input = `16,11,15,0,1,7`.split(',').map((x, i) => [+x, i+1])

function nthSpoken(input, n) {
  const mem = new Map(input)

  let lastSpokenTurn = 0
  let turn = input.length + 1
  let toSpeak = 0
  while (true) {
    lastSpokenTurn = mem.get(toSpeak) || 0

    mem.set(toSpeak, turn)

    toSpeak = lastSpokenTurn === 0 ? 0 : (turn - lastSpokenTurn)

    ++turn

    if (turn === n) {
      return toSpeak
    }
  }
}

console.log(nthSpoken(input, 2020))
console.log(nthSpoken(input, 30000000))
