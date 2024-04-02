import type { CSSProperties } from "vue"

export interface ComponentType {
  id?: string
  component: string
  label: string
  propValue: string
  icon: string
  style: CSSProperties
}
// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1
}

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 
}

const _list: ComponentType[] = [
  {
    component: 'text',
    label: '文字',
    propValue: '双击编辑文字',
    icon: 'i-mdi-format-text',
    style: {
      width: 200,
      height: 28,
      fontSize: '',
      fontWeight: 400,
      lineHeight: '',
      letterSpacing: 0,
      color: '',
  },
  },
  {
    component: 'button',
    label: '按钮',
    propValue: '按钮',
    icon: 'i-mdi-button-pointer',
    style: {
      width: 100,
      height: 34,
      borderWidth: 1,
      borderColor: '',
      borderRadius: '',
      fontSize: '',
      fontWeight: 400,
      lineHeight: '',
      letterSpacing: 0,
      color: '',
      backgroundColor: '',
  },
  },
  {
    component: 'Picture',
    label: '图片',
    propValue: '按钮',
    icon: 'i-mdi-picture',
    style: {
      width: 300,
      height: 200,
      borderRadius: '',
    },
  },
  {
    component: 'RectShape',
    label: '矩形',
    propValue: '&nbsp;',
    icon: 'i-mdi-rectangle-outline',
    style: {
      width: 200,
      height: 200,
      fontSize: '',
      fontWeight: 400,
      lineHeight: '',
      letterSpacing: 0,
      textAlign: 'center',
      color: '',
      borderColor: '#000',
      borderWidth: 1,
      backgroundColor: '',
      borderStyle: 'solid',
      borderRadius: '',
      verticalAlign: 'middle',
    },
  }
]

const componentList: ComponentType[] = []
for (let i = 0; i < _list.length; i++) {
  const item = _list[i]
  item.style = {...commonStyle, ...item.style} as CSSProperties
  componentList.push(item)
}

export default componentList