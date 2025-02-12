import {defineComponent, cloneVNode} from 'vue'

export default defineComponent({
  name: 'VirtualListItem',
  props: {
    hasItemSize: {
      type: Function,
      required: true
    },
    setItemSize: {
      type: Function,
      required: true
    }
  },
  setup(props, {slots}) {
    const itemRef = ref<HTMLElement | ComponentPublicInstance>()
    const key = getCurrentInstance()?.vnode.key as string | number
    const setItemSize = () => {
      // @ts-ignore
      const ele = (itemRef.value?.$el ?? itemRef.value) as HTMLElement
      const height = ele?.getBoundingClientRect?.().height ?? ele?.offsetHeight
      if (height) {
        props.setItemSize(key, height)
      }
    }

    onMounted(() => setItemSize())
    onBeforeUnmount(() => setItemSize())

    return () => {
      const child = slots.default?.()[0]
      if (child) {
        return cloneVNode(child, {ref: itemRef}, true)
      }
      return null
    }
  }
})