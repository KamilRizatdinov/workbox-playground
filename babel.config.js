const path = require('path');

function constructConfig() {
  const config = {
    presets: [
      '@babel/preset-react',
      ['@babel/preset-env', {targets: {node: true}}],
    ],
    plugins: [
      '@loadable/babel-plugin'
    ],
    sourceMaps: 'inline',
  };

  return config;
};

module.exports = constructConfig();
