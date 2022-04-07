/*eslint-disable*/
const express = require("express");
const server = new express();
const webpack =require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./dev.config');
const complier = webpack(config); //webpack的编译器，使用webpack和配置项可以对代码进行编译
const {port} = require("./etc")

process.env.NODE_ENV = "development"

server.use(webpackDevMiddleware(complier))

server.listen(port,function (){
    console.log(`服务器运行在 http://localhost:${port}`);
})