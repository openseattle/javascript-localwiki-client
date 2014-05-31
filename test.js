var LocalWikiClient = require('./index');
var test = require('tape');

test('creating a wiki instance', function(t){
  t.plan(1);

  var wiki = new LocalWikiClient({}, function(err, res){
    t.ok(res);
  });
});

test('fetching a page', function(t){
  t.plan(1);

  var wiki = new LocalWikiClient();

  wiki.page('54886', function(err, res){
    t.ok(res);
  });
});