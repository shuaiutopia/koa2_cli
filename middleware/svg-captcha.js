const svgCaptcha = require('svg-captcha');
//这个中间件不能绑定到app里面,否则每次ajax请求或者其他请求进来都会重新赋值,我们把他的引用放到路由里面
module.exports = async (ctx,next)=>{
    var c = svgCaptcha.create({
        size:4,
        ignoreChars:'0oO1iLlI',
        noise:3,
        color: true,
        background: '#cc9966',
        width: 100, // width of captcha
        height: 50, // height of captcha
        fontSize: 35, // captcha text size
        //charPreset: string // random character preset
    });
    ctx.type="svg";
    ctx.body = c.data;
    ctx.session.captcha = c.text.toLocaleLowerCase();
    // console.log("验证码",c);
    await next();
}