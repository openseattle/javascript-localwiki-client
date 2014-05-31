var LocalWikiClient = require('../');

var wiki = new LocalWikiClient();

wiki.maps(function(err, res){
  console.log(err, res);
});