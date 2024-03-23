// 网格线组件
import Grid from './grid'
import { useAppStore } from '@/stores/modules/app'
import { getStyleWithScale } from '@/utils/translate'
import { setEditor, getEditor } from '@/utils/editor'
export default defineComponent({
  name: 'page-editor',
  setup() {
    const appStore = useAppStore()
    const editorStyle = computed(() => {
      const {width, scale, height} = appStore.canvasStyleData
      return {
        width: getStyleWithScale(width, scale) + 'px',
        height: getStyleWithScale(height, scale) + 'px'
      }
    })

    onMounted(() => {
      setEditor()
    })
    return () => (
      <div id="editor" class="editor relative bg-white m-auto" style={editorStyle.value}>
        <Grid isDarkMode={appStore.isDarkMode} />
      </div>
    )
  }
})