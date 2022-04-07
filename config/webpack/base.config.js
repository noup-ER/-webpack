/*eslint-disable*/
const path = require("path");

const {rootPath} = require("./etc");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const postcssLoader = require("../utils/postcss.config");

const {VueLoaderPlugin} = require('vue-loader')

//css压缩
const OptimizeCss = require("optimize-css-assets-webpack-plugin")

module.exports = {
    target:"web",
    entry:path.resolve(rootPath,"src/main"),
    output:{
        path:path.resolve(rootPath,"dist"),
        filename:"js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test:/\.css$/,
                use:[process.env.NODE_ENV === 'production'?MiniCssExtractPlugin.loader:"style-loader", "css-loader", postcssLoader]
            },
            {
                test: /\.scss$/,
                use: [process.env.NODE_ENV === 'production'?MiniCssExtractPlugin.loader:"style-loader","css-loader",postcssLoader,"sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            name:"images/[hash].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 忽略node_modules和bower_components目录下的js的文件
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env"
                            ]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title:"自建vue",
            favicon:path.resolve(rootPath,"src/public/maple.svg"),
            minify:{
                removeRedundantAttributes:true, // 删除多余的属性
                collapseWhitespace:true, // 折叠空白区域
                removeAttributeQuotes: true, // 移除属性的引号
                removeComments: true, // 移除注释
                collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
            },
            templateContent:"<div id='app'></div>"
        }),
        new MiniCssExtractPlugin({
            filename:"css/[hash].css"
        }),
        new OptimizeCss()
    ],
    resolve:{
        alias:{
            "@":path.resolve(rootPath,"src")
        },
        extensions:["*",".js",".vue"]
    }
}