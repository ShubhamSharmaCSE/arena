const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (options, webpack) => {
  return {
    ...options,
    entry: ['./src/main.ts'],
    externals: [nodeExternals()],
    plugins: [
      ...options.plugins,
      new NodePolyfillPlugin(),
    ],
    output: {
      ...options.output,
      path: path.join(__dirname, 'dist'),
      filename: 'main.js',
    },
    resolve: {
      ...options.resolve,
      fallback: {
        ...options.resolve?.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/'),
        util: require.resolve('util/'),
      },
    },
  };
};
