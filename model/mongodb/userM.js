const mongoose = require("./db.js");

// 声明 collection 集合(数据表)里所有的字段
let perSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    passWord:{type:String,required:true},
    tel:Number,
    grade:Number, // 权限等级
    addTime:{
        type:Date,
        default: Date.now
    }
})
// 注意了， method 是给 document 用的
// 加在 schema methods 属性的函数会编译到 Model 的 prototype， 也会暴露到每个 document 实例
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
perSchema.methods.speak = function () {
    // this 指向当前 document
    var greeting = this.name? "current document Name is " + this.name : "I don't have a name";
    console.log(greeting);
}

// 这里的 model 应该可以理解为 collection(集合,表) 的抽象模型,但他却又是document的构造函数!!!一般我们会把构造函数理解为实例化对象的抽象模型,这!!!!
// 需要把这个 schema 编译成一个 Model , 他是 document 的构造函数,可以通过这个构造函数指向create/find等操作,显然这些操作属于静态方法.
let UserM = mongoose.model("User",perSchema);

module.exports = UserM;
