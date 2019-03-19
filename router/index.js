const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

registerRouter = () => {
    let routers = [];
    // glob的作用是通过正则拿到匹配文件路径
    glob.sync(resolve(__dirname, './', '**/*.js'))
        .filter(value => (value.indexOf('index.js') === -1))
        .map(router => {
            // router 是匹配到的文件路径
            // 把所有路由中间件放在routers数组中
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
        //compose可以将多个中间件合并成一个中间件
    return compose(routers)
}
module.exports = registerRouter;