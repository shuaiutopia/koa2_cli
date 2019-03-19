let loginR = require("koa-router")();
let userM = require("../model/userM");
loginR.prefix("/login");
loginR.get("/",async (ctx,next)=>{
    if(ctx.session.login){
        ctx.redirect("/home");
    }else{
        await ctx.render("login/index");
    }
    await next();
})
// 登陆验证
loginR.post("/checkLogin",async (ctx,next)=>{
    let {userName,passWord,captcha} = ctx.request.body;
    // 验证是否有值
    if(!userName || !passWord || !captcha){
        ctx.body = myU.jsonIfy(0,"用户名/密码/验证码不能为空");
        await next();
        return;
    }
    // 验证验证码
    if(ctx.session.captcha != captcha){
        ctx.body = myU.jsonIfy(0,"验证码错误");
        await next();
        return ;
    }
    // 验证账号密码
    let userInfo = await userM.findOne({userName});
    if (userInfo && passWord == userInfo.passWord){
        // 记录当前用户级别
        ctx.session.login = userInfo._id;
        ctx.session.grade = userInfo.grade;
        ctx.body = myU.jsonIfy(1,"登陆成功");
    }else{
        ctx.body = myU.jsonIfy(0,"账号或者密码错误");
    }
    await next();
})
loginR.get("/logout",async (ctx,next)=>{
    ctx.session.login = null;
    ctx.redirect("/login");
})
module.exports = loginR;