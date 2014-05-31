var LocalWikiClient = require('../');

var wiki = new LocalWikiClient();

wiki.user(2, function(err, res){
  console.log(err, res);
});