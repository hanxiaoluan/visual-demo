import { createVNode } from 'vue'
const prefixCls = 'l-table-tr'

export default defineComponent({
  name: 'Tr',
  props: {
    rowIndex: Number,
    record: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  setup() {
    const cls = computed(() => [
      `${prefixCls}`
    ])

    return {
      cls
    }
  },
  render () {
    return (
      createVNode('tr', {
        class: this.cls
      }, {
        default: this.$slots.default
      })
    )
  }
})