var request = require('request');
var qs = require('querystring');

module.exports = LocalWikiClient;

function LocalWikiClient (options, cb) {
  if (!(this instanceof LocalWikiClient)) return new LocalWikiClient(opts);
  options || (options = {});
  this.host = options.host || 'https://localwiki.org';
  this.apiVersion = options.apiVersion || 'v4';
  this.url = this.host + '/api/' + this.apiVersion + '/';
  this.apiKey = options.apiKey;
  this.region = options.region;

  if (cb) this.apiRoot(cb);
}

LocalWikiClient.prototype.apiRoot = function (cb) {
  this._request('get', '', cb);
};

LocalWikiClient.prototype.list = function (resource, params, cb) {
  this._request('get', resource, params, cb);
};

LocalWikiClient.prototype.fetch = function (resource, id, params, cb) {
  this._request('get', resource + '/' + id, params, cb);
};

LocalWikiClient.prototype.create = function (resource, params, cb) {
  this._request('post', resource, params, cb);
}

LocalWikiClient.prototype.update = function (resource, id, params, cb) {
  this._request('put', resource + '/' + id, params, cb);
}

LocalWikiClient.prototype.destroy = function (resource, id, params, cb) {
  this._request('delete', resource + '/' + id, params, cb);
}

LocalWikiClient.prototype._request = function (type, resource, params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  }

  var options = {};
  options.headers = { 'Content-Type': 'application/json' };

  if (type !== 'get') {
    options.body = JSON.stringify(params);
    options.headers['Authorization'] = 'Token ' + this.apiKey;
    params = null;
  }

  options.url = this.fullUrl(resource, params);
  options.method = type;
  options.json = true;

  request(options, getResponse);

  function getResponse (error, response, body){
    if (cb) {
      if (error) return cb(error);
      if (response.statusCode >= 400) return cb(response);
      if (body.detail === 'Not found') return cb(body);
      return cb(null, body);
    }
  }
};

LocalWikiClient.prototype.fullUrl = function (resource, params) {
  params || (params = {});
  var frag = resource.length > 0 ? resource + '/' : '';
  params.region = params.region || this.region;
  frag += params ? '?' + qs.stringify(params) : '';
  return this.url + frag;
};
