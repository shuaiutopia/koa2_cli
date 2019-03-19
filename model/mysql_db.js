const Sequelize = require('sequelize');
let curEnv = process.env.NODE_ENV || "pro";
let config;
if(curEnv=="pro"){
    config = {
        database:"project_ossBack",
        username:"root",
        password:"Q0YoiopfEGPC7rF9XbJ"
    }
}else{
    config = {
        database:"koa_demo",
        username:"root",
        password:"root"
    }
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: 'localhost',
    dialect: 'mysql',
    //链接池
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // 请参考 Querying - 查询 操作符 章节
    operatorsAliases: false,
    //设置东八区
    timezone: '+08:00',
});
module.exports = sequelize;