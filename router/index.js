const Router = require('koa-router');
const router = new Router();
const ApiError = require('../error/apiError');
const ApiErrorNames = require('../error/apiErrorNames');
const Redis = require('../common/redis');
const logUtil = require('../common/logUtil');

router.all('*', async(ctx, next) => {
    console.log('ctx.request.url：', ctx.request.url);
    console.log('ctx.request.body：', ctx.request.body);
    logUtil.reqLogger(ctx.request.url, ctx.request.query, ctx.request.body);
    try {
        await next();
        ctx.body = {
            code: 1,
            msg: '请求成功',
            data: ctx.data
        }
    } catch (e) {
        let err;
        if(!(e instanceof ApiError)){
            err = new ApiError(e.message);
        }else{
            err = e;
        }
        ctx.body = {
            code: err.code,
            msg: err.message,
            data: ""
        }
    }
});

router.post(/^(?!.*?(\/login))/, async(ctx, next) => {
    console.log('post权限校验');
    let sessionId = ctx.request.header.token;
    console.log('客户端token:', sessionId);
    let result;
    //校验用户是否登录
    if (sessionId) {
        //查看登录的用户信息并赋值给ctx.user
        result = await Redis.get(`admin:${sessionId}`);
        if (result) {
            ctx.user = JSON.parse(result);
            await next();
        } else {
            throw new Error(ApiErrorNames.NOT_LOGIN);
        }
    } else {
        throw new Error(ApiErrorNames.NOT_LOGIN);
    }
});

module.exports = router.routes();