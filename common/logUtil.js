'use strict';
const log4js = require('log4js');
const Mail = require('../common/mail');
const logConfig = require('../config/log');
const Time = require('../utils/time');

//加载配置文件
log4js.configure(logConfig);

let logUtil = {};
let errorLogger = log4js.getLogger('errorLogger');
let reqLogger = log4js.getLogger('reqLogPath');

//封装错误日志
logUtil.logError = function (error) {
    if (error) {
        errorLogger.error(formatError(error));
    }
};

//封装请求日志
logUtil.reqLogger = function (url, query, body) {
    if (url) {
        reqLogger.info(formatLog(url, query, body));
    }
};

//格式化错误日志
let formatError = function (err) {
    let logText = '';
    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";
    //出错时间
    logText += "err time: " + Time.timestampToString(new Date().getTime(), 'YYYY-MM-DD hh:mm:ss') + "\n";
    //错误名称
    logText += "err name: " + err.name + "\n";
    //错误代码
    logText += "err code: " + err.code + "\n";
    //错误信息
    logText += "err message: " + err.message + "\n";
    //错误详情
    logText += "err stack: " + err.stack + "\n";
    //错误信息结束
    logText += "*************** error log end ***************" + "\n";
    Mail.sendMail('异常信息', logText);
    return logText;
};

let formatLog = function (url, query, body) {
    let logText = '';
    logText += "\n" + "*************** req log start ***************" + "\n";
    logText += "请求时间: " + Time.timestampToString(new Date().getTime(), 'YYYY-MM-DD hh:mm:ss') + "\n";
    logText += "请求路径: " + url + "\n";
    logText += "请求体 query: " + JSON.stringify(query) + "\n";
    logText += "请求体 body: " + JSON.stringify(body) + "\n";
    logText += "*************** req log end ***************" + "\n";
    return logText;
};
module.exports = logUtil;