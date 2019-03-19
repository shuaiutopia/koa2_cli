const Koa = require("koa");
let myUpload = require("./middleware/koa-body");
let koaStatic = require("./middleware/koa-static");
let artTemplate = require("./middleware/art-template");
let koaSession = require("./middleware/koa-session");
let koaLogger = require("./middleware/koa-logs"); 
let jsonp = require("./middleware/koa-jsonp");
let cors = require("./middleware/koa-cors");
let useJwt = require("./middleware/koa-jwt").useJwt;
let aliOss = require("./middleware/ali-oss");
let onError  = require("koa-onerror");
let registerRouter = require("./router");
let missPage = require("./middleware/missPage");
let myUtils = require("./utils/globalUtils");
let app = new Koa();  

//404处理,写到路由前面,最好写在最顶部
app.use(missPage); 
//全局工具函数
app.use(myUtils); 
//报错处理
onError(app);
//日志记录 
app.use(koaLogger);
//解析post参数,采用将app为参数穿进去的做法是因为,myUpload里面要用到app
myUpload(app);
//解析静态资源     
//静态资源的路径如果和路由冲突了,会覆盖路由的,当然,如果放在路由下面也会被路由覆盖的,路由里面执行了next方法,就是另外一种情况了.
app.use(koaStatic);
//art-template模板
artTemplate(app); 
//session功能,放在路由前,要向ctx注入session
koaSession(app);  
//jsonp功能
app.use(jsonp);
//cors功能
app.use(cors);
//jwt 功能
useJwt(app);
//阿里云oss  
aliOss(app);
// 注册所有路由
app.use(registerRouter());

app.listen(3333); 
console.log("服务器运行在3333端口..."); 