/* Server.js */
const express = require('express');
const debug = require('debug')('devServer')
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const ip = require('ip');
const path = require('path');

const app = express();

const config = {
	env	: process.env.NODE_ENV || 'development',
	compiler_quiet : false,
	compiler_stats : {
		chunks : false,
		chunkModules : false,
		colors : true
	}
};

const ipaddress = ip.address()
const host = process.env.VIRTUAL_HOST || 'localhost';
const port = process.env.PORT || 4000;

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(require('connect-history-api-fallback')());

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig);

  debug('Enable webpack dev and HMR middleware');

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : '/',
    contentBase : path.resolve(__dirname, '..'),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats,
    historyApiFallback: true,
    headers     : { 'Access-Control-Allow-Origin' : '*' }
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(path.resolve(__dirname, '..')));
} else {
  debug(`Server is being run outside of live development mode, meaning it will
  only serve the compiled application bundle in ~/dist. Generally you
  do not need an application server for this and can instead use a web
  server such as nginx to serve your static files. See the "deployment"
  section in the README for more information on deployment strategies.`);

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

app.listen(port)
debug(`Server is now running at [${ipaddress}] http://${host}:${port}.`)

module.exports = app
