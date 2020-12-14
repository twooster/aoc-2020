exports.memo = function memo(fn) {
  const memo = { val: new Map(), obj: new WeakMap() }
  return function(...args) {
    let cur = memo
    for (const arg of args) {
      let map = typeof arg === 'object' && arg !== null
        ? cur.obj
        : cur.val
      let next = map.get(arg)
      if (!next) {
        next = { val: new Map(), obj: new WeakMap() }
        map.set(arg, next)
      }
      cur = next
    }
    if (!('result' in cur)) {
      cur.result = fn.apply(this, args)
    }
    return cur.result
  }
}
