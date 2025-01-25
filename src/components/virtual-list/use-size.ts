import {} from 'vue'

export const useSize = ({
  dataKeys,
  contentRef,
  fixedSize,
  estimatedSize,
  buffer
}: {
  dataKeys: Ref<(string | number)[]>
  contentRef: Ref<HTMLElement | undefined>
  fixedSize: Ref<boolean>
  estimatedSize: Ref<number | undefined>
  buffer: Ref<number>
}) => {
  const firstRangeAverageSize = ref(0)
  const sizeMap = new Map<string | number, number>()
  const total = computed(() => dataKeys.value.length)
  const start = ref(0)
  const isFixed = ref(fixedSize.value)
  const end = ref(0)

  const maxStart = computed(() => {
    const max = total.value - buffer.value * 3
    if (max < 0) return 0
    return max
  })

  const setStart = (index: number) => {
    if (index < 0) {
      start.value = 0
      return
    }
    if (index > maxStart.value) {
      start.value = maxStart.value
      return
    }
    start.value = index
  }
 
  const _estimatedSize = computed(() => {
    if (estimatedSize.value !== 30) {
      return estimatedSize.value
    }
    return firstRangeAverageSize.value || estimatedSize.value
  })

  const setItemSize = (key: string | number, size: number) => {
    sizeMap.set(key, size)
  }

  const getItemSize = (index: number) => {
    if(isFixed.value) {
      return _estimatedSize.value
    }
    const _key = dataKeys.value[index]
    return sizeMap.get(_key) ?? _estimatedSize.value
  }
}