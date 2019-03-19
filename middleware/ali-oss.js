let OSS = require('ali-oss');
let config = {
    region:"oss-cn-shanghai",
    //调用阿里云api的凭证,Access key ID 是类似身份的标识,access key secret 的作用是签名您的访问参数，以防被篡改
    // 这里使用的是RAM子账户
    accessKeyId:"LTAIz3PN7rnXVvd3",
    accessKeySecret:"zlDrCVmX6UDhk43CYxdYd8359YPKeK",
    bucket:"project-filemanager"
}
let client = new OSS({
  region:config.region,
  accessKeyId:config.accessKeyId,
  accessKeySecret:config.accessKeySecret,
  //这里不配置,后续需要client.useBucket('Your bucket name');方法指定
  bucket:config.bucket
});

module.exports = app=>{
    // 写入到 ctx 中
    app.context.oss = client;
    app.use(async (ctx,next)=>{
        await next();
    })
}