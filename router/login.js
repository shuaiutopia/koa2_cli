let loginR = require("koa-router")();
let loginC = require("../controller/login");
loginR.prefix("/login");

loginC.__before && loginR.use(loginC.__before);

loginR.get("/",loginC.index);
// 登陆验证
loginR.post("/checkLogin",loginC.checkLogin);
// 退出登陆
loginR.get("/logout",loginC.logout);

module.exports = loginR;