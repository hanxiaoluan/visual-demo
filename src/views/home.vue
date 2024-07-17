<template>
  <a-scrollbar style="height:200px;overflow: auto;">
    <div style="height: 2000px;width: 2000px; background-color: rgb(106, 121, 255);">Content</div>
  </a-scrollbar>
  <Scrollbar style="height:200px;overflow: auto;margin-top: 50px">
    <div style="height: 2000px;width: 2000px; background-color: rgb(106, 121, 255);">Content</div>
  </Scrollbar>
</template>

<script>
import Scrollbar from '@/components/scrollbar/scrollbar'

export default defineComponent({
  components: { Scrollbar },
})
</script>