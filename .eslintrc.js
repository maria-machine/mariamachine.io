module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: ['@typescript-eslint', 'react'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    env: {
        jest: true,
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        sourceType: 'module'
    },
    rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/interface-name-prefix': [2, { "prefixWithI": "always" }],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 2,
        'semi': 2
    }
};
