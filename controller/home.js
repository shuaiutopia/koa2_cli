let path = require("path");
module.exports = {
    async index(ctx, next) {
        ctx.render("home/index");
    },
    async welcome(ctx,next){
        let name = myU.getParams("name");
        ctx.render("home/welcome",{name});
    }   
}