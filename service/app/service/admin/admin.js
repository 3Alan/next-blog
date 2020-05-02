'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
  async checkUserValidate(username, password) {
    const isValidate = await this.app.mysql.get('admin', { username, password });
    console.log(!!isValidate);
    return isValidate;
  }
}

module.exports = AdminService;
