const fs = require('fs');
const path = require('path');

const nodeModules = path.resolve(__dirname, '../node_modules')
const externals = fs
  .readdirSync(nodeModules)
  .filter(
    x =>
      !/\.bin|babel-plugin-universal-import|react-universal-component|webpack-flush-chunks|react-dom\/server/.test(
        x
      )
  )
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});
externals['react-dom/server'] = 'commonjs react-dom/server';

module.exports = externals;
