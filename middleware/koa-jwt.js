const jwt = require('jsonwebtoken');
const koaJwt = require('koa-jwt');
const secret = "shuai_token";
// 第一步:通过secret 加密生成token,一般用在登陆成功时
module.exports.getToken = function (data) {
  //调用 jsonwebtoken 的 sign() 方法来生成token，接收三个参数，第一个是载荷，用于编码后存储在 token 中的数据，也是验证 token 后可以拿到的数据；第二个是密钥，自己定义的，验证的时候也是要相同的密钥才能解码；第三个是options，可以设置 token 的过期时间。 
  return jwt.sign(data, secret, {
    expiresIn: '24h'
  });
}

// 这里主要是吧token严重挂载到app上
module.exports.useJwt = function (app) {
  // 第三步:这不是koa-jwt必须的,只是用来捕获kow-jwt抛出的401错误
  app.use((ctx, next) => {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          res: 0,
          msg: "未授权"
        };
        //ctx.body = 'Protected resource, use Authorization header to get access\n';
        // ctx.response.redirect("/login");
      } else {
        throw err;
      }
    })
  })
  // 第二步:验证token,token必须在请求头Authorization里(以Bearer 开头(Bearer 后一个空格))
  // 原理:从传过来的token来反解析出 secret,和加密生成token时的secret对比,相同则验证通过
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

// 关于正则
/*
前瞻： exp1(?=exp2) 查找exp2前面的exp1
后顾： (?<=exp2)exp1 查找exp2后面的exp1
负前瞻： exp1(?!exp2) 查找后面不是exp2的exp1
负后顾： (?<!exp2)exp1 查找前面不是exp2的exp1
*/