var LocalWikiClient = require("../index.js")

var lw = new LocalWikiClient({
  url: 'YOUR_LOCALWIKI_URL',
  user: process.env.LOCALWIKI_USER,
  apikey: process.env.LOCALWIKI_API_KEY
})

// create a page named test test test
lw.create({
  resource_type: 'page',
  data: {
    'name': "test test test",
    'content': "making a test page."
  },
  success: function(error, response, body) {
    console.log("created if 201:", response.statusCode)
  }
})