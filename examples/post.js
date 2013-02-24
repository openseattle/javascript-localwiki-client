var LocalWikiClient = require("../index.js")

var lw = new LocalWikiClient({
  url: 'YOUR_LOCALWIKI_URL',
  user: process.env.LOCALWIKI_USER,
  apikey: process.env.LOCALWIKI_API_KEY
})

// create a page named test test test
lw.create({
  resource_type: LocalWikiClient.Type.PAGE,
  data: {
    'name': "Emu",
    'content': "Weird Animal."
  },
  success: function(resource) {
    console.log("Resource Created", resource)
  }
})