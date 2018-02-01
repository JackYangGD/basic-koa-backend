'use strict';
const DB = require('../common/mysql');
const ApiErrorNames = require('../error/apiErrorNames');

/**
 * 根据用户名查看用户数据
 * @param conn
 * @param username
 */
exports.loadByUserName = async(conn, username) => {
    let sql;
    let data;
    let result;

    sql = 'SELECT id,username username, password, nickname , role_id roleId, is_locked isLocked, p_id pId FROM sysuser WHERE username = ?';
    data = [username];
    try {
        result = await DB.query({
            connection: conn,
            sql: sql,
            data: data
        });
    } catch (e) {
        throw new Error(ApiErrorNames.DB_ERROR);
    }

    return result;
};