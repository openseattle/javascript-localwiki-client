var LocalWikiClient = require('./index');
var nock = require('nock');
var test = require('tape');

var siteOptions = {
  url: 'http://seattlewiki.net',
};

var wiki = new LocalWikiClient(siteOptions);

test('creating a wiki instance', function(t){
  t.plan(1);

  var wiki = new LocalWikiClient(siteOptions, function(){
    t.equal(wiki.name, 'SeattleWiki');
  });
});

test('fetching a page', function(t){
  t.plan(2);

  wiki.fetch({ identifier: 'Help' }, function(err, res){
    console.log(err, res);
    t.ok(res);
    t.equal(res.data.name, 'Help');
  });
});