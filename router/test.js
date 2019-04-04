const testR = require("koa-router")();
const utils = require("../utils");
const testC = require("../controller/test");
testR.prefix("/test");
// 先于所有路由前都会执行
testC.__before && testR.use(testC.__before);

testR.get("/md5", async (ctx,next)=>{
  ctx.body =  utils.md5("123456");
  await next();
})
testR.get("/",testC.index);
module.exports = testR;