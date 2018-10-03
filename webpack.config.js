import path from 'path';

export default {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'src/js/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, '/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.json$/, loader: "json-loader" },
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']},
      {test:  /\.(gif|png|node|jpe?g|svg)$/i, loaders: ['file-loader']}
    ]
  }
}
