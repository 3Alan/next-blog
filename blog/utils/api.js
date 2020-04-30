const HOST_URI = 'http://localhost:7001/blog/';

const GET_ARTICLE_LIST = 'getArticleList';
const GET_ARTICLE_Detail = 'detail';
const GET_COLLECTION_ID = 'getCollectionById';

function getArticleList() {
  return `${HOST_URI}${GET_ARTICLE_LIST}`;
}

function getArticleDetail(id) {
  return `${HOST_URI}${GET_ARTICLE_Detail}/${id}`;
}

function getCollectionById(id) {
  return `${HOST_URI}${GET_COLLECTION_ID}/${id}`;
}

module.exports.getArticleList = getArticleList;
module.exports.getArticleDetail = getArticleDetail;
module.exports.getCollectionById = getCollectionById;