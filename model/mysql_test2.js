const Sequelize = require('sequelize');
let db = require("./db");//一个Sequelize实例化
let test2 = db.define("test2",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    add_time:{
        type:Sequelize.DATE,
        defaultValue:Sequelize.NOW
    }
},{
    engine: 'MYISAM', //表引擎,默认"	InnoDB"
    freezeTableName: true,
    timestamps: false
})
//创建表
// test2.sync();
module.exports = test2;