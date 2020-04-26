'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/blog/getArticleList', controller.blog.home.getArticleList);
  router.get('/blog/detail/:id', controller.blog.home.getArticleById);
};
