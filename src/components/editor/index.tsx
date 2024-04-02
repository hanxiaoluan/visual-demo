// 网格线组件
import Grid from './grid'
import Shape from './shape'
import { useAppStore } from '@/stores/modules/app'
import { useComponentStore } from '@/stores/modules/component'
import { componentMap } from '@/custom-components'
import { getStyleWithScale } from '@/utils/translate'
import { setEditor, getEditor } from '@/utils/editor'
import { getStyle } from '@/utils/style'
import type { ComponentType } from '@/custom-components'
import './index.less'

const svgFilterAttrs = ['width', 'height', 'top', 'left', 'rotate']
export default defineComponent({
  name: 'page-editor',
  props: {
    isEdit: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  setup(props) {
    const appStore = useAppStore()
    const compStore = useComponentStore()
    const editorStyle = computed(() => {
      const {width, scale, height} = appStore.canvasStyleData
      return {
        width: getStyleWithScale(width, scale) + 'px',
        height: getStyleWithScale(height, scale) + 'px'
      }
    })
    const onInput = () => {

    }
    const renderComponent = (comp: ComponentType) => {
      const tag = componentMap.get(comp.component)
      const style = getStyle(comp.style, svgFilterAttrs)
      return h(tag!, {
        id: comp.id,
        style,
        propValue: comp.propValue,
        element: comp,
        onInput: onInput,
        class: 'custom-component'
      })
    }
    onMounted(() => {
      setEditor()
    })
    return () => (
      <div id="editor" class={[`editor relative bg-white m-auto`, {'editor-editable': props.isEdit}]} style={editorStyle.value}>
        <Grid isDarkMode={appStore.isDarkMode} />
        {
          compStore.componentData.map((comp, index) => {
            return <Shape element={comp} index={index} style={getStyle(comp.style)} active={compStore.curComponent?.id === comp.id}>
              {renderComponent(comp)}
            </Shape>
          })
        }
      </div>
    )
  }
})