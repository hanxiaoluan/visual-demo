import { tryOnScopeDispose } from './tryOnScopeDispose'
import { unrefElement } from '@/utils/unrefElement'
export function useEventListener<E extends keyof HTMLElementEventMap>(
  target: MaybeRef<HTMLElement | null | undefined>,
  event: Arrayable<E>, 
  listener: Arrayable<Fn>,
  options: any
) {
  const events: Array<string> = Array.isArray(event) ? event : [event]
  const listeners: Array<Fn> = Array.isArray(listener) ? listener : [listener]
  const cleanups: Function[] = []
  const cleanup = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }

  const register = (el: any, event: string, listener: any, options: any) => {
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }

  const stopWatch = watch(() => unrefElement(target), el => {
    cleanup()
    if (!el) return
    const newCleans = events.flatMap(e => {
      return listeners.map(listener => register(el, e, listener, options))
    })
    
    cleanups.push(...newCleans)
  }, { immediate: true, flush: 'post' })
  const stop = () => {
    stopWatch()
    cleanup()
  }
  tryOnScopeDispose(stop)

  return stop
}