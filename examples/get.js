var LocalWikiClient = require("../index.js")

var lw = new LocalWikiClient({
  url: 'YOUR_LOCALWIKI_URL' // like http://seattlewiki.net or https://sfwiki.org
  
  // user and apikey not required for get requests
  // user: process.env.LOCALWIKI_USER,
  // apikey: process.env.LOCALWIKI_API_KEY
})

// get the test test test page
lw.fetch({
  resource_type: 'page',
  identifier: 'test test test',
  success: function(error, response, body) {
    console.log("page fetch results: ", body)
  }
})

// get 5 pages
lw.list({
  resource_type: 'page',
  filters: {
    limit: 5
  },
  success: function(error, response, body) {
    console.log("page list results: ", body)
  }
})