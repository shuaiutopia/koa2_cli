const getToken = require("../middleware/koa-jwt").getToken;
const Base =  require("./base");
class Login extends Base {
  async __before(ctx,next) {
    if (ctx.session.user) {
      ctx.redirect("/home");
    }
    await next();
  }
  // 登陆首页
  async index(ctx, next) {
    await ctx.render("login/index");
    next();
  }
  // 验证登陆
  async checkLogin(ctx, next) {
    let {
      userName,
      passWord,
      captcha
    } = ctx.request.body;
    // 验证是否有值
    if (!userName || !passWord || !captcha) {
      ctx.body = myU.jsonIfy(0, "用户名/密码/验证码不能为空");
      await next();
      return;
    }
    // 验证验证码
    if (ctx.session.captcha.toLowerCase() != captcha.toLowerCase()) {
      ctx.body = myU.jsonIfy(0, "验证码错误");
      await next();
      return;
    }
    //模拟查询数据库
    if (userName == "bgg" && passWord == 123 && captcha.toLowerCase() == ctx.session.captcha.toLowerCase()) {
      //这里是后台模板,不是前后端分离,不用token也可以
      const token = getToken({
        name: userName,
        id: 123 //数据库唯一标识
      })
      ctx.body = {
        res: 1,
        data: token,
        msg: "登陆成功"
      }
      //使用session保存登陆状态
      ctx.session.user = {
        userName: userName,
        passWord: passWord
      };
    } else {
      ctx.body = myU.jsonIfy(0, "登陆失败")
    }
    await next();
  }
  // 退出登陆
  async logout(ctx,next){
    ctx.session.user = null;
    ctx.redirect("/login");
  }
}
module.exports = Login.getInstance();