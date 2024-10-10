/*
 * User: CHT
 * Date: 2024/8/6
 * Time: 上午10:04
 **/

const path = require('path')

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: {
      name: 'SuperFlow',
      type: 'var',
      export: 'default'
    },
    libraryTarget: 'umd'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src')],
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    strictExportPresence: true,
    // unknownContextCritical: false,
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      }
    ]
  }
}
