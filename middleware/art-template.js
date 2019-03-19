const path = require("path");
const render = require('koa-art-template');
module.exports = function (app){
    render(app, {
        root: path.resolve('view'),
        extname: '.html', // 默认为 ".art"
        debug: process.env.NODE_ENV !== 'production'
      });
}