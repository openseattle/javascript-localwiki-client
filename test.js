var LocalWikiClient = require('./index');
//var nock = require('nock');
var test = require('tape');

test('creating a wiki instance', function(t){
  t.plan(1);

  var wiki = new LocalWikiClient({}, function(err, res){
    console.log(err, res);
  });
});

test('fetching a page', function(t){
  t.plan(2);

  wiki.fetch('page', 'Help', function(err, res){
    console.log(err, res);
    t.ok(res);
    t.equal(res.data.name, 'Help');
  });
});