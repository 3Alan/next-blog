'use strict';

const Service = require('egg').Service;

class BlogService extends Service {
  async getArticleList() {
    const articleList = await this.app.mysql.query('select article.id,article.img,article_type.id as typeId, article.title,article.introduction,FROM_UNIXTIME(article.release_time,"%Y-%m-%d %H:%i:%s") as releaseTime,article.view_count as viewCount ,article_type.type_name as typeName FROM article LEFT JOIN article_type ON article.type_id = article_type.id where article.status=1 order by article.release_time desc, article.update_time desc limit 10');
    return articleList;
  }

  async getArticleById(id) {
    const articleDetail = await this.app.mysql.query('select article.id,article.title,article.introduction,article.article_content as content,FROM_UNIXTIME(article.release_time,"%Y-%m-%d %H:%i:%s") as releaseTime,article.view_count as viewCount ,article_type.type_name as typeName FROM article LEFT JOIN article_type ON article.type_id = article_type.id where article.id=?', [ id ]);
    return articleDetail;
  }

  async getCollectionById(id) {
    const collectionList = await this.app.mysql.query('select article.id,article.title,article.introduction,FROM_UNIXTIME(article.release_time,"%Y-%m-%d %H:%i:%s") as releaseTime,article.view_count as viewCount, article_type.type_name as typeName FROM article LEFT JOIN article_type ON article.type_id = article_type.id where article_type.id=?', [ id ]);
    return collectionList;
  }
}

module.exports = BlogService;
