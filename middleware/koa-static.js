const koaStatic = require("koa-static");
const path = require("path");
let staticPath = 'public';
module.exports = koaStatic(path.resolve(staticPath));