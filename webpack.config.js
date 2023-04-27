const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const { configureSharedWebpack } = require('./webpack.shared');
const packageJson = require('./package.json');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'atom',
    projectName: 'game-management',
    webpackConfigEnv,
    argv
  });

  return merge(defaultConfig, configureSharedWebpack(webpackConfigEnv), {
    output: {
      publicPath: '/'
    },

    devServer: {
      port: webpackConfigEnv.port || 9002,
      liveReload: false,
      hot: false,
      webSocketServer: false
    },
    externals: [/^@atom/, ...packageJson.externalDeps]
  });
};
