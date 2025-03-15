import type { Linter } from 'eslint'
import eslintConfigPrettier from 'eslint-plugin-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export const prettier = (): Linter.Config[] => [
  // {...eslintPluginPrettierRecommended.rules},
  {
    name: 'white/prettier',
    plugins: {
      prettier: eslintConfigPrettier,
    },
    rules: {
      ...eslintPluginPrettierRecommended.rules,
      'prettier/prettier': 'error',
    },
  },
]
