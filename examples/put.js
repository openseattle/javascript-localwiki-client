var LocalWikiClient = require("../index.js")

var lw = new LocalWikiClient({
  url: 'YOUR_LOCALWIKI_URL',
  user: process.env.LOCALWIKI_USER,
  apikey: process.env.LOCALWIKI_API_KEY
})

// update the test test test page
lw.fetch({ identifier: 'Emu'}, function(error, resource) {
  resource.data.content += "<br /> Updated at " + new Date();
  resource.update(function() {
    console.log("updated.")
  });
});
