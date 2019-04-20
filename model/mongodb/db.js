const mongoose = require("mongoose");
// 链接到 project_fileManger 数据库
var dbUrl = `mongodb://127.0.0.1:27017/project_fileManager`;
// connect() 返回一个状态待定（pending）的连接， 接着我们加上成功提醒和失败警告。
mongoose.connect(dbUrl, {useNewUrlParser:true} ,(err,connection) => {
    // 等同于监听了 mongoose.connection 的 error 和 connected 事件
    if (err) {
        console.log('Mongoose connection error: ' + err.message)
    } else {
        console.log('数据库连接成功~')
    }
})

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected')
})

module.exports = mongoose;