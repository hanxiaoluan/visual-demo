import type { Linter } from 'eslint'
import typescriptEslint from 'typescript-eslint'

export const typescript = (): Linter.Config[] =>
  typescriptEslint.config({
    name: 'white/ts',
    files: ['**/*.?([cm])ts', '**/*.tsx'],
    extends: [...typescriptEslint.configs.recommended],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  }) as Linter.Config[]
