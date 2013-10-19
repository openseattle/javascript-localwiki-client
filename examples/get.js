var LocalWikiClient = require("../index.js")

var lw = new LocalWikiClient({
  url: 'http://seattlewiki.net' // like http://seattlewiki.net or https://sfwiki.org
  
  // user and apikey not required for get requests
  // user: process.env.LOCALWIKI_USER,
  // apikey: process.env.LOCALWIKI_API_KEY
})

// get the test test test page
lw.fetch({ identifier: 'Help' }, function(error, resource){
  console.log("page fetch data: ", resource.data.content);
});

// get 5 pages

var options = {
  resource_type: LocalWikiClient.Type.PAGE,
  filters: {
    limit: 5
  }
};

lw.list(options, function(error, response) {
  var items = response.objects;
  items.map(function(item) {
    console.log("Top Page: " + item.slug);
  });
});