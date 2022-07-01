module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
		project: ['./tsconfig.json'],
	},
	plugins: ['react', '@typescript-eslint', 'prettier'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb',
		'airbnb-typescript',
		'prettier',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'react/no-unused-class-component-methods': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'prefer-const': 'warn',

		// airbnb
		'import/no-extraneous-dependencies': 'off',
		'consistent-return': 'off',
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		'import/prefer-default-export': 'off',
		'react/function-component-definition': [
			'error',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'@typescript-eslint/no-shadow': 'off',
		'no-nested-ternary': 'off',
		'react/require-default-props': 'off',
		'react/destructuring-assignment': 'off',
		'jsx-a11y/anchor-is-valid': 'warn',

		// custom
		'@typescript-eslint/explicit-module-boundary-types': [
			'error',
			{
				allowArgumentsExplicitlyTypedAsAny: false,
				allowDirectConstAssertionInArrowFunctions: true,
				allowedNames: [],
				allowHigherOrderFunctions: true,
				allowTypedFunctionExpressions: true,
			},
		],
	},
};
