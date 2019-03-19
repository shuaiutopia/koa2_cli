const path = require("path");
const fs = require("fs");
let koaBody = require("koa-body");
let utils = require("../utils");

// console.log(checkDirExist);
module.exports = function myUpload(app){
    app.use(koaBody({
        // encoding:"gzip", 
        // jsonStrict:false,
        // json:false,
        multipart: true,//传照片必须为true
        formidable: {
            //下文的onFileBegin已经对file的path做了设置,这里就不需要了
            //uploadDir:path.resolve('public/uploads/'), // 设置文件上传目录
            keepExtensions: true, // 保持文件的后缀
            maxFileSize:50000*1024*1024,
            maxFieldsSize: 50000 * 1024 * 1024, // 文件上传大小
            onFileBegin: (name, file) => { // 文件上传前的设置
                if(!file.name){return};
                // 获取文件后缀
                const ext = utils.getUploadFileExt(file.name);
                // 最终要保存到的文件夹目录
                let dirName = utils.getUploadDirName();
                const dir = path.resolve(`public/uploads/${dirName}`);
                // 检查文件夹是否存在如果不存在则新建文件夹
                utils.checkDirExist(dir);
                let fileName = utils.getUploadFileName(ext)
                // 重新覆盖 file.path 属性,会影响后面文件的存储地址
                file.path = `${dir}/${fileName}`;
                //向ctx内写入属性,路由里面是可以读到的,写入文件目录
                app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
                app.context.uploadpath[name] = `${dirName}/${fileName}`; //只能是单文件上传,同名被覆盖
            },
            //需要修改源码
            onProgress(bytesReceived, bytesExpected) {
                // console.log("bytesReceived",bytesReceived);
                // console.log("bytesExpected",bytesExpected);
            }
        }
    }))
}

