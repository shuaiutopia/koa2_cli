const logger = require('koa-logs-middleware');
const path = require("path");
module.exports = logger({
    defaultPath: path.resolve('logs'),
    applicationName: 'app',
    auto: false 
})