'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { blog } = controller.blog;
  router.get('/blog/get_article_list', blog.getArticleList);
  router.get('/blog/get_special_list', blog.getSpecialList);
  router.get('/blog/detail/:id', blog.getArticleById);
  router.get('/blog/get_collection_by_id/:id', blog.getCollectionById);
  router.get('/blog/get_archive', blog.getArchive);
};
