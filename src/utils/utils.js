const qs = require('querystring');

const cleanUrls = (req) => (app) => ({
    ...app,
    AppStoreUrl: app.url,
    url: buildUrl(req, 'apps/' + app.appId),
    similar: buildUrl(req, 'apps/' + app.appId + '/similar'),
    privacy: buildUrl(req, 'apps/' + app.id + '/privacy'),
    reviews: buildUrl(req, 'apps/' + app.appId + '/reviews'),
    ratings: buildUrl(req, 'apps/' + app.id + '/ratings'),
    devUrl : buildUrl(req, 'developers/' + qs.escape(app.developer))
  });


const buildUrl = (req , subpath) =>
  req.protocol + '://' + req.get('host') + req.baseUrl + '/' + subpath;

const toList = (data) => ({ data: data });

const isObject = (value) => {
  return typeof value === 'object' && value !== null;
}


module.exports = {
  cleanUrls,
  buildUrl,
  toList,
  isObject
}