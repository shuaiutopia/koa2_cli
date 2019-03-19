module.exports = async (ctx,next)=>{
    await next();

    if(ctx.status == "404"){
        ctx.status = 404;
        ctx.body = "<h1>小老弟,这是个404页面!</h1>"
    }
    //貌似没用
    if(ctx.status == "403"){
        ctx.status = 403;
        ctx.body = {res:0,msg:"授权失败"}
    }
}