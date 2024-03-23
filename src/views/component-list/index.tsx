import componentList from '@/custom-components/component-list'
import './index.less'
export default defineComponent({
  name: 'ComponentList',
  setup () {
    const onDragstart = (e: DragEvent) => {
      e.dataTransfer?.setData('index', (e.target as HTMLElement).dataset.index!)
    }
    return () => (
      <div class="component-list" onDragstart={onDragstart}>
        {componentList.map((item, index) => {
          return (
            <div class="compnent-item" draggable data-index={index}>  
              <span class={item.icon}></span>
            </div>
          )
        })}
      </div>
    )
  }
})