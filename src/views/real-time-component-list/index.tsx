import './index.less'
export default defineComponent({
  name: 'ComponentList',
  setup () {
    const componentList = ref([])
    return () => (
      <div class="real-time-component-list">
        {componentList.value.map((item, index) => {
          return (
            <div class="compnent-item" data-index={index}>  
              <span class={item}></span>
            </div>
          )
        })}
      </div>
    )
  }
})