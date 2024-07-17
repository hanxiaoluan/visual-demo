import { useComponentStore } from '@/stores/modules/component'
import { setInEditorStatus, setIsClickComponent } from '@/utils/editor'
import { getEditor } from '@/utils/editor'
import { getStyle } from '@/utils/style'
import type { ComponentType } from "@/custom-components"
import type { PropType } from "vue"
import './shape.less'
// import { useDrag as useDraggable} from '@/hooks/useDrag'
import {useDraggable} from '@vueuse/core'
const POINT_LIST = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'] as const // 八个方向
const POINT_LIST2 = ['r', 'l'] as const
const ANGLE_TO_CURSOR = [
  { start: 338, end: 23, cursor: 'nw' },
  { start: 23, end: 68, cursor: 'n' },
  { start: 68, end: 113, cursor: 'ne' },
  { start: 113, end: 158, cursor: 'e' },
  { start: 158, end: 203, cursor: 'se' },
  { start: 203, end: 248, cursor: 's' },
  { start: 248, end: 293, cursor: 'sw' },
  { start: 293, end: 338, cursor: 'w' },
] as const // 每个范围对应的光标
export default defineComponent({
  props: {
    active: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    index: {
      type: Number as PropType<number>,
      required: true
    },
    element: {
      type: Object as PropType<ComponentType>,
      required: true
    }
  },
  setup (props, {slots}) {
    const componentStore = useComponentStore()
    const getCursor = () => {
      const result: Record<typeof POINT_LIST[number], string> = {} as  Record<typeof POINT_LIST[number], string>
      POINT_LIST.map((point, index) => {
        result[point] = ANGLE_TO_CURSOR[index].cursor
      })
      return result
    }
    const cursorMap: Record<typeof POINT_LIST[number], string>= getCursor()
    const dragHandle = ref(null)

    const {position, isDragging} = useDraggable(dragHandle, {
      containerElement: getEditor(),
      initialValue: {
        x: props.element.style.left as number,
        y: props.element.style.top as number
      }
    })
    function onMove() {
      console.log(position.value)
    }
    const getPointStyle = (point: typeof POINT_LIST[number]) => {
      const {width, height} = props.element.style as {width: number, height: number}
      const isTop = /t/.test(point)
      const isBottom = /b/.test(point)
      const isLeft = /l/.test(point)
      const isRight = /r/.test(point)
      let newLeft = 0, newTop = 0

      if (point.length === 2) {
        newLeft = isLeft ? 0 : width
        newTop = isTop ? 0 : height
      } else {
        if (isTop || isBottom) {
          newLeft = width / 2
          newTop = isTop ? 0 : height
        }

        if (isLeft || isRight) {
          newLeft = isLeft ? 0 : width
          newTop = height / 2
        }
      }

      return {
        marginLeft: '-4px',
        marginTop: '-4px',
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: cursorMap[point]
      }
    }
    const styles = computed(() => {
      return {
        ...getStyle(props.element.style),
        left: position.value.x + 'px',
        top: position.value.y + 'px'
      }
    })
    const onShapeClick = (e: MouseEvent) => {
      setInEditorStatus(true)
      setIsClickComponent(true)
      e.stopPropagation()
      componentStore.setCurComponent(props.element)
    }

    return () => (
      <div ref={dragHandle} class={['shape',{'shape-active': props.active}]} onClick={onShapeClick} style={styles.value}>
        {
          props.active && POINT_LIST.map(item => (
            <span class={`shape-point shape-point-${item} i-mdi-checkbox-blank-circle-outline`} style={getPointStyle(item)}></span>
          ))
        }
        {
          slots.default?.()
        }
      </div>
    )
  }
})