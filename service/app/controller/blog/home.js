'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getArticleList() {
    const sql =
      'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduction as intruction,' +
      'FROM_UNIXTIME(article.release_time,"%Y-%m-%d %H:%i:%s") as releaseTime,' +
      'article.view_count as viewCount ,' +
      'article_type.type_name as typeName ' +
      'FROM article LEFT JOIN article_type ON article.type_id = article_type.id';

    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }

  async getArticleById() {
    const { id } = this.ctx.params;
    const sql =
      'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduction as intruction,' +
      'article.article_content as content,' +
      'FROM_UNIXTIME(article.release_time,"%Y-%m-%d %H:%i:%s") as releaseTime,' +
      'article.view_count as viewCount ,' +
      'article_type.type_name as typeName ' +
      'FROM article LEFT JOIN article_type ON article.type_id = article_type.id ' +
      'where article.id=' +
      id;
    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }
}

module.exports = HomeController;
