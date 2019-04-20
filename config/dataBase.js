// 配置文件放在了各个功能模块需要的地方了
let curEnv = process.env.NODE_ENV || "pro";
let config;
if(curEnv == "pro"){
    config = {
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
        timezone: '+08:00'
    }
}else{
    config = {
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
        timezone: '+08:00'
    }
}
module.exports = config;