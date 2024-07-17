import { Transition, defineExpose, type VNodeRef } from "vue"
import { on, off } from '@/utils/dom'
import type { ThumbData, Direction } from "./interface"
import type { ThumbMap } from "@arco-design/web-vue/es/scrollbar/interface"
const prefixCls = 'scrollbar'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'thumb',
  props: {
    data: {
      type: Object as PropType<ThumbData>,
    },
    direction: {
      type: String as PropType<Direction>,
      default: 'horizontal',
    },
    alwaysShow: {
      type: Boolean,
      default: false,
    },
    both: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const visible = ref(false)
    const trackRef: VNodeRef = ref<HTMLElement>()
    const thumbRef: VNodeRef = ref<HTMLElement>()

    const thumbMap = computed<ThumbMap>(() => {
      if (props.direction === 'horizontal') {
        return {
          size: 'width',
          direction: 'left',
          offset: 'offsetWidth',
          client: 'clientX'
        }
      }
      return {
        size: 'height',
        direction: 'top',
        offset: 'offsetHeight',
        client: 'clientY'
      }
    })

    const offset = ref(0)
    
    const isDragging = ref(false) 
    const mouseOffset = ref(0)

    const thumbCls = computed(() => [
      `${prefixCls}-thumb`,
      `${prefixCls}-thumb-direction-${props.direction}`,
      {
        [`${prefixCls}-thumb-dragging`]: isDragging.value
      }
    ])
    const thumbStyle = computed(() => {
      return {
        [thumbMap.value.size]: `${props.data?.thumbSize ?? 0}px`,
        [thumbMap.value.direction]: `${offset.value}px`
      }
    })

    const handleThumbMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      if (!unref(thumbRef)) return
      mouseOffset.value = e[thumbMap.value.client] - unref(thumbRef).getBoundingClientRect()[thumbMap.value.direction]
      isDragging.value = true
      
      on(window, 'mousemove', handleMouseMove)
      on(window, 'mouseup', handleMouseUp)
      on(window, 'contextmenu', handleMouseUp)
    }

    const handleTrackClick = (e: MouseEvent) => {
      e.preventDefault()
      if (e.currentTarget !== e.target) return
      if (!unref(thumbRef)) return

      const _offset = getLegalOffset(
        e[thumbMap.value.client] > unref(thumbRef).getBoundingClientRect()[thumbMap.value.direction]
          ? offset.value + (props.data?.thumbSize ?? 0)
          : offset.value - (props.data?.thumbSize ?? 0)
      )
      if (_offset !== offset.value) {
        offset.value = _offset
        emit('scroll', _offset)
      }
    }
    const setOffset = (_offset: number) => {
      if (isDragging.value) return
      _offset = getLegalOffset(_offset)
      if (_offset !== offset.value) {
        offset.value = _offset
      }
    }
    function getLegalOffset (offset: number) {
      if (offset < 0) {
        return 0
      }
      if (props.data && offset > props.data.max) {
        return props.data.max
      }
      return offset
    }
    function handleMouseMove (e: MouseEvent) {
      if (!unref(trackRef) || !unref(thumbRef)) return
      const _offset = getLegalOffset(e[thumbMap.value.client] - unref(trackRef).getBoundingClientRect()[thumbMap.value.direction] - mouseOffset.value)
      if (_offset !== offset.value) {
        offset.value = _offset
        emit('scroll', _offset)
      }
    }
    function handleMouseUp () {
      isDragging.value = false
      off(window, 'mousemove', handleMouseMove)
      off(window, 'mouseup', handleMouseUp)
    }
    return {
      trackRef,
      thumbRef,
      thumbCls,
      thumbStyle,
      prefixCls,
      handleThumbMouseDown,
      handleTrackClick,
      setOffset
    }
  },
  render () {
    return  (
      <Transition>
        <div ref={this.trackRef} class={[`${prefixCls}-track`, `${prefixCls}-track-direction-${this.direction}`]} onMousedown={this.handleTrackClick}>
          <div ref={this.thumbRef} class={this.thumbCls} style={this.thumbStyle} onMousedown={this.handleThumbMouseDown}>
            <div class={`${prefixCls}-thumb-bar`}></div>
          </div>
        </div>
      </Transition>
    )
  }
})