let Stream = require("stream");
let fs = require("fs");
let path = require("path");
// 用来做测试用
class T{
    constructor(){

    }
    async fn(){
        console.log(333,this)
        this.fn2();
    }
    fn2(){
        console.log("haha11")
    }
    async upload(){

    }
}
// let t = new T();
// t.fn();

class Test {
    constructor(){
        // console.log(this);
        // console.log(this.upload);
    }
    async index (ctx,next){
        console.log(11,this); // 赋值给模块的方法中this为undefined
        await ctx.render("test/index")
    }
    async upload(ctx,next){
        console.log("开始上传文件")
        let client = ctx.oss;
        // console.log(ctx.req instanceof Stream); // true
        let file = ctx.request.files.pic;
        const reader = fs.createReadStream(file.path);
        let targetUrl = path.resolve(`public/uploads/${file.name}`);
        reader.pipe(fs.createWriteStream(targetUrl));

        await new Promise((res,rej)=>{
            reader.on('end', async () => {
                console.log("自己服务器上传结束")
                let checkpoint;
                // retry 5 times
                for (let i = 0; i < 5; i++) {
                    try {
                    const result = await client.multipartUpload('object-name', targetUrl, {
                        checkpoint,
                        async progress(percentage, cpt) {
                            console.log("上传进度",percentage);
                            checkpoint = cpt;
                        },
                        headers:{
                            expires: 3600000
                        },
                    });
                    console.log(result);
                    res();
                    break; // break if success
                    } catch (e) {
                    console.log(e);
                    }
                }
            });
        })
        
        ctx.body = "1"
    }
}
// Test.prototype.index = async function (ctx,next){
//     console.log(11,this); // 这里的this又为global
//     await ctx.render("test/index")
// }
// let tt = new Test();
// console.log("this",this)
// exports.index = tt.index.bind(this);
// exports.upload = tt.upload;
module.exports = new Test;