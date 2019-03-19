const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');
const secret = "shuai_token";
module.exports.getToken = function(data){
    //调用 jsonwebtoken 的 sign() 方法来生成token，接收三个参数，第一个是载荷，用于编码后存储在 token 中的数据，也是验证 token 后可以拿到的数据；第二个是密钥，自己定义的，验证的时候也是要相同的密钥才能解码；第三个是options，可以设置 token 的过期时间。 
    return jwt.sign(data,secret,{ expiresIn:'2h'});
}
module.exports.useJwt = function (app) {
    // 错误处理
    app.use((ctx, next) => {
        return next().catch((err) => {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = {res:0,msg:"未授权"};
                //ctx.body = 'Protected resource, use Authorization header to get access\n';
                // ctx.response.redirect("/login");
            } else {
                throw err;
            }
        })
    })

    //通过 app.use 来调用该中间件，并传入密钥 {secret: 'shuai_token'}，unless 可以指定哪些 URL 不需要进行 token 验证。token 验证失败的时候会抛出401错误，因此需要添加错误处理，而且要放在 app.use(koajwt()) 之前，否则不执行。
   // 如果请求时没有token或者token过期，则会返回401。
    app.use(koaJwt({
        secret: secret,
        key: 'jwtdata', //通过ctx.state.jwtdata获取加密的值,默认是user
    }).unless({ //排除域名列表
        // path: [/\/login/] 
        path: [/.*/] 
        //path: [/^\/(?!api).*/] //不以api开头的接口
    }));
}