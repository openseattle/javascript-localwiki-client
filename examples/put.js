var LocalWikiClient = require("../index.js")

var lw = new LocalWikiClient({
  url: 'YOUR_LOCALWIKI_URL',
  user: process.env.LOCALWIKI_USER,
  apikey: process.env.LOCALWIKI_API_KEY
})

// update the test test test page
lw.update({
  resource_type: 'page',
  data: {
    'name': "test test test",
    'content': "making a test page. updated a test page."
  },
  success: function(error, response, body) {
    console.log("updated if 204:", response.statusCode)
  }
})