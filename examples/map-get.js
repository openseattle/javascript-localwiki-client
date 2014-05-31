var LocalWikiClient = require('../');

var wiki = new LocalWikiClient();

wiki.map(107, function(err, res){
  console.log(err, res);
});