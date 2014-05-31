var inherits = require('inherits');
var Resource = require('./resource');

module.exports = function (client) {
  return new FilesResource(client);
};

function FilesResource (client) {
  return function (id, options, cb) {
    return new Files(client, id, options, cb);
  };
}

inherits(Files, Resource);

function Files (client, id, options, cb) {
  this.client = client;
  this.type = 'files';
  return this.init(id, options, cb);
}

Files.prototype.file = Files.prototype.single;