module.exports = Resource;

function Resource (client, type) {}

Resource.prototype.init = function (id, options, cb) {
  if (typeof id === 'string') return this.single(id, options, cb)
  else if (id) return this.list(id, options);
  else return this;
};

Resource.prototype.list = function (options, cb) {
  this.client.req('get', this.type, options, cb);
};

Resource.prototype.single = function (id, options, cb) {
  this.client.req('get', this.type + '/' + id, options, cb);
};

Resource.prototype.create = function (options, cb) {
  this.client.req('post', this.type, options, cb);
}

Resource.prototype.update = function (options, cb) {
  this.client.req('post', this.type, options, cb);
}

Resource.prototype.destroy = function (options, cb) {
  this.client.req('delete', this.type, options, cb);
}