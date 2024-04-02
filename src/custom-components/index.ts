import TextComponent from './text'

const componentMap = new Map<string, Component>()

componentMap.set('text', TextComponent)

export {
  componentMap
}

export type { ComponentType } from './component-list'