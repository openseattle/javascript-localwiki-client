var inherits = require('inherits');
var Resource = require('./resource');

module.exports = function (client) {
  return new PagesResource(client);
};

function PagesResource (client) {
  return function (id, options, cb) {
    return new Pages(client, id, options, cb);
  };
}

inherits(Pages, Resource);

function Pages (client, id, options, cb) {
  this.client = client;
  this.type = 'pages';
  return this.init(id, options, cb);
}

Pages.prototype.page = Pages.prototype.single;