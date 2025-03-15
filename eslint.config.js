// @ts-check

// import { whiteEslintConfg } from './internal/eslint-config'
import { whiteEslintConfg } from '@white/eslint-config'

export default whiteEslintConfg()
// export default typescriptEslint.config(
//   { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
//   {
//     plugins: {
//       prettier: eslintConfigPrettier,
//     },
//     extends: [
//       eslint.configs.recommended,
//       ...typescriptEslint.configs.recommended,
// ...eslintPluginVue.configs['flat/recommended']
//     ],
//     files: ['**/*.{ts,vue,tsx,js}'],
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       globals: globals.browser,
//       parserOptions: {
//         parser: typescriptEslint.parser,
//       },
//     },
//     rules: {
//       // your rules
//       ...eslintPluginPrettierRecommended.rules,
//       '@typescript-eslint/no-explicit-any': 'off',
//     },
//   },
//   // eslintConfigPrettier,
// )

// import eslint from '@eslint/js'
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
// import eslintPluginVue from 'eslint-plugin-vue'
// import globals from 'globals'
// import typescriptEslint from 'typescript-eslint'

// export default typescriptEslint.config(
//   { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
//   {
//     extends: [
//       eslint.configs.recommended,
//       ...typescriptEslint.configs.recommended,
//       ...eslintPluginVue.configs['flat/recommended'],
//     ],
//     files: ['**/*.{ts,vue,tsx,js}'],
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       globals: globals.browser,
//       parserOptions: {
//         parser: typescriptEslint.parser,
//       },
//     },
//     rules: {
//       // your rules
//       '@typescript-eslint/no-explicit-any': 'off',
//     },
//   },
//   // eslintConfigPrettier,
//   eslintPluginPrettierRecommended,
// )
