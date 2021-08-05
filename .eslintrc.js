module.exports = {
  extends: [
    '@react-native-community',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'sort-keys-fix',
    'prettier',
  ],
  root: true,
  rules: {
    'import/order': 'off',
    'no-console': ['error', { allow: ['warn'] }],
    'no-shadow': 'off',
    'prettier/prettier': 'error',
    semi: ['off'],
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-imports': 'off',
    'sort-keys': 'error',
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
}
