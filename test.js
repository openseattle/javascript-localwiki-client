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

  wiki.fetch('pages', '54886', function(err, res){
    t.ok(res);
  });
});

test('list of pages', function(t){
  t.plan(1);

  var wiki = new LocalWikiClient();

  wiki.list('pages', function(err, res){
    t.ok(res);
  });
});

test('list of pages from seattle', function(t){
  t.plan(1);

  var wiki = new LocalWikiClient();

  wiki.list('pages', { region__slug: 'seattle' }, function(err, res){
    t.ok(res);
  });
});