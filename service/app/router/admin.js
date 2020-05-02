'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  const { admin } = controller.admin;
  router.post('/admin/login', admin.login);
};
