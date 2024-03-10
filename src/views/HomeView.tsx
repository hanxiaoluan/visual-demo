import ToolBar from './tool-bar'
import './home-view.less'

export default defineComponent({
  setup () {
    return () => (
      <div class="home h-lvh">
        <ToolBar />
        <main class="relative">
          <aside class="sider">
            
          </aside>
          <section>

          </section>
          <aside class="sider-right">

          </aside>
        </main>
      </div>
    )
  }
})