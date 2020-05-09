// const HOST_URI = 'http://39.101.223.208:7001/admin/';
const HOST_URI = 'http://localhost:7001/admin/';

const LOGIN = 'login';
const GET_TYPE_LIST = 'get_type_list';
const SAVE_ARTICLE = 'save_article';
const RELEASE_ARTICLE = 'release_article';
const GET_ARTICLE_LIST = 'get_article_list';
const GET_ARTICLE_DETAIL = 'get_article_detail';
const UPDATE_ARTICLE_STATUS = 'update_article_status';
const ADD_SPECIAL = 'add_special';

// 登录
function login() {
  return `${HOST_URI}${LOGIN}`;
}

// 获取文章专题列表
function getTypeList() {
  return `${HOST_URI}${GET_TYPE_LIST}`;
}

// 保存文章
function saveArticle() {
  return `${HOST_URI}${SAVE_ARTICLE}`;
}

// 发布文章
function releaseArticle() {
  return `${HOST_URI}${RELEASE_ARTICLE}`;
}

// 获取文章列表
function getArticleList() {
  return `${HOST_URI}${GET_ARTICLE_LIST}`;
}

// 获取文章详情（修改文章时使用）
function getArticleDetail(id) {
  return `${HOST_URI}${GET_ARTICLE_DETAIL}/${id}`;
}

// 修改文章状态（上线/下线/发布）
function updateArticleStatus() {
  return `${HOST_URI}${UPDATE_ARTICLE_STATUS}`;
}

// 添加专题
function addSpecial() {
  return `${HOST_URI}${ADD_SPECIAL}`;
}

module.exports.login = login;
module.exports.getTypeList = getTypeList;
module.exports.saveArticle = saveArticle;
module.exports.releaseArticle = releaseArticle;
module.exports.getArticleList = getArticleList;
module.exports.getArticleDetail = getArticleDetail;
module.exports.updateArticleStatus = updateArticleStatus;
module.exports.addSpecial = addSpecial;