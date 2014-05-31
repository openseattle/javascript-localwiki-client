var LocalWikiClient = require('../');

var wiki = new LocalWikiClient();

wiki.region(1, function(err, res){
  console.log(err, res);
});