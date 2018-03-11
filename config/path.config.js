import path from 'path';

const srcFolder = 'src';
const jsxFolder = path.join(srcFolder, 'jsx');

export default {
  server: path.join(srcFolder, 'server.js'),
  js: {
    main: path.join(jsxFolder, 'App.jsx'),
    glob: path.join(jsxFolder, '**', '*'),
    dest: path.join('..', 'js')
  },
  css: {
    dest: path.join('css', 'main.css')
  }
}
