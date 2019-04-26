const koaSession = require("koa-session");
const path = require("path");
const fs = require("fs");
const store = {
  get(key) {
    const sessionDir = path.resolve('sessionTemp');
    !fs.existsSync(sessionDir) && fs.mkdirSync(sessionDir);
    const files = fs.readdirSync(sessionDir);

    for (let i = 0; i < files.length; i++) {
      if (files[i].startsWith(key)) {
        const filepath = path.resolve(sessionDir, files[i]);
        //require.cache对象代表缓存了所有已被加载模块的缓存区
        //require.resolve函数来查询某个模块文件的带有完整绝对路径的文件名
        delete require.cache[require.resolve(filepath)];
        //先删缓存再加载最新的文件
        const result = require(filepath);
        return result;
      }
    }
  },
  set(key, session) {
    const filePath = path.resolve('sessionTemp', `${key}.js`);
    const content = `module.exports = ${JSON.stringify(session)};`;
    fs.writeFileSync(filePath, content);
  },

  destroy(key) {
    const filePath = path.resolve('./sessionTemp', `${key}.js`);
    //删除文件操作
    fs.unlinkSync(filePath);
  }
}
module.exports = function (app) {
  app.keys = ['some secret hurr'];
  const CONFIG = {
    key: 'koa:sess', //cookie key (default is koa:sess)
    maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true, //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true, //签名默认true
    rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false, //(boolean) renew session when session is nearly expired,
    store, //session的存储方式,必须实现set/get/destroy三个接口
  };
  app.use(koaSession(CONFIG, app));
}