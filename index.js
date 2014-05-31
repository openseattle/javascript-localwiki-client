var request = require('request');
var extend = require('extend');

module.exports = LocalWikiClient;

function LocalWikiClient (options, cb) {
  options || (options = {});
  this.host = options.host || 'http://localwiki.net';
  this.apiVersion = options.apiVersion || 'v4';
  this.url = this.host + '/api/' + this.apiVersion + '/';
  this.user = options.user;
  this.apiKey = options.apiKey;
  this.region = options.region;

  this.regions = require('./regions')(this);
  this.region = this.regions().region.bind(this.regions());

  this.pages = require('./pages')(this);
  this.page = this.pages().page.bind(this.pages());

  this.maps = require('./maps')(this);
  this.map = this.maps().map.bind(this.maps());

  this.users = require('./users')(this);
  this.user = this.users().user.bind(this.users());

  this.files = require('./files')(this);
  this.file = this.files().file.bind(this.files());

  this.redirects = require('./redirects')(this);
  this.redirect = this.redirects().redirect.bind(this.redirects());

  if (cb) this.apiRoot(cb);
}

LocalWikiClient.prototype.apiRoot = function (cb) {
  this.req('get', '', function(err, res){
    if (err) return cb(err);
    return cb(null, res);
  });
};

LocalWikiClient.prototype.req = function req (type, id, options, cb) {
  if (typeof options === 'function') {
    var cb = options;
    var options = {};
  }

  options.url = this.fullUrl(id);
  options.headers = { 'Content-Type': 'application/json' };
  options.method = type;
  options.json = true;
  options.qs = options.filter || {};
  options.qs.format = 'json';

  if (this.region && !options.qs.region) options.qs.region = this.region;
  
  if (type !== 'get' && this.client) {
    options.headers['Authorization'] = 'ApiKey ' + this.client.user + ':' + this.client.apikey
  }

  request(options, getResponse);

  function getResponse (error, response, body){
    if (cb) {
      if (error) return cb(error);
      if (body.detail === 'Not found') return cb(body);
      return cb(null, body);
    }
  }
};

LocalWikiClient.prototype.fullUrl = function fullUrl (id) {
  var id = id || '';
  return this.url + id + '/';
};