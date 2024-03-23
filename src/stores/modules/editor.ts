import { defineStore } from 'pinia'

interface AreaData {
  style: {
    top: number
    left: number
    width: number
    height: number
  }
  components: Recordable[]
}
interface EditorState {
  areaData: AreaData
}
const useEditorStore = defineStore({
  id: 'editor',
  state: (): EditorState => ({
    areaData: {
      style: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      components: []
    }
  }),
  actions: {

  }
})