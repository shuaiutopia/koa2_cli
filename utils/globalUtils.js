const fs = require("fs");
const path = require("path");
module.exports = async (ctx,next)=>{
    //注入到模板中
    ctx.state.path = path;
    ctx.state.stringify = JSON.stringify;
    ctx.state.Date = Date;
    //全局方法
    global.myU =  {
        //这里必须是在调用时传入ctx,如果用当前中间件的ctx,当有两个同时发生的请求时第二个请求的ctx可能会覆盖第一个ctx,因为在调用时会比较慢
        getParams(ctx=ctx,paramName=""){
            if(ctx && ctx.params || ctx.query){
                return ctx.params[paramName] || ctx.query[paramName] || "";
            }
            return "";
         },
         /**
          * @param  {Number} res 返回结果0/1
          * @param  {String} msg 信息
          * @param  {Object} data={} 数据
          */
         jsonIfy(res,msg,data={}){
            return {res,msg,data};
         },
         myAlert(msg,src=null){
             return `<script>
                parent.layer.alert('${msg}');
                if(${src}){
                    parent.location.href="${src}"
                }
             </script>`
         }
    }
    await next(); 
}
