#node-localwiki-client
A simple node.js wrapper for the [localwiki](http://github.com/localwiki) [api](http://localwiki.readthedocs.org/en/latest/api.html).

##Installation:
````
npm install node-localwiki-client
````

##Examples:

**Require the module:**
````
var LocalWikiClient = require('node-localwiki-client')
````

**Initialize with at least the localwiki url:**
````
var wiki = new LocalWikiClient({
  url: 'YOUR_LOCALWIKI_URL' // like http://seattlewiki.net or https://sfwiki.org
  
  // user and apikey not required for get requests
  user: process.env.LOCALWIKI_USER,
  apikey: process.env.LOCALWIKI_API_KEY
})
````

**create a page named test test test**
````
wiki.create({
  resource_type: 'page',
  data: {
    'name': "test test test",
    'content': "making a test page."
  },
  success: function(error, response, body) {
    console.log("created if 201:", response.statusCode)
  }
})
````

**get the test test test page**
````
wiki.fetch({
  resource_type: 'page',
  identifier: 'test test test',
  success: function(error, response, body) {
    console.log("page fetch results: ", body)
  }
})
````

**update the test test test page**
````
wiki.update({
  resource_type: 'page',
  data: {
    'name': "test test test",
    'content': "making a test page. updated a test page."
  },
  success: function(error, response, body) {
    console.log("updated if 204:", response.statusCode)
  }
})
````

**delete the test test test page**
````
wiki.delete({
  resource_type: 'page',
  identifier: 'test test test',
  success: function(error, response, body) {
    console.log("deleted if 204:", response.statusCode)
  }
})
````

**get 5 pages**
````
wiki.list({
  resource_type: 'page',
  filters: {
    limit: 5
  },
  success: function(error, response, body) {
    console.log("page list results: ", body)
  }
})
````