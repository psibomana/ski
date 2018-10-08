/**
 * Instantiate the express web server used to server the game 
 */
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import config from '../webpack.config'

/* eslint-disable no-console */

const port = process.env.PORT || 5000;
const app = express();

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, '0.0.0.0', function () {
  console.log(`Listening on port ${port}. Hit CTRL-C to stop the server.`);
});
