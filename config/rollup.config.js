import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import scss from 'rollup-plugin-scss';
import pathConfig from './path.config';
import { frontend as babelConfig } from './babel.config';

module.exports = {
  inputOptions() {
    const options = {
      input: pathConfig.js.main,
      plugins: [
        scss({ output: pathConfig.css.dest }),
        resolve({
          extensions: ['.js', '.jsx']
        }),
        babel(babelConfig),
        commonjs({
          namedExports: {
            'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
            'node_modules/react-dom/index.js': ['render']
          }
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify("production")
        }),
      ]
    };

    return options;
  },
  outputOptions: {
    format: 'umd',
    name: 'shopifyReviewWall',
    sourcemap: true,
    globals: {
      react: 'react'
    }
  }
}
