import type { CSSProperties } from "vue";
const NEED_UNIT = [
  'fontSize',
  'width',
  'height',
  'top',
  'left',
  'borderWidth',
  'letterSpacing',
  'borderRadius',
]
export function getStyle(style: CSSProperties, filterKeys: string[] = []) {
  const res: Recordable = {}
  Object.keys(style).map(key => {
    if (filterKeys.includes(key)) return
    if (key === 'rotate') {
      res.transform = key + '(' + style[key] + 'deg)'
      return
    }
    let value = style[key as keyof CSSProperties]
    if (value === '') return
    if(NEED_UNIT.includes(key)) {
      value = parseInt(value as string) + 'px'
    }
    res[key] = value
  })
  return res as CSSProperties
}