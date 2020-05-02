'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async login() {
    const { app, ctx } = this;
    console.log(ctx.request.body);
    
    const { username, password } = ctx.request.body;

    const checkValidate = await ctx.service.admin.admin.checkUserValidate(username, password);

    if (checkValidate) {
      // 将信息使用jwt进行签名加密生成token
      const token = app.jwt.sign({ username, password }, app.config.jwt.secret);

      ctx.body = {
        msg: '登录成功',
        token,
      };
    } else {
      ctx.body = {
        msg: '用户名或者密码错误，请重试！',
      };
    }
  }
}

module.exports = AdminController;
