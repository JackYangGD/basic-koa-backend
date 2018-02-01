'use strict';

//判断一个参数是否是数组
exports.isArray = function (param) {
    return Object.prototype.toString.call(param) == '[object Array]';
};