import { isNumber, isObject } from "lodash-es"
import { defineComponent, computed, createVNode } from "vue"
import VirtualListItem from './virtual-list-item'
const prefixCls = 'virtual-list'

export default defineComponent({
  name: 'VirtualList',
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
      default: () => ({})
    },
    contentAttrs: {
      type: Object,
      default: () => ({})
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
  components: { VirtualListItem },
  setup(props) {
    const { component, data, itemKey, fixedSize, estimatedSize, buffer, height} = toRefs(props)
    const containerRef = ref<HTMLElement>()
    const contentRef = ref<HTMLElement>()
    
    const mergedComponent = computed(() => {
      if(isObject(component.value)) {
        return {
          container: 'div',
          list: 'div',
          content: 'div',
          ...component.value
        }
      }
      console.log('xxxxxx')
      return {
        container: component.value,
        list: 'div',
        content: 'div'
      }
    })
    const style = computed(() => {
      return {
        height: isNumber(height.value) ? `${height.value}px` : height.value,
        overflow: 'auto'
      }
    })
    const dataKeys = computed(() => {
      data.value.map((item: any, index) => {
        return (item[itemKey.value] ?? index) as string | number
      })
    })
    const currentList = computed(() => {
      if (props.threshold && data.value.length <= props.threshold) {
        return data.value
      }
      return data.value
    })

    const onScroll = (e: Event) => {
      console.log('ssssss')
    }

    return {
      mergedComponent,
      containerRef,
      contentRef,
      currentList,
      style,
      dataKeys,
      onScroll
    }
  },
  render() {
    const {mergedComponent, containerRef, contentRef, style, currentList, paddingPosition, listAttrs, contentAttrs} = this
   
    return (
      <div ref={containerRef} class="virtual-list" style={style} onScroll={this.onScroll}>
        <div style={paddingPosition === 'list' ? {} : {}} {...listAttrs}>
          <div style={paddingPosition === 'content' ? {} : {}} {...contentAttrs} ref={contentRef}>
            {
              currentList.map((item, index) => {
                // const slots = {
                //   default: () => 
                // }
                return <VirtualListItem key={(item as any)[this.itemKey] ?? (index)}>
                  {
                    this.$slots.item?.({item: item})[0]
                  }
                  </VirtualListItem>
              })
            }
          </div>
        </div>
      </div>
    )
  }
})