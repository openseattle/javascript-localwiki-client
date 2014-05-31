var LocalWikiClient = require('../');

var wiki = new LocalWikiClient();

wiki.regions(function(err, res){
  console.log(err, res);
});