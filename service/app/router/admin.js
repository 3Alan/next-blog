'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware, config } = app;
  const { admin } = controller.admin;
  const jwt = middleware.auth(config.jwt);
  router.post('/admin/login', admin.login);
  // 需要鉴权的路由再第二个参数上加上jwt
  router.get('/admin/get_type_list', jwt, admin.getTypeList);
  router.post('/admin/save_article', jwt, admin.saveArticle);
  router.post('/admin/release_article', jwt, admin.releaseArticle);
  router.get('/admin/get_article_list', jwt, admin.getArticleList);
  router.get('/admin/get_article_detail/:id', jwt, admin.getArticleDetail);
  router.patch('/admin/update_article_status', jwt, admin.updateArticleStatus);
  router.post('/admin/add_special', jwt, admin.addSpecial);
};
