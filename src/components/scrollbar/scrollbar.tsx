import Thumb from './thumb'
import type { CSSProperties, StyleValue } from "vue"
import type { ThumbData } from "./interface"
import './index.less'

const prefixCls = 'scrollbar'
const THUMB_MIN_SIZE = 20
const TRACK_SIZE = 15
export default defineComponent({
  name: 'scroll-bar',
  inheritAttrs: false,
  props: {
    /**
     * @zh 类型
     * @en Type
     */
    type: {
      type: String as PropType<'track' | 'embed'>,
      default: 'embed',
    },
    /**
     * @zh 外层的类名
     * @en Outer class
     */
    outerClass: [String, Object, Array],
    disableHorizontal: {
      type: Boolean,
      default: false,
    },
    disableVertical: {
      type: Boolean,
      default: false,
    },
     /**
     * @zh 外层的样式
     * @en Outer style
     */
     outerStyle: {
      type: [String, Object, Array] as PropType<StyleValue>,
    },
  },
  emits: ['scroll'],
  setup(props,{attrs,slots, emit}) {
    const containerRef = ref<HTMLElement>()
    const horizontalData = ref<ThumbData>()
    const verticalData = ref<ThumbData>()
    const horizontalThumbRef = ref()
    const verticalThumbRef = ref()

    const _hasHorizontalScrollbar = ref(false)
    const _hasVerticalScrollbar = ref(false)
    const isBoth = ref(false)

    const hasHorizontalScrollbar = computed(() => _hasHorizontalScrollbar.value && !props.disableHorizontal)
    const hasVerticalScrollbar = computed(() => _hasVerticalScrollbar.value && !props.disableVertical)
    const cls = computed(() => [
      `${prefixCls}`,
      `${prefixCls}-type-${props.type}`,
      {
        [`${prefixCls}-both`]: isBoth.value
      },
      props.outerClass
    ])
    const style = computed(() => {
      const style:CSSProperties = {}
      if (props.type === 'track') {
        if (hasHorizontalScrollbar.value) {
          style.paddingBottom = `${TRACK_SIZE}px`
        }
        if (hasVerticalScrollbar.value) {
          style.paddingRight = `${TRACK_SIZE}px`
        }
      }
      return [style, props.outerStyle]
    })
    const handleScroll = (ev: Event) => {
      if (containerRef.value) {
        if (hasHorizontalScrollbar.value && !props.disableHorizontal) {
          const horizontalOffset = Math.round(
            containerRef.value.scrollLeft / (horizontalData.value?.ratio ?? 1)
          );
          horizontalThumbRef.value?.setOffset(horizontalOffset);
        }
        if (hasVerticalScrollbar.value && !props.disableVertical) {
          const verticalOffset = Math.round(
            containerRef.value.scrollTop / (verticalData.value?.ratio ?? 1)
          );
          console.log('6666', verticalThumbRef.value)
          verticalThumbRef.value?.setOffset(verticalOffset);
        }
      }
      emit('scroll', ev)
    }

    const getContainerSize = () => {
      if (containerRef.value) {
        const {
          clientWidth,
          clientHeight,
          offsetWidth,
          offsetHeight,
          scrollWidth,
          scrollHeight,
          scrollTop,
          scrollLeft,
        } = containerRef.value
        _hasHorizontalScrollbar.value = scrollWidth > clientWidth
        _hasVerticalScrollbar.value = scrollHeight > clientHeight
        isBoth.value = hasHorizontalScrollbar.value && hasVerticalScrollbar.value
        const horizontalTrackWidth = props.type === 'embed' && isBoth.value ? offsetWidth - TRACK_SIZE : offsetWidth
        const verticalTrackHeight = props.type === 'embed' && isBoth.value ? offsetHeight - TRACK_SIZE : offsetHeight
        
        const horizontalThumbWidth = Math.round(horizontalTrackWidth / Math.min(scrollWidth / clientWidth, horizontalTrackWidth / THUMB_MIN_SIZE))
        const maxHorizontalOffset = horizontalTrackWidth - horizontalThumbWidth
        const horizontalRatio = (scrollWidth - clientWidth) / maxHorizontalOffset
        const verticalThumbHeight = Math.round(verticalTrackHeight / Math.min(scrollHeight / clientHeight, verticalTrackHeight / THUMB_MIN_SIZE))
        const maxVerticalOffset = verticalTrackHeight - verticalThumbHeight
        const verticalRatio = (scrollHeight - clientHeight) / maxVerticalOffset

        horizontalData.value = {
          ratio: horizontalRatio,
          thumbSize: horizontalThumbWidth,
          max: maxHorizontalOffset,
        }
        verticalData.value = {
          ratio: verticalRatio,
          thumbSize: verticalThumbHeight,
          max: maxVerticalOffset,
        }

      }
    }
    const handleHorizontalScroll = (_offset: number) => {
      if (!containerRef.value) return
      containerRef.value.scrollTo({left: _offset * (horizontalData.value?.ratio ?? 1)})
    }

    const handleVerticalScroll = (_offset: number) => {
      if (!containerRef.value) return
      containerRef.value.scrollTo({top: _offset * (verticalData.value?.ratio ?? 1)})
    }
    onMounted(() => {
      getContainerSize()
    })
    return () => (
      <div class={cls.value} style={style.value}>
        <div class={`${prefixCls}-container`} {...attrs} onScroll={handleScroll} ref={containerRef}>
          {slots.default?.()}
        </div>
        {hasHorizontalScrollbar.value && <Thumb ref={horizontalThumbRef} direction='horizontal' data={horizontalData.value} onScroll={handleHorizontalScroll} />}
        {hasVerticalScrollbar.value && <Thumb ref={verticalThumbRef} direction='vertical' data={verticalData.value} onScroll={handleVerticalScroll} />}
      </div>
    )
  }
})