export const frontend = {
  presets: [ [ 'es2015-rollup' ] ],
  plugins: ['babel-plugin-syntax-jsx', ['babel-plugin-inferno', {'imports': true}]],
  babelrc: false,
  exclude: 'node_modules/**'
};

export const backend = {
  presets: [ 'es2015', 'stage-0' ],
  sourceMaps: "inline"
};
