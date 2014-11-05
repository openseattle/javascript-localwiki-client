var LocalWikiClient = require('./index');
var test = require('tape');

test('creating a wiki instance', function(t){
  t.plan(1);

  var wiki = new LocalWikiClient({
    host: 'http://localhost:8082'
  }, function(err, res){
    t.ok(res);
  });
});


test('fetching a page', function(t){
  t.plan(1);

  var wiki = new LocalWikiClient({
    host: 'http://localhost:8082'
  });

  wiki.fetch('pages', '1', function(err, res){
    t.ok(res);
  });
});

test('list of pages', function(t){
  t.plan(1);

  var wiki = new LocalWikiClient({
    host: 'http://localhost:8082'
  });

  wiki.list('pages', function(err, res){
    t.ok(res);
  });
});

test('list of pages from seattle', function(t){
  t.plan(1);

  var wiki = new LocalWikiClient({
    host: 'http://localhost:8082'
  });

  wiki.list('pages', { region__slug: 'seattle' }, function(err, res){
    t.ok(res);
  });
});

test('create, update, and delete a page', function(t) {
  t.plan(3);

  var wiki = new LocalWikiClient({
    host: 'http://localhost:8082',
    apiKey: '98419472f6010545001f5512f4a5c1f42d24df64'
  });

  var page = {
    name: 'wooo a page',
    content: 'this is definitely a page.',
    region: 'http://localhost:8082/api/v4/regions/2/'
  };

  wiki.create('pages', page, function(err, res) {
    t.ok(res);
    console.log(err)
    page.content += ' wooooooooooo.';
    wiki.update('pages', getID(res.url), page, function(uerr, ures) {
      t.ok(ures);
      wiki.destroy('pages', getID(res.url), function(derr, dres){
        t.ok(dres);
      });
    });
  });
});

function getID (url) {
  return url.substr(url.length-3, 2);
}

/*
test('delete a page', function(t) {
  t.plan(1);

  var wiki = new LocalWikiClient({
    host: 'http://localhost:8082',
    apiKey: 'c6d4b07ec62afbb8b173939d8c09ffbc9cc3200f'
  });

  wiki.destroy('pages', 18, function(err, res){
    t.ok(res);
  });
});
*/
