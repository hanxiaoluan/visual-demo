<template>
  <!-- <a-scrollbar style="height:200px;overflow: auto;">
    <div style="height: 2000px;width: 2000px; background-color: rgb(106, 121, 255);">Content</div>
  </a-scrollbar>
  <Scrollbar style="height:200px;overflow: auto;margin-top: 50px">
    <div style="height: 2000px;width: 2000px; background-color: rgb(106, 121, 255);">Content</div>
  </Scrollbar> -->
  <VirtualList :component="component" :data="data" :threshold="50">
    <template #item="{item}">
      <div>{{ item.label }}</div>
    </template>
  </VirtualList>
</template>

<script>
import Scrollbar from '@/components/scrollbar/scrollbar'
import VirtualList from '@/components/virtual-list'

export default defineComponent({
  components: { Scrollbar, VirtualList },
  setup() {
    const list = new Array(10000).fill(1).map((item, index) =>({value: index, label: `第${index+1}行测试数据，可以查看此时的dom是否是全部渲染，还是部分渲染`}))
      // new Array(60).fill({ value: 1, label: 1 }).map((item, index) => ({ value: String(index), label: `第${index+1}行测试数据，可以查看此时的dom是否是全部渲染，还是部分渲染`}))

    return {
      data: list,
      component: {
        container: 'div'
      }
    }
  }
})
</script>