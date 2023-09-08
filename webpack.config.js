const path = require('path');

module.exports = {
  entry: '../src/index.js', // Entry point of your application
  output: {
    filename: 'main.js', // Name of the output bundle file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },

  devtool: 'inline-source-map',
};
