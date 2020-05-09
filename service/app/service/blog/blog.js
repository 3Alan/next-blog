'use strict';

const Service = require('egg').Service;

class BlogService extends Service {
  async getArticleList() {
    const articleList = await this.app.mysql.query('select article.id,article.is_pin as isPin,article.img,article_type.id as typeId, article.title,article.introduction,FROM_UNIXTIME(article.update_time,"%Y-%m-%d %H:%i:%s") as updateTime,article.view_count as viewCount ,article_type.type_name as typeName, article_type.tag_color as specialColor FROM article LEFT JOIN article_type ON article.type_id = article_type.id where article.status=1 order by article.update_time desc limit 10');
    return articleList;
  }

  async getSpecialList() {
    const specialList = await this.app.mysql.query('select count(*) as num, article_type.type_name as name, article_type.id, article_type.image, FROM_UNIXTIME(MAX(article.update_time),"%Y-%m-%d") as time from article_type LEFT JOIN article on article.type_id=article_type.id GROUP BY article_type.id');
    return specialList;
  }

  async getArticleById(id) {
    const articleDetail = await this.app.mysql.query('select article.id,article.title,article.introduction,article.article_content as content,FROM_UNIXTIME(article.release_time,"%Y-%m-%d %H:%i:%s") as releaseTime,FROM_UNIXTIME(article.update_time,"%Y-%m-%d %H:%i:%s") as updateTime,article.view_count as viewCount ,article_type.type_name as typeName, article_type.id as typeId FROM article LEFT JOIN article_type ON article.type_id = article_type.id where article.id=?', [ id ]);
    return articleDetail[0];
  }

  async getCollectionById(id) {
    const collectionList = await this.app.mysql.query('select article.id,article.title,article.img,article.introduction,FROM_UNIXTIME(article.update_time,"%Y-%m-%d %H:%i:%s") as updateTime,article.view_count as viewCount, article_type.type_name as typeName FROM article LEFT JOIN article_type ON article.type_id = article_type.id where article_type.id=? order by updateTime desc', [ id ]);
    return collectionList;
  }

  async getArchive() {
    const archiveList = await this.app.mysql.query('select content,type,FROM_UNIXTIME(time,"%Y-%m-%d %H:%i:%s") as time from archive order by time desc');
    return archiveList;
  }
}

module.exports = BlogService;
