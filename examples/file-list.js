var LocalWikiClient = require('../');

var wiki = new LocalWikiClient();

wiki.files(function(err, res){
  console.log(err, res);
});