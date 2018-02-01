'use strict';
const DB = require('../common/mysql');
const userDB = require('../db/user');
const ApiErrorNames = require('../error/apiErrorNames');
const Time = require('../utils/time');

/**
 * 登录
 * @param param {username, password}
 * @return {string}
 */
exports.login = async(param) => {
    let conn;
    let user;

    if (!param.username || !param.password) {
        throw new Error(ApiErrorNames.PARAM_ERROR);
    }
    try {
        conn = await DB.getConnection();
        user = await userDB.loadByUserName(conn, param.username);
        if (!user || (user.password != param.password)) {
            throw new Error(ApiErrorNames.LOGIN_ERROR);
        }
        if (user.isLocked) {
            throw new Error(ApiErrorNames.FREEZE);
        }
    } catch (e) {
        throw e;
    } finally {
        await DB.release(conn);
    }

    return user;
};