const input = require('fs').readFileSync('./input', 'utf8').split('\n').filter(x => x)
  .map(l => [l[0], parseInt(l.slice(1), 10)])

function part1(input) {
  let x = 0
  let y = 0
  let heading = 0
  for (const inst of input) {
    let [cmd, amt] = inst
    if (cmd === 'R') {
      heading += 360 - amt
      heading %= 360
    } else if (cmd === 'L') {
      heading += amt
      heading %= 360
    } else {
      if (cmd === 'F') {
        if (heading === 0) {
          cmd = 'E'
        } else if (heading === 90) {
          cmd = 'N'
        } else if (heading === 180) {
          cmd = 'W'
        } else if (heading === 270) {
          cmd = 'S'
        } else {
          throw new Error(`oh no! bad heading ${heading}`)
        }
      }
      if (cmd === 'E') {
        x += amt
      } else if (cmd === 'N') {
        y += amt
      } else if (cmd === 'W') {
        x -= amt
      } else if (cmd === 'S') {
        y -= amt
      } else {
        throw new Error(`oh no! bad cmd: ${cmd} ${amt}`)
      }
    }
  }
  return Math.abs(x) + Math.abs(y)
}

console.log(part1(input))

function part2(input) {
  let x = 0
  let y = 0
  let dx = 10
  let dy = 1
  for (const inst of input) {
    let [cmd, amt] = inst
    if (cmd === 'R' || cmd === 'L') {
      if (cmd === 'L') {
        amt = 360 + (360 - amt)
      }
      amt %= 360

      if (amt === 90) {
        ([dx, dy] = [dy, -dx])
      } else if (amt === 180) {
        ([dx, dy] = [-dx, -dy])
      } else if (amt === 270) {
        ([dx, dy] = [-dy, dx])
      } else if (amt === 0) {
        // noop
      } else {
        throw new Error(`oh no! rotate ${amt}`)
      }
    } else if (cmd === 'N') {
      dy += amt
    } else if (cmd === 'E') {
      dx += amt
    } else if (cmd === 'W') {
      dx -= amt
    } else if (cmd === 'S') {
      dy -= amt
    } else if (cmd === 'F') {
      x += (dx * amt)
      y += (dy * amt)
    } else {
      throw new Error(`oh no! bad cmd: ${cmd} ${amt}`)
    }
  }
  return Math.abs(x) + Math.abs(y)
}

console.log(part2(input))
