import { defineStore } from "pinia";

interface CanvasStyleData {
  width: number
  height: number
  scale: string
  color: string
  opacity: number
  background: string
  fontSize: number
}
interface AppState {
  canvasStyleData: CanvasStyleData
  isDarkMode: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    canvasStyleData: { // 页面全局数据
      width: 1200,
      height: 740,
      scale: '100',
      color: '#000',
      opacity: 1,
      background: '#fff',
      fontSize: 14,
    },
    isDarkMode: false
  }),
  actions: {
    aceSetCanvasData(state: Recordable<CanvasStyleData>) {
      this.canvasStyleData = {...this.canvasStyleData, ...state}
    },
    setDarkMode(isDarkMode: boolean) {
      this.isDarkMode = isDarkMode
    }
  }
})

