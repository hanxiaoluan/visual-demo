import { defineStore } from 'pinia'
import { isUndefined } from 'lodash-es'
import type { ComponentType } from '@/custom-components/component-list'

interface ComponentState {
  componentData: ComponentType[]
  curComponent: null | ComponentType
}

export const useComponentStore = defineStore({
  id: 'component',
  state: (): ComponentState => ({
    componentData: [],
    curComponent: null
  }),
  actions: {
    addComponent (comp: ComponentType, index?: number): void {
      if (isUndefined(index)) {
        this.componentData.push(comp)
        return
      }
      this.componentData.splice(index, 0, comp)
    },
    setCurComponent(comp: ComponentType) {
      this.curComponent = comp
    }
  }
})