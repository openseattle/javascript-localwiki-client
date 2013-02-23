var request = require('request')
var qs = require('querystring')

module.exports = LocalWikiClient


/*
* Representation of a single Wiki Resource.
*
* lw.fetch({
*   resource_type: 'page',
*   identifier: 'test test',
*   success: function(resource) {
*     console.log(resource)
*   }
* })
*/
function LocalWikiResource(client, identifier) {
  this.client = client;
  this.identifier = identifier;
  this.data = {};
}


/*
* Initialize

var LocalWikiClient = require('node-localwiki-client')

var lw = new LocalWikiClient({
  url: 'http://seattlewiki.net',
  user: process.env.LOCALWIKI_USER,
  apikey: process.env.LOCALWIKI_API_KEY
})

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
* GET
* request a list of resources

options = {
  resource_type: "",
  filters: {},
  success: function(){},
  error: function(){}
}

*/
LocalWikiClient.prototype.list = function(options){
  var type = options.resource_type || LocalWikiClient.Type.PAGE;
  
  request({
    url: this.url + type.name + '?' + qs.stringify(options.filters)
  },
  function (error, response, body) {
    if (error && options.error) options.error(error, response, body)
    if (response.statusCode == 200) {
      var data = JSON.parse(body);
      data.objects.map(function(resource) {
        var obj = new LocalWikiResource(this, resource.resource_uri);
        return obj;
      });
      if (options.success) return options.success(data, body)
    }
    return response
  })
}

/*
* GET
* request a single resource

options = {
  resource_type: "",
  identifier: "",
  success: function(){},
  error: function(){}
}

*/
LocalWikiClient.prototype.fetch = function(options){
  var type = options.resource_type || LocalWikiClient.Type.PAGE;
  var identifier = options.identifier;
  var obj = new LocalWikiResource(this, identifier);

  request({
    url: this.url + type.name + '/' + identifier
  },
  function (error, response, body) {
    if (error && options.error) options.error(error, response, body)
    if (response.statusCode == 200) {
      obj.data.body = JSON.parse(body);
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
  var resource = options.resource_type || 'page'
  request.post({
    url: this.url + resource + '/',
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
* PUT
* update a resource

options = {
  resource_type: "",
  identifier: "",
  data: {},
  success: function(){},
  error: function(){}
}

*/
LocalWikiClient.prototype.update = function(options){
  var identifier = options.identifier || options.data.name
  var resource = options.resource_type || 'page'
  
  request.put({
    url: this.url + resource + '/' + identifier,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'ApiKey ' + this.user + ':' + this.apikey
    },
    body: JSON.stringify(options.data)
  },
  function (error, response, body) {
    if (error && options.error) options.error(error, response, body)
    if (response.statusCode == 204) {
      if (options.success) options.success(error, response, body)
    }
    return response

  })

}

/*
* DELETE
* delete a resource

options = {
  resource_type: "",
  identifier: "",
  success: function(){},
  error: function(){}
}

*/
LocalWikiClient.prototype.delete = function(options){
  var resource = options.resource_type || 'page'
  
  request.del({
    url: this.url + resource + '/' + options.identifier,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'ApiKey ' + this.user + ':' + this.apikey
    }
  },
  function (error, response, body) {
    if (error && options.error) options.error(error, response, body)
    if (response.statusCode == 204) {
      if (options.success) options.success(error, response, body)
    }
    return response

  })
  
}