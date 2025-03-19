import { isObject, isArray } from 'lodash-es'

export function getValueByPath<T = any>(
  obj: Record<string | number, any>,
  path: string | undefined
) {
  if (!obj || !path) return undefined
  path = path.replace(/\[(\w+)\]/g, '.$1')
  const keys = path.split('.')
  if (keys.length === 0) return undefined
  let temp = obj

  for (let i = 0; i < keys.length; i++) {
    if ((!isObject(temp) && !isArray(temp)) || !keys[i]) {
      return undefined
    }
    if (i !== keys.length - 1) {
      temp = temp[keys[i]] as any
    } else {
      return temp[keys[i]] as T
    }
  }

  return undefined
}
