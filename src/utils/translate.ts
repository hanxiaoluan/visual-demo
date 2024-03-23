import { multiply, divide } from 'mathjs'
import type { ComponentType } from '@/custom-components/component-list'
import type { CSSProperties } from 'vue'

const NEED_CHANGE_SIZE_ATTR = ['fontSize', 'width', 'height']

function format(val: number, scale: string): number {
  return multiply(val, divide(parseInt(scale), 100))
}
export function getStyleWithScale(val: number, scale: string): number {
  return format(val, scale)
}

export function setComponentSizeWithScale(component: ComponentType, scale: string) {
  Object.keys(component.style).map(key => {
    if (NEED_CHANGE_SIZE_ATTR.includes(key)) {
      if (key === 'fontSize' || component.style[key as keyof CSSProperties] === '') return
      // @ts-ignore
      component.style[key as keyof CSSProperties] = format(component.style[key as keyof CSSProperties] as number, scale)
    }
  })
}