let captchaR = require("koa-router")();

captchaR.prefix("/captcha");
let chptchaC = require("../middleware/svg-captcha");
captchaR.get("/", chptchaC);
module.exports = captchaR;