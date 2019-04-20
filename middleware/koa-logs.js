// const logger = require('koa-logs-middleware');
/*
日志输出到文档有三种日志等级：info、error、fatal
除此之外的日志等级是不会记录到日志文件的。但是会输出到控制台。
注册了日志之后，就直接把日志挂在到了ctx上下文，需要使用的地方可以直接呼出ctx.logger.info()
*/
// const path = require("path");
// module.exports = logger({
//     reqKeys:[],
//     defaultPath: path.resolve('logs'),
//     applicationName: 'app',
//     auto: false 
// })

// 第二种记录日志方式
const path = require("path");
const logger = require('tracer').dailyfile({
  root:path.resolve('logs'), 
  maxLogFiles: 100,
  //allLogsFileName: 'myAppName', // 所有日志文件输出到同一个文件内
  // 级别共有 log trace debug info warn error
  // level:'warn'
});;
module.exports = async (ctx,next)=>{
  ctx.app.context.logger = logger;
  await next();
}