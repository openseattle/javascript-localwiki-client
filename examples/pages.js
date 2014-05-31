var LocalWikiClient = require('../');

var wiki = new LocalWikiClient();

wiki.page('54886', function(err, res){
  console.log(err, res);
});