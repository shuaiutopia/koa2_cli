const Base = require("./base");
class Test extends Base{
  constructor(){
    super();
    // 所有方法均可访问这些属性
    this.db = "xxx";
    this.testData = Math.random();
  }
  async __before(ctx,next){
    ctx.state.before = "总是先于router运行";
    ctx.body = "before";
    // return;
    await next();
  } 
  async common(ctx,next){
    console.log("公共方法调用");
  }
  async index(ctx,next){
    this.common();
    ctx.body = ctx.state.before +"<br />" + this.testData;
  }
}

module.exports = Test.getInstance();