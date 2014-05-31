var LocalWikiClient = require('../');

var wiki = new LocalWikiClient({}, function(err, res){
  console.log(err, res);
});
