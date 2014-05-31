var Resource = require('./resource');

module.exports = function (client) {
  return new PagesResource(client);
};

function PagesResource (client) {
  return function (id, options, cb) {
    return new Pages(client, id, options, cb);
  };
}

function Pages (client, id, options, cb) {
  this.client = client;
  if (typeof id === 'string') return this.single(id, options, cb)
  else if (id) return this.list(id, options);
  else return this;
}

Pages.prototype.list = function (options, cb) {
  this.client.req('get', 'pages', options, cb);
};

Pages.prototype.page = function (id, options, cb) {
  this.client.req('get', 'pages/' + id, options, cb);
};