import {defineComponent, cloneVNode} from 'vue'

export default defineComponent({
  name: 'VirtualListItem',
  setup(props, {slots}) {
    const itemRef = ref<HTMLElement | ComponentPublicInstance>()
    return () => {
      const child = slots.default?.()[0]
      console.log(child)
      if (child) {
        return cloneVNode(child, {ref: itemRef}, true)
      }
      return null
    }
  }
})