let homeR = require("koa-router")();
let personM = require("../model/userM");

homeR.prefix('/home');
homeR.get("/",async (ctx,next)=>{
    console.log("路由中") 
    await ctx.render("home/index");
    await next();
    console.log("路由中2") 
})
homeR.get("/welcome",async (ctx,next)=>{
    await ctx.render("home/welcome");
    await next();
})
homeR.use(async (ctx,next)=>{
    console.log("homeR的use");
    await next();
})
module.exports = homeR;