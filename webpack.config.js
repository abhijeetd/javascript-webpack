var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var __DEV__ = process.env.NODE_ENV;


var appEntry = './js/index.js'
var webpackConfig = {
  entry: {
	app: __DEV__ ? [appEntry].concat('webpack-hot-middleware/client?reload=true') : [appEntry]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
	loaders: [
		{ test: /\.css$/, loader: "style-loader!css-loader"			},
		{ test: /\.woff(\?.*)?$/,  loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
		{ test: /\.woff2(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
		{ test: /\.otf(\?.*)?$/,   loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
		{ test: /\.ttf(\?.*)?$/,   loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
		{ test: /\.eot(\?.*)?$/,   loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
		{ test: /\.svg(\?.*)?$/,   loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
		{ test: /\.(gif|png|jpg|jpeg|svg)$/, loader: 'url-loader?limit=8192',
		options:{ 		
		alias:{ '../images/icon-image-sprite.png' : '../images/icon-image-sprite.png', 
		'../images/ui-icons_2e83ff_256x240.png' : '../images/ui-icons_2e83ff_256x240.png'}
		}		}	
		
	]
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template : 'index.html',
      hash     : false,
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        collapseWhitespace : true
      }
    })
  ]
};

if (__DEV__) {
	webpackConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	);
} else {
    webpackConfig.plugins.push(
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
		  compress : {
			unused    : true,
			dead_code : true,
			warnings  : false
		  }
    }));
}
module.exports = webpackConfig;