const memory = require('fs').readFileSync('./input', 'utf8').split('\n').filter(x => x)
  .map(inst => {
    const [op, arg] = inst.split(/\s+/)
    return { op, arg: +arg }
  })

class Computer {
  constructor(memory) {
    this.memory = memory
    this.counts = memory.map(_ => 0)
    this.ip = 0
    this.acc = 0
  }

  step() {
    const inst = this.memory[this.ip]
    ++this.counts[this.ip]
    switch(inst.op) {
      case 'nop':
        ++this.ip
        break
      case 'acc':
        this.acc += inst.arg
        ++this.ip
        break
      case 'jmp':
        this.ip += inst.arg
        break
      default:
        throw new Error(`Unknown instruction @${this.ip}: ${inst.op}`)
    }
  }
}

const computer = new Computer(memory)
while (true) {
  const inst = computer.memory[computer.ip]
  if (computer.counts[computer.ip] > 0) {
    console.log(computer.acc)
    break
  } else {
    computer.step()
  }
}

outer:
for (let i = 0; i < memory.length; ++i) {
  const inst = memory[i]
  const { op } = inst
  if (op === 'nop' || op === 'jmp') {
    const newMemory = [
      ...memory.slice(0, i),
      { ...inst, op: op === 'nop' ? 'jmp' : 'nop' },
      ...memory.slice(i+1)
    ]
    const computer = new Computer(newMemory)
    while (true) {
      const inst = computer.memory[computer.ip]
      if (inst === undefined) {
        console.log(computer.acc)
        break outer
      }
      if (computer.counts[computer.ip] > 0) {
        break
      }
      computer.step()
    }
  }
}
