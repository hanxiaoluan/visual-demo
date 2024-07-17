export function throttleByRaf (fn: Fn) {
  let timer: number
  return () => {
    if (timer) cancelAnimationFrame(timer)
    timer = requestAnimationFrame(fn)
  }
}