const path = require('path');
const ROOT = path.resolve(__dirname, '..');

module.exports = function() {
  return {
    ROOT,
    DEV_SERVER_PORT: 3000,
    DEV_SERVER_HOST: 'localhost',
    sourcePath: path.join(ROOT, 'src'),
    modulesPath: path.join(ROOT, 'node_modules'),
    stylesPath: path.join(ROOT, 'src', 'styles'),
    releasePath: path.join(ROOT, 'release')
  };
};
