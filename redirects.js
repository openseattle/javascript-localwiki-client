var inherits = require('inherits');
var Resource = require('./resource');

module.exports = function (client) {
  return new RedirectsResource(client);
};

function RedirectsResource (client) {
  return function (id, options, cb) {
    return new Redirects(client, id, options, cb);
  };
}

inherits(Redirects, Resource);

function Redirects (client, id, options, cb) {
  this.client = client;
  this.type = 'redirects';
  return this.init(id, options, cb);
}

Redirects.prototype.redirect = Redirects.prototype.single;