import type { Linter } from 'eslint'
import { javascript, typescript, prettier, vue } from './configs'

export function whiteEslintConfg(): Linter.Config[] {
  const configs: Linter.Config[] = [
    { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
  ]
  configs.push(...javascript())
  configs.push(...typescript())
  configs.push(...prettier())
  configs.push(...vue())

  return configs
}
