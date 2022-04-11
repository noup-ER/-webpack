/*eslint-disable*/
const {merge} = require("webpack-merge");
const baseconfig = require("./base.config");
const path = require("path")
const {rootPath,port} = require("./etc");
const webpack = require("webpack")

var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");


module.exports = merge(baseconfig,{
    mode:"development",
    entry:[path.resolve(rootPath,"src/main"),'webpack-hot-middleware/client'],
    output:{
        filename:"js/[name].js",
        path: path.resolve(rootPath,"dist")
    },
    devServer:{
      hot:true
    },
    stats:"errors-only",
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
           "process.env.NODE_ENV":JSON.stringify("development")
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here http://localhost:${port}`],
                notes: [`You bundle analyzer is running here http://localhost:3003`]
            },
            onErrors: function (severity, errors) {
                console.log(errors);
            },
            // should the console be cleared between each compilation?
            // default is true
            clearConsole: true,

            // add formatters and transformers (see below)
            additionalFormatters: [],
            additionalTransformers: []
        }),
        new BundleAnalyzerPlugin({
            //  可以是`server`，`static`或`disabled`。
            //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
            //  在“静态”模式下，会生成带有报告的单个HTML文件。
            //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
            analyzerMode: 'server',
            //  将在“服务器”模式下使用的主机启动HTTP服务器。
            analyzerHost: '127.0.0.1',
            //  将在“服务器”模式下使用的端口启动HTTP服务器。
            analyzerPort: 3003,
            //  路径捆绑，将在`static`模式下生成的报告文件。
            //  相对于捆绑输出目录。
            reportFilename: 'report.html',
            //  模块大小默认显示在报告中。
            //  应该是`stat`，`parsed`或者`gzip`中的一个。
            //  有关更多信息，请参见“定义”一节。
            defaultSizes: 'parsed',
            //  在默认浏览器中自动打开报告
            openAnalyzer: false,
            //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
            generateStatsFile: false,
            //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
            //  相对于捆绑输出目录。
            statsFilename: 'stats.json',
            //  stats.toJson（）方法的选项。
            //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
            //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            statsOptions: null,
            logLevel: 'silent'
        }),
    ],
    devtool: 'source-map'
})