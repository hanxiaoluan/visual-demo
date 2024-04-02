<template>
  <div class="home h-lvh flex flex-col">
    <div class="header h-[100px] border-b-1 border-black border-solid"></div>
    <section class="flex flex-1">
      <div class="sider h-full" ref="sider" :style="styles">
        sider
        <div class="resize-trigger" @mousedown="onMoveStart">
          <div class="trigger-wrapper"><span class="i-mdi-drag-vertical" /></div>
        </div>
      </div>
     
      <div class="content flex-1">content</div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        width: 200
      }
    },
    created () {
      this.record = {
        direction: '',
        startPageX: 0,
        startPageY: 0,
        startWidth: 0,
        startHeight: 0,
        moving: false,
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      }
    },
    computed: {
      styles(){
        return {
          width: this.width + 'px'
        }
      }
    },
    mounted () {
      this.sider = this.$refs.sider
    },
    methods: {
      onMoveStart(e) {
        console.log(e)
        this.record.moving = true
        this.record.startPageX = e.pageX
        this.record.startPageY = e.pageY
        this.record.startWidth = this.sider.clientWidth
        console.log(this.record, this.sider)
        window.addEventListener('mousemove', this.onMoving)
        window.addEventListener('mouseup', this.onMoveEnd)
        window.addEventListener('contextmenu', this.onMoveEnd)
      },
      onMoving (e) {
        console.log(e)
        if (!this.record.moving) return
        const { startPageX, startPageY, startWidth, startHeight, direction } = this.record
        let newWidth = startWidth
        let newHeight = startHeight

        const offsetX = e.pageX - startPageX
        const offsetY = e.pageY - startPageY

        newWidth = startWidth + offsetX
        this.width = newWidth
        document.body.style.cursor = 'col-resize'
      },
      onMoveEnd (e) {
        console.log(e)
        this.record.moving = false
        window.removeEventListener('mousemove', this.onMoving)
        window.removeEventListener('mouseup', this.onMoveEnd)
        window.removeEventListener('contextmenu', this.onMoveEnd)
        document.body.style.cursor = 'default';
      }
    }
  }
</script>

<style lang="less" scoped>
.section {
  position: relative;
}
.sider {
  border-right: 1px solid #cecece;
  position: relative;
  // color: ;
}
.content {
  margin-left: 50px;
  border-left: 1px solid #cecece;
}
.resize-trigger {
  position: absolute;
  height: 100%;
  cursor: col-resize;
  box-sizing: border-box;
  right: 0px;
  left: unset;
  top: 0px;
  width: 6px;
  background-color: rgb(229, 230, 235);
  .trigger-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
}
</style>