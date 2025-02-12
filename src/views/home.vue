<template>
  <!-- <a-scrollbar style="height:200px;overflow: auto;">
    <div style="height: 2000px;width: 2000px; background-color: rgb(106, 121, 255);">Content</div>
  </a-scrollbar>
  <Scrollbar style="height:200px;overflow: auto;margin-top: 50px">
    <div style="height: 2000px;width: 2000px; background-color: rgb(106, 121, 255);">Content</div>
  </Scrollbar> -->
  <VirtualList :component="component" :data="data" :threshold="50" fixedSize :estimatedSize="25">
  <!-- <VirtualList :component="component" :data="data" :threshold="50"> -->
    <template #item="{item}">
      <div style="height: 25px;">{{ item.label }}</div>
    </template>
  </VirtualList>
  <a-upload :custom-request="customRequest" />
</template>

<script>
import axios from 'axios'
import Scrollbar from '@/components/scrollbar/scrollbar'
import VirtualList from '@/components/virtual-list'
const chunkSize = 20 * 1024
export default defineComponent({
  components: { Scrollbar, VirtualList },
  setup() {
    const list = new Array(10000).fill(1).map((item, index) =>({value: index, label: `第${index}行测试数据，可以查看此时的dom是否是全部渲染，还是部分渲染`}))
      // new Array(60).fill({ value: 1, label: 1 }).map((item, index) => ({ value: String(index), label: `第${index+1}行测试数据，可以查看此时的dom是否是全部渲染，还是部分渲染`}))
    const customRequest = async (option) => {
      const {fileItem} = option
      console.log(fileItem)
      const file = fileItem.file
      const chunks = []
      let startPos = 0
      while(startPos < file.size) {
        chunks.push(file.slice(startPos, startPos + chunkSize))
        startPos += chunkSize
      }

      const randomStr = Math.random().toString().slice(2, 8)
      chunks.map((chunk, index) => {
        const data = new FormData()
        data.set('name', randomStr + '_' + file.name + '-' + index)
        data.append('files', chunk)
        axios.post('http://localhost:3000/book/uploads', data)
      })
    }
    return {
      data: list,
      component: {
        container: 'div'
      },
      customRequest
    }
  }
})
</script>