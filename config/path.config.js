import path from 'path';

const srcFolder = 'src';
const jsxFolder = path.join(srcFolder, 'jsx');
const scssFolder = path.join(srcFolder, 'scss');

export default {
  server: {
    src: path.join(srcFolder, 'server.js'),
    dest: path.join('server.js'),
  },
  js: {
    main: path.join(jsxFolder, 'App.jsx'),
    glob: path.join(jsxFolder, '**', '*'),
    dest: path.join('..', 'js')
  },
  css: {
    glob: path.join(scssFolder, '**', '*'),
    dest: path.join('css', 'main.css')
  }
}
