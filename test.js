var LocalWikiClient = require('./index');
var nock = require('nock');
var test = require('tape');


test('creating a wiki instance', function(t){
  t.plan(1);

  var siteOptions = {
    url: 'http://seattlewiki.net',
  };

  var wiki = new LocalWikiClient(siteOptions, function(){
    t.equal(wiki.name, 'SeattleWiki');
  });
});