# javascript localwiki client
A simple javascript wrapper for the [localwiki api](http://localwiki.net/api).

## Installation:

```
npm install --save localwiki-client
```

Works in node or the browser using browserify. Or use the localwiki-client.min.js file for browser-side code.

## Example

```
var wiki = new LocalWikiClient();

wiki.fetch('pages', '1', function(err, res){
  t.ok(res);
});
```

For more examples see the test.js file.

## License
MIT
