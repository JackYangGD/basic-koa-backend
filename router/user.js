const uuid = require('uuid');
const Router = require('koa-router');
const userService = require('../service/user');
const Redis = require('../common/redis');
let router = new Router({
    prefix: '/user'
});
//测试服务是否开启
router.get("/test", async (ctx) => {
    ctx.data = '服务已启动';
});
//后台用户登录
router.post("/login", async (ctx) => {
    let sessionId = uuid.v1();
    ctx.data = await userService.login(ctx.request.body);
    try {
        await Redis.set(`admin:${sessionId}`, JSON.stringify(ctx.data));
    } catch (e) {
        throw e;
    }
    ctx.data.token = sessionId;
});


module.exports = router.routes();