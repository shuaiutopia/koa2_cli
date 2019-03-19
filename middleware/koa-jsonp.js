const jsonp = require("koa-jsonp");
module.exports = jsonp({
    // domain:"/", //(String: defaults to '.default.lan'),the first level domain where your API will be consumed. Used in iframe mode (???)
    // callbackName:""  //(String: defaults to 'callback') The name of the JSONP callback,jsonp中回调函数的名字,建议不要填
})