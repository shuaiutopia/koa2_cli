const fs = require("fs");
const crypto = require("crypto");
//这里封装一些常用的函数
module.exports = {
  //文件夹的名字使用 年+月+日如 20181102
  getUploadDirName() {
    const date = new Date();
    let month = Number.parseInt(date.getMonth()) + 1;
    month = month.toString().length > 1 ? month : `0${month}`;
    let day = date.getDate();
    day = day.toString().length > 1 ? day : `0${day}`;
    const dir = `${date.getFullYear()}${month}${day}`;
    return dir;
  },
  //koa-body 的文件件上传目录必须保证文件夹的存在，否则无法写入，因此需要判断文件夹是否存在，如果不存在，则新建一个文件夹即可。
  checkDirExist(p) {
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  },

  //获取文件后缀名
  //koa-body 配置 formidable：{keepExtensions: true}
  getUploadFileExt(name) {
    let ext = name.split('.');
    return ext[ext.length - 1] || "txt";
  },

  //生成唯一文件名
  getUploadFileName(ext) {
    return new Date().getTime() + Math.floor(Math.random() * 100000) + "." + ext;
  },

  //递归得到oss内所有的文件
  getDirObj: async function (client, dir) {
    let resultList = [];
    await getObj(dir);
    return resultList;
    //递归调用
    async function getObj(dir) {
      let result = await client.list({
        prefix: dir,
        delimiter: "/"
      });
      if (result.objects) {
        result.objects.forEach(function (obj) {
          if (obj.name.slice(-1) != "/") {
            resultList.push(obj);
          }
        });
      }
      if (result.prefixes) {
        //不能用forEach方法
        for (let i = 0; i < result.prefixes.length; i++) {
          await getObj(result.prefixes[i]);
        }
      }
    }
  },
  // 加密工具函数
  getBase64(sourceString) { // sourceString是要转base64的字符串
    return new Buffer(sourceString).toString('base64');
  },
  md5(buffer) { // 参数buffer new Buffer(string)或则普通字符串均可
    var hash;
    hash = crypto.createHash('md5');
    hash.update(buffer);
    //digest() 是 crypto加密模块中的一个方法，API 的解释为计算传入的所有数据的摘要值，其参数是编码方式，可以有 'hex'、'binary'或者'base64'
    return hash.digest('hex');
  },
  sha1(stringToSign, secret) { // 一般stringToSign为base64字符串
    let signature;
    return signature = crypto.createHmac('sha1', secret).update(stringToSign).digest().toString('base64');
  },

}