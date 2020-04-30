'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { blog } = controller.blog;
  router.get('/blog/getArticleList', blog.getArticleList);
  router.get('/blog/detail/:id', blog.getArticleById);
  router.get('/blog/getCollectionById/:id', blog.getCollectionById);
};
