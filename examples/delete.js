var LocalWikiClient = require("../index.js")

var lw = new LocalWikiClient({
  url: 'YOUR_LOCALWIKI_URL',
  user: process.env.LOCALWIKI_USER,
  apikey: process.env.LOCALWIKI_API_KEY
})

// delete the test test test page
lw.delete({
  identifier: 'test',
  success: function(resource, response, body) {
    console.log("deleted " + resource.identifier)
  }
})