var LocalWikiClient = require('../');

var wiki = new LocalWikiClient();

wiki.redirects(function(err, res){
  console.log(err, res);
});