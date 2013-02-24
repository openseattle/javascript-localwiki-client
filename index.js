var request = require('request')
var qs = require('querystring')

module.exports = LocalWikiClient


/*
* Representation of a single Wiki Resource.
* Constructed either as a new object, or generated by LocalWikiClient.list / LocalWikiClient.fetch. 
*/
function LocalWikiResource(client, type, identifier) {
  this.client = client;
  this.type = type;
  this.identifier = identifier;

  // Allow construction of a resource resource_url specified rather than type and identifier.
  if (!this.identifier && this.type.indexOf("/api") === 0) {
    this.identifier = this.type.substr(this.type.indexOf('/', 5) + 1);
    var type = this.type.split("/")[2];
    this.type = LocalWikiClient.Type.of(type);
  }
  this.data = {};
}


/*
* Update a resource to reflect local state.
* client.fetch({
*   identifier:'test',
*   success: function(rsrc) {
*     rsrc.data.content += "test";
*     rsrc.update();
*   }
* })
*/
LocalWikiResource.prototype.update = function(success, failure) {
  var self = this;
  request.put({
    url: this.client.url + this.type.name + '/' + this.identifier,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'ApiKey ' + this.client.user + ':' + this.client.apikey
    },
    body: JSON.stringify(this.data)
  },
  function (error, response, body) {
    if (error && options.error && failure) failure(error, response, body);
    if (response.statusCode == 204 && success) {
      success(self, response, body);
    }
  });
}


/*
* Delete a resource from the wiki.
* client.list({
*   success: function(rsrcs) {
*     rsrcs.map(function(rsrc) {
*       if (rsrc.content.indexOf("Delete This Page") !== false) {
*         rsrc.delete();
*       }
*     });
*   }
* })
*/
LocalWikiResource.prototype.delete = function(success, failure) {
  var self = this;
  request.del({
    url: this.client.url + this.type.name + '/' + this.identifier,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'ApiKey ' + this.client.user + ':' + this.client.apikey
    }
  },
  function (error, response, body) {
    if (error && options.error && failure) failure(error, response, body);
    if (response.statusCode == 204 && success) {
      success(self, response, body);
    }
  });
}


/*
* Initialize a client.
*
* var LocalWikiClient = require('node-localwiki-client')
*
* var lw = new LocalWikiClient({
*   url: 'http://seattlewiki.net',
*   user: process.env.LOCALWIKI_USER,
*   apikey: process.env.LOCALWIKI_API_KEY
* })
*/
function LocalWikiClient(options){
  if (!options) options = {}
  this.url = options.url + '/api/'
  this.user = options.user
  this.apikey = options.apikey
}


/*
* Types of resources understood by LocalWiki.
*/
LocalWikiClient.Type = {
  FILE: {name: 'file', versioned: true},
  MAP: {name: 'map', versioned: true},
  PAGE: {name: 'page', versioned: true, tagged: true},
  REDIRECT: {name: 'redirect', versioned: true},
  SITE: {name: 'site'},
  TAG: {name: 'tag'},
  USER: {name: 'user'}
}


/*
* Get the LocalWikiClient Type with a given name.
*
* LocalWikiClient.Type.of('page');
*/
LocalWikiClient.Type.of = function(name) {
  for (var id in LocalWikiClient.Type) {
    var type = LocalWikiClient.Type[id];
    if (type.name && type.name == name) {
      return type;
    }
  }
}

/*
* GET
* request a list of resources

options = {
  resource_type: LocalWikiClient.Type,
  filters: {},
  success: function([LocalWikiResource]){},
  error: function(){}
}

*/
LocalWikiClient.prototype.list = function(options){
  var type = options.resource_type || LocalWikiClient.Type.PAGE;
  var self = this;
  
  request({
    url: this.url + type.name + '?' + qs.stringify(options.filters)
  },
  function (error, response, body) {
    if (error && options.error) options.error(error, response, body)
    if (response.statusCode == 200) {
      var data = JSON.parse(body);
      var objects = data.objects.map(function(resource) {
        var obj = new LocalWikiResource(self, resource.resource_uri);
        obj.data = resource;
        return obj;
      });
      if (options.success) return options.success(objects, data)
    }
    return response
  })
}

/*
* GET
* request a single resource from a known identifier.
*
* options = {
*   resource_type: LocalWikiClient.Type,
*   identifier: "",
*   success: function(){},
*   error: function(){}
* }
*
*/
LocalWikiClient.prototype.fetch = function(options){
  var type = options.resource_type || LocalWikiClient.Type.PAGE;
  var identifier = options.identifier;
  var obj = new LocalWikiResource(this, type, identifier);

  request({
    url: this.url + type.name + '/' + identifier
  },
  function (error, response, body) {
    if (error && options.error) options.error(error, response, body)
    if (response.statusCode == 200) {
      obj.data = JSON.parse(body);
      if (options.success) options.success(obj, response)
    }
    return response
  });

  return obj;
}

/*
* POST
* create a resource

options = {
  resource_type: "",
  data: {},
  success: function(){},
  error: function(){}
}

*/
LocalWikiClient.prototype.create = function(options){
  var resource = options.resource_type || LocalWikiClient.Type.PAGE;
  request.post({
    url: this.url + resource.name + '/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'ApiKey ' + this.user + ':' + this.apikey
    },
    body: JSON.stringify(options.data)
  },
  function (error, response, body) {
    if (error && options.error) options.error(error, response, body)
    if (response.statusCode == 201) {
      if (options.success) options.success(error, response, body)
    }
    return response
  })
}


/*
* DELETE
* Remove a single resource by its identifier.
*
* options = {
*   resource_type: LocalWikiClient.Type,
*   identifier: "",
*   success: function(){},
*   error: function(){}
* }
*
*/
LocalWikiClient.prototype.delete = function(options) {
  var type = options.resource_type || LocalWikiClient.Type.PAGE;
  var resource = new LocalWikiResource(this, type, options.identifier);
  resource.delete(options.success, options.error);
}
