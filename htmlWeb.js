const api_key = import.meta.env.VITE_MAP_KEY;
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  entry: 'index.js',
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: './template.html',
      apiUrl: `https://maps.googleapis.com/maps/api/js?key=${api_key}&libraries=places`,
    }),
  ],
};
