var request = require('request');
var qs = require('querystring');

module.exports = LocalWikiClient;

function LocalWikiClient (options, cb) {
  if (!(this instanceof LocalWikiClient)) return new LocalWikiClient(opts);
  options || (options = {});
  this.host = options.host || 'http://localwiki.net';
  this.apiVersion = options.apiVersion || 'v4';
  this.url = this.host + '/api/' + this.apiVersion + '/';
  this.user = options.user;
  this.apiKey = options.apiKey;
  this.region = options.region;

  if (cb) this.apiRoot(cb);
}

LocalWikiClient.prototype.apiRoot = function (cb) {
  this._request('get', '', function(err, res){
    if (err) return cb(err);
    return cb(null, res);
  });
};

LocalWikiClient.prototype.list = function (resource, options, cb) {
  this._request('get', resource, options, cb);
};

LocalWikiClient.prototype.fetch = function (resource, id, options, cb) {
  this._request('get', resource + '/' + id, options, cb);
};

LocalWikiClient.prototype.create = function (resource, options, cb) {
  this._request('post', resource, options, cb);
}

LocalWikiClient.prototype.update = function (resource, id, options, cb) {
  this._request('put', resource + '/' + id, options, cb);
}

LocalWikiClient.prototype.destroy = function (resource, id, options, cb) {
  this._request('delete', resource + '/' + id, options, cb);
}

LocalWikiClient.prototype._request = function (type, resource, params, cb) {
  if (typeof params === 'function') {
    var cb = params;
    var params = {};
  }

  var options = {};
  options.url = this.fullUrl(resource, params);
  options.headers = { 'Content-Type': 'application/json' };
  options.method = type;
  options.json = true;

  if (type !== 'get' && this.client) {
    options.headers['Authorization'] = 'ApiKey ' + this.client.user + ':' + this.client.apikey
  }

  if (this.region && !options.body.region) options.body.region = this.region;

  request(options, getResponse);

  function getResponse (error, response, body){
    if (cb) {
      if (error) return cb(error);
      if (response.statusCode >= 404) return cb(response);
      if (body.detail === 'Not found') return cb(body);
      return cb(null, body);
    }
  }
};

LocalWikiClient.prototype.fullUrl = function (resource, params) {
  var resource = resource || '';
  return this.url + resource + '/' + '?' + qs.stringify(params);
};