var inherits = require('inherits');
var Resource = require('./resource');

module.exports = function (client) {
  return new RegionsResource(client);
};

function RegionsResource (client) {
  return function (id, options, cb) {
    return new Regions(client, id, options, cb);
  };
}

inherits(Regions, Resource);

function Regions (client, id, options, cb) {
  this.client = client;
  this.type = 'regions';
  return this.init(id, options, cb);
}

Regions.prototype.region = Regions.prototype.single;