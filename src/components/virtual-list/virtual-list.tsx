import { isNumber, isObject } from 'lodash-es'
import { defineComponent, computed } from 'vue'
import VirtualListItem from './virtual-list-item'
import { useSize } from './use-size'
import type { ScrollOptions } from './interface'
export default defineComponent({
  name: 'VirtualList',
  components: { VirtualListItem },
  props: {
    height: {
      type: [Number, String],
      default: 200,
    },
    data: {
      type: Array,
      default: () => [],
    },
    threshold: {
      type: Number,
      default: 0,
    },
    itemKey: {
      type: String,
      default: 'key',
    },
    fixedSize: {
      type: Boolean,
      default: false,
    },
    estimatedSize: {
      type: Number,
      default: 30,
    },
    buffer: {
      type: Number,
      default: 10,
    },
    component: {
      type: [String, Object],
      default: 'div',
    },
    listAttrs: {
      type: Object,
      default: () => ({}),
    },
    contentAttrs: {
      type: Object,
      default: () => ({}),
    },
    paddingPosition: {
      type: String,
      default: 'content',
    },
  },
  emits: {
    scroll: (ev: Event) => true,
    reachBottom: (ev: Event) => true,
  },
  setup(props, { emit }) {
    const {
      component,
      data,
      itemKey,
      fixedSize,
      estimatedSize,
      buffer,
      height,
    } = toRefs(props)
    const containerRef = ref<HTMLElement>()
    const contentRef = ref<HTMLElement>()

    const mergedComponent = computed(() => {
      if (isObject(component.value)) {
        return {
          container: 'div',
          list: 'div',
          content: 'div',
          ...component.value,
        }
      }
      console.log('xxxxxx')
      return {
        container: component.value,
        list: 'div',
        content: 'div',
      }
    })
    const style = computed(() => {
      return {
        height: isNumber(height.value) ? `${height.value}px` : height.value,
        overflow: 'auto',
      }
    })
    const dataKeys = computed(() => {
      return data.value.map((item: any, index) => {
        return (item[itemKey.value] ?? index) as string | number
      })
    })

    const {
      frontPadding,
      behindPadding,
      start,
      end,
      getStartByScroll,
      setItemSize,
      hasItemSize,
      setStart,
      getScrollOffset,
    } = useSize({ dataKeys, contentRef, fixedSize, estimatedSize, buffer })

    const currentList = computed(() => {
      if (props.threshold && data.value.length <= props.threshold) {
        return data.value
      }
      return data.value.slice(start.value, end.value + 1)
    })
    const onScroll = (e: Event) => {
      const { scrollTop, scrollHeight, offsetHeight } = e.target as HTMLElement
      console.log(e.target, scrollTop, scrollHeight, offsetHeight)

      const _start = getStartByScroll(scrollTop)
      if (_start !== start.value) {
        setStart(_start)
        nextTick(() => {
          scrollTo(scrollTop)
        })
      }
      emit('scroll', e)
      const bottom = Math.floor(scrollHeight - (scrollTop + offsetHeight))
      if (bottom <= 0) {
        emit('reachBottom', e)
      }
    }

    const scrollTo = (options: ScrollOptions) => {
      if (containerRef.value) {
        if (isNumber(options)) {
          containerRef.value.scrollTop = options
        } else {
          const _index =
            options.index ?? dataKeys.value.indexOf(options.key ?? '')
          setStart(_index - buffer.value)
          containerRef.value.scrollTop = getScrollOffset(_index)
          nextTick(() => {
            if (containerRef.value) {
              const _scrollTop = getScrollOffset(_index)
              if (_scrollTop !== containerRef.value.scrollTop) {
                containerRef.value.scrollTop = _scrollTop
              }
            }
          })
        }
      }
    }
    return {
      mergedComponent,
      containerRef,
      contentRef,
      currentList,
      style,
      dataKeys,
      onScroll,
      frontPadding,
      behindPadding,
      setItemSize,
      hasItemSize,
    }
  },
  render() {
    const {
      mergedComponent,
      containerRef,
      frontPadding,
      behindPadding,
      contentRef,
      style,
      currentList,
      paddingPosition,
      setItemSize,
      hasItemSize,
      listAttrs,
      contentAttrs,
    } = this

    return (
      <div
        ref={containerRef}
        class='virtual-list'
        style={style}
        onScroll={this.onScroll}>
        <div style={paddingPosition === 'list' ? {} : {}} {...listAttrs}>
          <div
            style={
              paddingPosition === 'content'
                ? {
                    paddingTop: `${frontPadding}px`,
                    paddingBottom: `${behindPadding}px`,
                  }
                : {}
            }
            {...contentAttrs}
            ref={contentRef}>
            {currentList.map((item, index) => {
              // const slots = {
              //   default: () =>
              // }
              return (
                <VirtualListItem
                  key={(item as any)[this.itemKey] ?? index}
                  setItemSize={setItemSize}
                  hasItemSize={hasItemSize}>
                  {this.$slots.item?.({ item: item })[0]}
                </VirtualListItem>
              )
            })}
          </div>
        </div>
      </div>
    )
  },
})
