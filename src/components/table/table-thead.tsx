import { createVNode } from 'vue'

export default defineComponent({
  name: 'Thead',
  setup (_, {slots}) {
    return () => {
      return createVNode('thead', null, {default: slots.default})
    }
  }
})