import type { Ref } from 'vue'
import { throttleByRaf } from '@/utils'
import { useEventListener } from './useEventListener'
type Position = {
  x: number
  y: number
}
type PointerType = 'mouse' | 'touch' | 'pen'
export interface UseDragOptions {
  handle?: Ref<HTMLElement | null | undefined>
  initialValue?: MaybeRef<Position>
  onStart?: (position: Position, event: PointerEvent) => void | false
  onMove?: (position: Position, event: PointerEvent) => void | false
  onEnd?: (position: Position, event: PointerEvent) => void | false
  /**
   * Pointer types that listen to.
   *
   * @default ['mouse', 'touch', 'pen']
   */
  pointerTypes?: PointerType[]
  disabled?: boolean
  draggingElement?: MaybeRef<HTMLElement | Window | Document | null | undefined>,
  containerElement?: MaybeRef<HTMLElement | SVGElement | null | undefined>,
  isThrottle?: Boolean
}

export function useDrag (target: MaybeRef<HTMLElement | null | undefined>, options: UseDragOptions = {}) {
  const {
    handle: draggingHandle = target,
    pointerTypes,
    onStart,
    onMove,
    onEnd,
    initialValue,
    draggingElement = window,
    containerElement,
    isThrottle = true
  } = options
  const position = ref<Position>({x:0, y: 0})
  const pressedDelta = ref<Position>()
  
  const filterPoint = (e: PointerEvent) => {
    if (!pointerTypes) return true
    return pointerTypes.includes(e.pointerType as PointerType)
  }
  const start = (e:PointerEvent) => {
    // 这个属性只能够表明在触发事件的单个或多个按键按下或释放过程中哪些按键被按下了
    if (e.button !== 0) return 
    if (options.disabled || !filterPoint(e)) return
    const container = unref(containerElement)
    const containerRect = unref(container)?.getBoundingClientRect()
    const targetRect = unref(target)!.getBoundingClientRect()

    const pos = {
      x: e.clientX - (container ? targetRect.left - containerRect!.left + container.scrollLeft : targetRect.left),
      y: e.clientY - (container ? targetRect.top - containerRect!.top + container.scrollTop : targetRect.top)
    }

    if (onStart?.(pos, e) === false) return
    pressedDelta.value = pos
  }
  const move = (e:PointerEvent) => {
    // console.log(e)
    if (options.disabled || !filterPoint(e)) return
    if (!pressedDelta.value) return
    const container = unref(containerElement)
    const targetRect = unref(target)!.getBoundingClientRect()
    let {x, y} = position.value
    x = e.clientX - pressedDelta.value.x
    y = e.clientY - pressedDelta.value.y
    if (container) {
      x = Math.min(Math.max(0, x), container.scrollWidth - targetRect.width)
      y = Math.min(Math.max(0, y), container.scrollHeight - targetRect.height)
    }
    position.value = {x, y}
    onMove?.(position.value, e)
  }
  const end = (e:PointerEvent) => {
    if (options.disabled || !filterPoint(e)) return
    if (!pressedDelta.value) return
    pressedDelta.value = undefined
    onEnd?.(position.value, e)
  }
  const config = {capture: true}
  useEventListener(draggingHandle, 'pointerdown', start, config)
  useEventListener(window as any, 'pointermove', isThrottle ? throttleByRaf(move) : move, config)
  useEventListener(window as any, 'pointerup', end, config)
  return {
    position,
    isDragging: computed(() => !!pressedDelta.value)
  }
}
export type UseDraggableReturn = ReturnType<typeof useDrag>