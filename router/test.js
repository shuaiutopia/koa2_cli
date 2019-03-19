const testR = require("koa-router")();
const fs = require("fs");
const path = require("path");
const utils = require("../utils");
testR.prefix("/test");
testR.get("/md5", async (ctx,next)=>{
  ctx.body =  utils.md5("123456");
  await next();
})
testR.get("/base64",async (ctx,next)=>{
  let base64Data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAACcWlDQ1BMZW5vdm8gVGhpbmtQYWQgTENEIE1vbml0b3IAADiNhZJPSBRhGMZ/M2OpreiaQyDY9gWLGJqo2aIEYa4VwSqrLeufBFlnpnXQnVlmZ9e8FEgEguGxS3Tq2CmEEAk8Rn/oUIQSRIeIoAIhCDvUdBhtbZV6Tg/P837vw/t+L5RVD5sWchAylusMXewVI6NjonyDA9RQTQhSWi7bf/lCAiA2kKQEEnx/gwTwqjk2kBSlBf9BrW7kNJDiQEHPWDpIT4CUntH1Hb2QN3SQW4BbBdOYBXkZCM/kMybI64CaMVI5kL8AYWdkdAyUIKCmfR4G1EmfdwGqkxiKghIDQmmfzwChSZ8vAqFZN+uC8gBQJ6ezLihrgOoa2hQor4EqLeu4oLwHWv1ZAGiIGZZdsEViyrSm4yldxKJ9ot+2TNd29ixh/WEPAJ7nebUSLNbc2XdZO3qpvyu33M/9Z4SoWmArsLBvxI6+x9+V0TJkXDUcw9IMkTSNWdNKi6ht6aZr2pYwLXHpfDTS3h2JnOxobf+rRycgzwOcWu0he7CTFwAVwI/DlAFs/rwRrvCrG4GuxV6eVkfZeNTDVr4X8P8fqLv/C3WileBLFeXrM8rqAijj9wBpZHRMABCrTBIHho999O8DALlkZgnkJUD+847xAHQsQcVgUXM74XEQao2i1ngXghOwMq/lncJ2v0qQ66uaj56JzCU/XG9Y/ux5UOJXBlZD9d2HrsRv5laW9/FDgbfH351tSm3eTq198jwoZn4bRAKkI8+LWhE5My0AzvX3Cde45gJE7eycY6anXNGknRAdbW2nxfZ5Rm0nazsp17QtfgMsJrzMjsPwXAAAAAlwSFlzAAALEwAACxMBAJqcGAAABo1pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChNYWNpbnRvc2gpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0xMS0xMlQxMjo0NTowNiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTktMDItMjVUMTQ6NTM6MzgrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTktMDItMjVUMTQ6NTM6MzgrMDg6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZWJmMjE0OGYtYjlkZC02ZjQ2LTg2NjItNzAxNWIzMWQwOGY0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwMjM0OTdFNTk5MjExRThCMjhDOUM3NDQ5Q0UwMDdDIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6QjAyMzQ5N0U1OTkyMTFFOEIyOEM5Qzc0NDlDRTAwN0MiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjAyMzQ5N0I1OTkyMTFFOEIyOEM5Qzc0NDlDRTAwN0MiIHN0UmVmOmRv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";
  base64Data = base64Data.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
   // 以下两种写入方式均可
  // fs.writeFileSync(path.resolve("public/uploads/testImg.png"), dataBuffer);
  let ws = fs.createWriteStream(path.resolve("public/uploads/testImg.png"));
  ctx.body = "保存成功"
})
module.exports = testR;