const getToken = require("../middleware/koa-jwt").getToken;
module.exports = {
    async index(ctx, next) {
        if(ctx.session.user){
            ctx.redirect("/home");
        }else{
            await ctx.render("login/index");
        }
        next(); 
    }, 
    async checkLogin(ctx, next) {
        //执行鉴权操作
        let userData = ctx.request.body;
        //如果存在session直接到home页面
        if(ctx.session.user){
            ctx.redirect = "/home";
        }
        //模拟查询数据库
        if(userData.username == "bgg" && userData.password == 123 && userData.captcha.toLowerCase() == ctx.session.captcha.toLowerCase()){
            //这里是后台模板,不是前后端分离,不用token也可以,这里我们试下session
            const token = getToken({
                name:userData.name,
                id:123 //数据库唯一标识
            })
            ctx.body = {
                res:1,
                data:token,
                msg:"登陆成功"
            }
            //使用session保存登陆状态
            ctx.session.user = {userName:userData.username,passWord:userData.password};
        }else{
            ctx.body = myU.jsonIfy(0,"登陆失败")
        }
    },
    async logout(ctx,next){
        ctx.session.user = null;
        ctx.redirect("/login");
    }

}