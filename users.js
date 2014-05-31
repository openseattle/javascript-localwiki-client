var inherits = require('inherits');
var Resource = require('./resource');

module.exports = function (client) {
  return new UsersResource(client);
};

function UsersResource (client) {
  return function (id, options, cb) {
    return new Users(client, id, options, cb);
  };
}

inherits(Users, Resource);

function Users (client, id, options, cb) {
  this.client = client;
  this.type = 'users';
  return this.init(id, options, cb);
}

Users.prototype.user = Users.prototype.single;