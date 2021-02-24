module.exports = {
  rules: {
    'no-console': 0,
    'react/forbid-prop-types': 0,
    'linebreak-style': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'no-case-declarations': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'prettier/prettier': ['error'],
    'react/jsx-props-no-spreading': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['babel', 'react', 'prettier'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
};
