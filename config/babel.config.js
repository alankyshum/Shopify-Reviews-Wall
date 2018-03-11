export const frontend = {
  presets: [ [ 'es2015-rollup' ] ],
  plugins: ['babel-plugin-syntax-jsx', ['babel-plugin-inferno', {'imports': true}]],
  babelrc: false,
  exclude: 'node_modules/**'
};

export const backend = {
  presets: [ 'es2015', 'stage-2' ],
  plugins: [
    ['babel-plugin-inferno', {'imports': true}],
    'transform-es2015-modules-commonjs',
    'transform-class-properties',
    'transform-object-rest-spread',
    'babel-plugin-syntax-jsx',
    'transform-class-properties'
  ]
};
