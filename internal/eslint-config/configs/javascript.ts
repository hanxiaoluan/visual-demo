import type { Linter } from 'eslint'
import eslint from '@eslint/js'
import globals from 'globals'

export const javascript = (): Linter.Config[] => [
  // { ...eslint.configs.recommended },
  {
    name: 'white/js',
    languageOptions: {
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    rules: {
      ...eslint.configs.recommended.rules,
    },
  },
]
