'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async login() {
    const { app, ctx } = this;
    const { username, password } = ctx.request.body;
    const checkValidate = await ctx.service.admin.admin.checkUserValidate(username, password);
    if (checkValidate) {
      // 将信息使用jwt进行签名加密生成token，expiresIn（token有效时间）
      const token = app.jwt.sign({ username, password }, app.config.jwt.secret, { expiresIn: '4h' });
      ctx.body = {
        code: '0001',
        msg: '登录成功',
        token,
      };
    } else {
      ctx.body = {
        code: '0002',
        msg: '用户名或者密码错误，请重试！',
      };
    }
  }

  async getTypeList() {
    const results = await this.ctx.service.admin.admin.getTypeList();
    this.ctx.body = {
      typeList: results,
    };
  }

  async saveArticle() {
    const articleContent = this.ctx.request.body;
    let results;
    // 不是第一次保存
    if (articleContent.id) {
      results = await this.ctx.service.admin.admin.updateArticle(articleContent);
      this.ctx.body = {
        result: results.affectedRows === 1 ? 'success' : 'fail',
      };
    } else {
      // 第一次保存时
      results = await this.ctx.service.admin.admin.addArticle({ status: 0, view_count: 0, ...articleContent });
      this.ctx.body = {
        result: results.affectedRows === 1 ? 'success' : 'fail',
        id: results.insertId,
      };
    }
  }

  async releaseArticle() {
    const articleContent = this.ctx.request.body;
    const { admin } = this.ctx.service.admin;
    let results;
    // 不是第一次发布(更新文章)
    const time = (new Date().getTime() / 1000).toString();
    if (articleContent.id) {
      // 保存了文章但是没有发布
      const isRelease = await admin.isRelease(articleContent.id);
      if (isRelease) {
        results = await admin.updateArticle({ update_time: time, status: 1, ...articleContent });
      } else {
        // 添加存档
        await admin.saveArchive({ content: articleContent.title, time, type: 'article' });
        results = await admin.updateArticle({ release_time: time, update_time: time, status: 1, ...articleContent });
      }
      this.ctx.body = {
        result: results.affectedRows === 1 ? 'success' : 'fail',
      };
    } else {
      // 第一次发布时
      const time = (new Date().getTime() / 1000).toString();
      // 添加存档
      await admin.saveArchive({ content: articleContent.title, time, type: 'article' });
      results = await admin.addArticle({ release_time: time, update_time: time, status: 1, ...articleContent });
      this.ctx.body = {
        result: results.affectedRows === 1 ? 'success' : 'fail',
        id: results.insertId,
      };
    }
  }

  async getArticleList() {
    const articleList = await this.ctx.service.admin.admin.getArticleList();
    this.ctx.body = {
      articleList,
    };
  }

  async getArticleDetail() {
    const articleDetail = await this.ctx.service.admin.admin.getArticleDetail(this.ctx.params.id);
    this.ctx.body = {
      articleDetail,
    };
  }

  async updateArticleStatus() {
    const { id, status } = this.ctx.request.body;
    const update_time = (new Date().getTime() / 1000).toString();
    const result = await this.ctx.service.admin.admin.updateArticleStatus({ id, update_time, status });
    this.ctx.body = {
      result: result ? 'success' : 'fail',
    };
  }

  async addSpecial() {
    const specialContent = this.ctx.request.body;
    const { admin } = this.ctx.service.admin;
    // 添加存档
    const time = (new Date().getTime() / 1000).toString();
    await admin.saveArchive({ content: specialContent.type_name, time, type: 'special' });
    const result = await admin.addSpecial(specialContent);
    this.ctx.body = {
      result: result ? 'success' : 'fail',
    };
  }
}

module.exports = AdminController;
