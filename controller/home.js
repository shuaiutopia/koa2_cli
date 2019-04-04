const Base  = require("./base");
class Home extends Base{
  constructor(){
    super();
  }
  async index(ctx, next) {
    ctx.render("home/index");
  }
  async welcome(ctx,next){
    let name = myU.getParams("name");
    ctx.render("home/welcome",{name});
  } 
}
module.exports = Home.getInstance();