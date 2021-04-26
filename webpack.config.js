const webpack = require('webpack')
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const modeDev = process.env.NODE_ENV !== 'production'

let htmlPageNames = ['index', 'paginas/cursos', 'paginas/inicio', 'paginas/sobre', 'paginas/suporte'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/assets/${name}.html`,
    filename: `${name}.html`,
  })
});

module.exports = {
    mode: modeDev ? 'development': 'production',
    entry: "./main.js",
    output: {
        path: __dirname + '/dist',
        filename: 'navegacao.bundle.js'
    },
    devServer: {
        contentBase: './dist',
        port: 9000
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6
                }
            })
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({}),
        new HtmlWebpackPlugin({ //pega o arquivo html e coloca link dos bundles, e minifica
            title: 'project',
            template: './src/assets/index.html'
        }),
        ].concat(multipleHtmlPlugins),
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        public: 'img/'
                    }
                }
            ]
            },
        ]
    },

}