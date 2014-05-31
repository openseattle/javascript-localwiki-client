var inherits = require('inherits');
var Resource = require('./resource');

module.exports = function (client) {
  return new MapsResource(client);
};

function MapsResource (client) {
  return function (id, options, cb) {
    return new Maps(client, id, options, cb);
  };
}

inherits(Maps, Resource);

function Maps (client, id, options, cb) {
  this.client = client;
  this.type = 'maps';
  return this.init(id, options, cb);
}

Maps.prototype.map = Maps.prototype.single;