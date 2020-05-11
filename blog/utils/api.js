const HOST_URI = 'http://39.101.223.208:7001/blog/';
// const HOST_URI = 'http://localhost:7001/blog/';

const GET_ARTICLE_LIST = 'get_article_list';
const GET_SPECIAL_LIST = 'get_special_list';
const GET_ARTICLE_Detail = 'detail';
const GET_COLLECTION_ID = 'get_collection_by_id';
const GET_ARCHIVE = 'get_archive';

function getArticleList() {
  return `${HOST_URI}${GET_ARTICLE_LIST}`;
}

function getSpecialList() {
  return `${HOST_URI}${GET_SPECIAL_LIST}`;
}

function getArticleDetail(id) {
  return `${HOST_URI}${GET_ARTICLE_Detail}/${id}`;
}

function getCollectionById(id) {
  return `${HOST_URI}${GET_COLLECTION_ID}/${id}`;
}

function getArchive() {
  return `${HOST_URI}${GET_ARCHIVE}`;
}

module.exports.getArticleList = getArticleList;
module.exports.getSpecialList = getSpecialList;
module.exports.getArticleDetail = getArticleDetail;
module.exports.getCollectionById = getCollectionById;
module.exports.getArchive = getArchive;