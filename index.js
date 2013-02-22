var request = require('request')
var qs = require('querystring')

module.exports = LocalWikiClient

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
  request({
    url: this.url + options.resource_type + '?' + qs.stringify(options.filters)
  },
  function (error, response, body) {
    if (error && options.error) options.error(error, response, body)
    if (response.statusCode == 200) {
      if (options.success) return options.success(error, response, body)
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
  request({
    url: this.url + options.resource_type + '/' + options.identifier
  },
  function (error, response, body) {
    if (error && options.error) options.error(error, response, body)
    if (response.statusCode == 200) {
      if (options.success) options.success(error, response, body)
    }
    return response
  })
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
  request.post({
    url: this.url + options.resource_type + '/',
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
  
  request.put({
    url: this.url + options.resource_type + '/' + identifier,
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
  request.del({
    url: this.url + options.resource_type + '/' + options.identifier,
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