var LocalWikiClient = require('../');

var wiki = new LocalWikiClient();

wiki.users(function(err, res){
  console.log(err, res);
});