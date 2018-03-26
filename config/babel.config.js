export const frontend = {
  presets: [
    [ 'react' ]
  ],
  babelrc: false,
  exclude: 'node_modules/**',
  plugins: [
    'external-helpers'
  ]
};

export const backend = {
  presets: [ 'es2015', 'stage-2' ]
};
