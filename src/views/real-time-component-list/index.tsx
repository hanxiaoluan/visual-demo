import { useComponentStore } from '@/stores/modules/component'
import './index.less'
export default defineComponent({
  name: 'ComponentList',
  setup () {
    const componentStore = useComponentStore()
    const componentList = computed(() => componentStore.componentData)
    return () => (
      <div class="real-time-component-list">
        {componentList.value.map((item, index) => {
          return (
            <div class="compnent-item flex items-center justify-between" data-index={index}>
              <div class="flex items-center">
                <span class={item.icon}></span>
                <span>{item.label}</span>
              </div>
              <div class="icon-container flex items-center">
                <span class="i-mdi-arrow-up-thin-circle-outline text-[16px] cursor-pointer"></span>
                <span class="i-mdi-arrow-down-thin-circle-outline text-[16px] ml-[6px] cursor-pointer"></span>
                <span class="i-mdi-delete-circle-outline text-[16px] ml-[6px] cursor-pointer"></span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
})