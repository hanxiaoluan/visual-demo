import type { ComponentPublicInstance } from 'vue'

type MaybeElement = HTMLElement | SVGElement | ComponentPublicInstance | undefined | null

export function unrefElement<T extends MaybeElement>(elRef: MaybeRef<T>) {
  const plain = unref(elRef)
  return (plain as ComponentPublicInstance)?.$el ?? plain
}