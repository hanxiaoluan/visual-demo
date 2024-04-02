import { EditorMode, useAppStore } from '@/stores/modules/app'
import { selectText } from '@/utils/dom'
import type { ComponentType } from "../component-list"
import { useComponentStore } from '@/stores/modules/component'
import './index.less'
export default defineComponent({
  name: 'text-component',
  props: {
    element: {
      type: Object as PropType<ComponentType>,
      required: true
    }
  },
  setup(props,{emit}) {
    const appStore = useAppStore()
    const componentStore = useComponentStore()
    
    const textRef = ref<HTMLElement | null>(null)
    const canEdit = ref(false)

    const {element} = toRefs(props)

    const setEdit = () => {
      canEdit.value = true
      selectText((textRef.value as HTMLElement))
    }

    const onInput = (e:Event) => {
      emit('input', props.element, (e.target as HTMLElement).innerHTML)
    }
    const renderPreview = () => (
      <div class="preview text">
        <div class="text-inner" innerHTML={element.value.propValue}></div>
      </div>
    )

    const handleMouseDown = (e: MouseEvent) => {
      canEdit.value && e.stopPropagation()
    }
    const onBlur =(e:any) => {
      console.log(e.target.innerHTML, element.value)
    }
    const renderEdit = () => {
      return (
        <div class="text">
          <div
            ref={textRef}
            class={['text-inner',{'text-inner-editable': canEdit.value}]}
            tabindex="0"
            onDblclick={setEdit}
            onInput={onInput}
            onBlur={onBlur}
            onMousedown={handleMouseDown}
            innerHTML={element.value.propValue}
            contenteditable={canEdit.value}>
          </div>
        </div>
      )
    }
    return () => {
      if (appStore.mode === EditorMode.PREVIEW) {
        return renderPreview()
      }
      if (appStore.mode === EditorMode.EDIT) {
        return renderEdit()
      }
    }
  }
})