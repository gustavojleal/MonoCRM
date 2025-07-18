const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  // Adiciona fallback para o módulo 'path'
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      path: require.resolve('path-browserify')
    };
    return config;
  },

  // Configura os aliases
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
  })
);