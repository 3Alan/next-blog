'use strict';

module.exports = options => {
  return async function auth(ctx, next) {
    // 获取前台通过axios封装后穿过来的token
    const token = ctx.header.authorization;
    if (token) {
      try {
        // 验证并对token进行解码
        const decode = ctx.app.jwt.verify(token.split(' ')[1], options.secret);
        console.log(decode);
        await next();
      } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
          // 这里的错误有许多种情况：1.token错误，2.token过期... 这里统一处理为鉴权失败
          ctx.body = {
            code: '0003',
            msg: '用户鉴权失败，请重新登录',
          };
        } else {
          throw error;
        }
      }
    } else {
      ctx.body = {
        code: '0004',
        msg: '您没有登录，请先登录',
      };
    }
  };
};
