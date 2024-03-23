import './index.less'
import { useDrag } from '@/hooks/useDrag'
export default defineComponent({
  name: 'ToolBar',
  setup() {
    const el = ref()
    useDrag(el)
    return () => (
      <div class="home-header">
        <a-space class="toolbar">
          <a-button ref={el}>JSON</a-button>
          <a-button>导入</a-button>
          <a-button>导出</a-button>
          <a-button>撤销</a-button>
          <a-button>重做</a-button>
          <a-button>插入图片</a-button>
          <a-button>预览</a-button>
          <a-button>保存</a-button>
          <a-button>清空画布</a-button>
          <a-button>组合</a-button>
          <a-button>拆分</a-button>
          <a-button>锁定</a-button>
          <a-button>解锁</a-button>
          <a-button>截图</a-button>
        </a-space>
      </div>
    )
  }
})