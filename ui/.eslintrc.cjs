module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    "@typescript-eslint/no-non-null-assertion": 'off'
  }
}
