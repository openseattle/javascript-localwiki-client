var LocalWikiClient = require('../');

var wiki = new LocalWikiClient();

wiki.pages(function(err, res){
  console.log(err, res);
});