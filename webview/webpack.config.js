const path = require('path');

module.exports = {
  target: 'web',
  mode: 'development',
  
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  }
};
