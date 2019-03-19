const koaCors = require("koa2-cors");
module.exports = koaCors({
    //origin接收一个字符串或者一个函数,函数的第一个参数为ctx
    //设置允许的域
    origin: function (ctx) {
        console.log("cors监听到的请求",ctx.request.header.origin)
        if (ctx.url === '/noCors') {
            return false; // 允许来自所有域名请求
        }
        return ctx.request.header.origin;
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,//预检有效期(20天),单位为秒,也可以设置5
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'], //设置允许的HTTP请求类型
    allowHeaders: ['Content-Type', 'Authorization', 'Accept','user-id','access-token']
});