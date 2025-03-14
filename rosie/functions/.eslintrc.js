module.exports = {
  settings: {
    react: {
      version: 'detect', // Automatically detects the React version
    },
  },
  env: {
    node: true, // Ensure node-specific globals like `require` are recognized
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module', // If you're using ES6+ imports/exports
  },
  globals: {
    module: 'readonly',  // Make `module` available globally
    require: 'readonly', // Make `require` available globally
    exports: 'readonly', // Make `exports` available globally
  },
  rules: {
    '@typescript-eslint/no-require-imports': 'off', // Disable the `require` import restriction
    'no-undef': 'off', // Disable undefined variable checks globally
  },
};