import { cloneDeep, uniqueId } from 'lodash-es'
import { useAppStore } from '@/stores/modules/app'
import ToolBar from './tool-bar'
import ComponentList from './component-list'
import RealTimeComponentList from './real-time-component-list'
import Editor from '@/components/editor'
import { getEditor } from '@/utils/editor'
import { setComponentSizeWithScale } from '@/utils/translate'
import componentList from '@/custom-components/component-list'
import './home-view.less'

export default defineComponent({
  setup () {
    const appState = useAppStore()
    const onDrop = (e: DragEvent) => {
      console.log(e)
      e.preventDefault()
      e.stopPropagation()
      const index = e.dataTransfer?.getData('index')
      const editorRect = getEditor().getBoundingClientRect()
      const dragComp = cloneDeep(componentList[Number(index!)])
      dragComp.style.top = e.clientY - editorRect.y
      dragComp.style.left = e.clientX - editorRect.x
      dragComp.id = uniqueId()
      setComponentSizeWithScale(dragComp, appState.canvasStyleData.scale)
    }
    const onDragOver = (e: DragEvent) => {
      e.preventDefault()
    }
    const onMousedown = (e: MouseEvent) => {

    }
    const onMouseover = (e: MouseEvent) => {

    }
    return () => (
      <div class="home h-lvh">
        <ToolBar />
        <main class="relative">
          <aside class="sider">
            <ComponentList />
            <RealTimeComponentList />
          </aside>
          <section class="center">
            <div class="content" onDrop={onDrop} onDragover={onDragOver} onMousedown={onMousedown} onMouseover={onMouseover}>
              <Editor />
            </div>
          </section>
          <aside class="sider-right">

          </aside>
        </main>
      </div>
    )
  }
})