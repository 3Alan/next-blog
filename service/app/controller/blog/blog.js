'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getArticleList() {
    const results = await this.ctx.service.blog.blog.getArticleList();
    this.ctx.body = {
      data: results,
    };
  }

  async getArticleById() {
    const { id } = this.ctx.params;
    const articleDetail = await this.ctx.service.blog.blog.getArticleById(id);
    this.ctx.body = {
      articleDetail,
    };
  }

  async getCollectionById() {
    const { id } = this.ctx.params;
    const results = await this.ctx.service.blog.blog.getCollectionById(id);

    this.ctx.body = {
      data: results,
    };
  }
}

module.exports = HomeController;
