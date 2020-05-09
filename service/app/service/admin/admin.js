'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
  async checkUserValidate(username, password) {
    const isValidate = await this.app.mysql.get('admin', { username, password });
    return !!isValidate;
  }
  async getTypeList() {
    const typeList = await this.app.mysql.select('article_type');
    return typeList;
  }
  async addArticle(articleContent) {
    const result = await this.app.mysql.insert('article', articleContent);
    return result;
  }
  async isRelease(id) {
    const result = await this.app.mysql.get('article', { id });
    return !!result.release_time;
  }
  async updateArticle(articleContent) {
    const result = await this.app.mysql.update('article', articleContent);
    return result;
  }
  async getArticleList() {
    const articleList = await this.app.mysql.query('select article.id,article.is_pin as isPin,article.status,article.title,article.introduction,FROM_UNIXTIME(article.release_time,"%Y-%m-%d %H:%i:%s") as releaseTime,FROM_UNIXTIME(article.update_time,"%Y-%m-%d %H:%i:%s") as updateTime,article.view_count as viewCount ,article_type.type_name as typeName FROM article LEFT JOIN article_type ON article.type_id = article_type.id order by article.release_time desc, article.update_time desc');
    return articleList;
  }

  async saveArchive(content) {
    await this.app.mysql.insert('archive', content);
  }

  async getArticleDetail(id) {
    const articleDetail = await this.app.mysql.query('select article.id,article.is_pin as isPin,article.img,article.title,article.introduction,article.article_content as content,FROM_UNIXTIME(article.release_time,"%Y-%m-%d %H:%i:%s") as releaseTime,article.view_count as viewCount ,article_type.id as typeId FROM article LEFT JOIN article_type ON article.type_id = article_type.id where article.id=?', [ id ]);
    return articleDetail[0];
  }

  async updateArticleStatus(updateData) {
    const result = await this.app.mysql.update('article', updateData);
    return result.affectedRows === 1;
  }

  async addSpecial(specialContent) {
    const result = await this.app.mysql.insert('article_type', specialContent);
    return result.affectedRows === 1;
  }
}

module.exports = AdminService;
