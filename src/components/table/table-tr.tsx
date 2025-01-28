import { createVNode } from 'vue'
const prefixCls = 'l-table-tr'

export default defineComponent({
  name: 'Tr',
  props: {
    rowIndex: Number,
    record: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    empty: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props) {
    const cls = computed(() => [
      `${prefixCls}`,
      {
        [`${prefixCls}-empty`]: props.empty
      }
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