import { createVNode } from 'vue'

export default defineComponent({
  name: 'Tbody',
  setup (_, {slots}) {
    return () => {
      return createVNode('tbody', null, {default: slots.default})
    }
  }
})