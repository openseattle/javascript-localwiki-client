#node-localwiki-client
A simple node.js wrapper for the [localwiki](http://github.com/localwiki) [api](http://localwiki.readthedocs.org/en/latest/api.html).

##Installation:
````
npm install node-localwiki-client
````

##Examples:

var LocalWikiClient = require('../');

var wiki = new LocalWikiClient({}, function(err, res){
  console.log(err, res);
});


var LocalWikiClient = require('../');

var wiki = new LocalWikiClient();

wiki.files(function(err, res){
  console.log(err, res);
});

