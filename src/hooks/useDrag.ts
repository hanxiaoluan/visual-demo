import type { Ref } from 'vue'
import { useEventListener } from './useEventListener'
type Position = {
  x: number
  y: number
}
export interface UseDragOptions {
  handle?: Ref<HTMLElement | null | undefined>
  initialValue?: MaybeRef<Position>
  onStart?: (position: Position, event: PointerEvent) => void | false
  onMove?: (position: Position, event: PointerEvent) => void | false
  onEnd?: (position: Position, event: PointerEvent) => void | false
  disabled?: boolean
  draggingElement?: MaybeRef<HTMLElement | Window | Document | null | undefined>
}
export function useDrag (target: MaybeRef<HTMLElement | null | undefined>, options: UseDragOptions = {}) {
  const {
    handle: draggingHandle = target,
    onStart,
    onMove,
    onEnd,
    initialValue = {x: 0, y: 0},
    draggingElement = window
  } = options
  const position = ref<Position>(unref(initialValue))
  const processedDelta = ref<Position>()

  const start = (e:PointerEvent) => {

  }
  const move = (e:PointerEvent) => {

  }
  const end = (e:PointerEvent) => {

  }
  const config = {capture: true}
  useEventListener(draggingHandle, 'pointerdown', start, config)
  useEventListener(draggingElement, 'pointerdown', start, config)
  useEventListener(draggingElement, 'pointerdown', start, config)
}