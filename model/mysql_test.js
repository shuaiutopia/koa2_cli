const Sequelize = require('sequelize');
let db = require("./db");
let user = db.define("test",{
    name:Sequelize.STRING,
    age:Sequelize.INTEGER,

},{
    //如果已经创建了表,可以通过设置freezeTableName或者tableName来找到这张表
    freezeTableName: true,//默认为false,会自动将所有传递的模型名称（define的第一个参数）转换为复数(末尾加s)
    // tableName:"test",
    timestamps: false
})
module.exports = user;