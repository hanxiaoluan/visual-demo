import type { Linter } from 'eslint'
import eslintPluginVue from 'eslint-plugin-vue'
import vueEslintParser from 'vue-eslint-parser'
import typescriptEslint from 'typescript-eslint'

export const vue = (): Linter.Config[] => [
  {
    name: 'white/vue',
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        parser: typescriptEslint.parser,
        sourceType: 'module',
      },
    },
    // rules: {
    //   eslintPluginVue.configs['flat/recommended'].rules
    // }
    // extends: [....configs['']],
    // @ts-ignore
    extends: [...eslintPluginVue.configs['flat/recommended']],
  },
]
