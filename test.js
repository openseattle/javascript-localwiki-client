var LocalWikiClient = require('./index');
var nock = require('nock');
var test = require('tape');


test('creating a wiki instance', function(t){
  t.plan(1);

  var wiki = new LocalWikiClient({
    url: 'http://seattlewiki.net',
    success: function(){
      t.equal(wiki.name, 'SeattleWiki');
    }
  });
});