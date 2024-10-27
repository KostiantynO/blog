import { fixupPluginRules } from '@eslint/compat';
import eJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import ts from 'typescript-eslint';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const js = { configs: { all: eJs.configs.all, recommended: eJs.configs.recommended } };

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
const eslintConfig = [
  {
    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      import: fixupPluginRules(pluginImport),
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx', '.mjs'],
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mjs'],
      },
      'import/extensions': ['.js', '.jsx', '.tsx', '.ts', '.mjs'],
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
        node: true,
      },
    },
  },

  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      parserOptions: {
        // projectService: true,
        tsconfigRootDir: import.meta.dirname,

        // tsconfigRootDir: '.',
        project: ['./tsconfig.json'],
        ecmaFeatures: { jsx: true },
      },

      globals: { ...globals.browser, ...globals.node },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parser: ts.parser,
    },
  },
  js.configs.recommended,
  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  pluginReact.configs.flat.recommended,

  {
    // prettier-ignore

    rules: {
      'react/react-in-jsx-scope':'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/consistent-type-imports': ['warn',{ prefer: 'type-imports', fixStyle: 'separate-type-imports', }],
      "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
      '@typescript-eslint/no-unused-vars': ['warn',{ argsIgnorePattern: '^_' }],
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-misused-promises': ['warn',{ checksVoidReturn: { attributes: false } }],
      "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true, ignoreVoidOperator: true }],


      // personal
      'linebreak-style': ['error', 'unix'],
      'no-shadow': 'error',
      'no-restricted-imports': 'warn',
      'no-param-reassign': ['error', { props: true, /* ignorePropertyModificationsFor: ['req'] */  }],
      'object-shorthand': 'warn',
      'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
      'import/no-unresolved': 'error',
      'import/newline-after-import': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/order': [ 'error', { 'newlines-between': 'always', warnOnUnassignedImports: true, groups: [ 'builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type', 'unknown', ], alphabetize: { order: 'asc', caseInsensitive: true, }, },
      ],
    },
  },
];

export default eslintConfig;
