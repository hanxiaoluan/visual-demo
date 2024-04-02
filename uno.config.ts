import {defineConfig, presetUno, presetIcons} from 'unocss'
import componentList from './src/custom-components/component-list'
const iconList = componentList.map(item => item.icon)

export default defineConfig({
  presets: [presetUno(), presetIcons({
    collections: {
      mdi: () => import('@iconify-json/mdi/icons.json').then(m => m.default)
    }
  })],
  safelist: [...iconList,'i-mdi-checkbox-blank-circle-outline']
})