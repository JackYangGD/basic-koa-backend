/**
 * API错误名称
 */
const ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = 'unknownError';
ApiErrorNames.PARAM_ERROR = 'paramERROR';
ApiErrorNames.DB_ERROR = 'dbError';
ApiErrorNames.FREEZE = 'freeze';
ApiErrorNames.LOGIN_ERROR = 'loginError';
ApiErrorNames.NOT_LOGIN = 'notLogin';
ApiErrorNames.TRANSFER_ERROR = 'transferError';
/**
 * API错误名称对应的错误信息
 */
const errorMap = new Map();

errorMap.set(ApiErrorNames.UNKNOW_ERROR, {code: 0, message: '系统繁忙'});
errorMap.set(ApiErrorNames.PARAM_ERROR, {code: 101, message: '参数错误'});
errorMap.set(ApiErrorNames.FREEZE, {code: 102, message: '账户被冻结'});
errorMap.set(ApiErrorNames.LOGIN_ERROR, {code: 103, message: '账户名或密码错误'});
errorMap.set(ApiErrorNames.NOT_LOGIN, {code: 104, message: '未登录'});
errorMap.set(ApiErrorNames.TRANSFER_ERROR,{code: 105, message: '调用接口失败'});
//根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (errorName) => {
    let errorInfo;

    if (errorName) {
        errorInfo = errorMap.get(errorName);
    }
    //如果没有对应的错误信息，默认'未知错误'
    if (!errorInfo) {
        errorName = 'unknownError';
        errorInfo = errorMap.get(errorName);
    }
    return errorInfo;
};

module.exports = ApiErrorNames;