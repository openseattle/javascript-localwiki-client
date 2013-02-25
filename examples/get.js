var LocalWikiClient = require("../index.js")

var lw = new LocalWikiClient({
  url: 'YOUR_LOCALWIKI_URL' // like http://seattlewiki.net or https://sfwiki.org
  
  // user and apikey not required for get requests
  // user: process.env.LOCALWIKI_USER,
  // apikey: process.env.LOCALWIKI_API_KEY
})

// get the test test test page
lw.fetch({
  identifier: 'Help',
  success: function(resource) {
    console.log("page fetch data: ", resource.data.content)
  }
})

// get 5 pages
lw.list({
  resource_type: LocalWikiClient.Type.PAGE,
  filters: {
    limit: 5
  },
  success: function(items) {
    items.map(function(item) {
      console.log("Top Page: " + item.data.slug)
    });
  }
})